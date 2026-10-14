<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site } from '@/config/site'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import type { ApiError } from '@/types'
import BrandLogo from '@/components/BrandLogo.vue'

const user = useUserStore()
const toast = useToastStore()
const route = useRoute()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const sending = ref(false)

async function submit() {
  if (sending.value) return
  sending.value = true
  try {
    const session = await user.login(form.email.trim(), form.password)
    if (session.accountType !== 'admin') {
      user.clear()
      toast.error('Esta cuenta no tiene acceso al panel')
      return
    }
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin'
    router.replace(redirect.startsWith('/admin') ? redirect : '/admin')
  } catch (error) {
    toast.error((error as ApiError).message)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="login">
    <form class="login__card" @submit.prevent="submit">
      <BrandLogo />
      <div>
        <h1 class="login__title">{{ site.admin.loginTitle }}</h1>
        <p class="login__text">{{ site.admin.loginText }}</p>
      </div>
      <div>
        <label for="l-email">Correo</label>
        <input
          id="l-email"
          v-model="form.email"
          type="email"
          autocomplete="username"
          inputmode="email"
          required
        />
      </div>
      <div>
        <label for="l-pass">Contraseña</label>
        <input
          id="l-pass"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          required
        />
      </div>
      <button class="btn btn--primary login__submit" :disabled="sending">
        {{ sending ? 'Entrando…' : 'Entrar' }}
      </button>
      <RouterLink to="/" class="login__back">Volver a la web</RouterLink>
    </form>
  </section>
</template>

<style scoped lang="scss">
.login {
  @include flex(column, center, center);
  flex: 1;
  min-height: 100vh;
  padding: 1.5rem 1rem;

  &__card {
    @include card;
    @include flex(column, stretch, flex-start, 1.25rem);
    width: 100%;
    max-width: 24rem;
    padding: 2rem 1.5rem;
  }

  &__title {
    @include display($display-sm, 500);
    margin-bottom: 0.35rem;
  }

  &__text {
    color: $ink-muted;
    font-size: $text-sm;
  }

  &__submit {
    width: 100%;
    justify-content: center;
  }

  &__back {
    align-self: center;
    font-size: $text-sm;
    color: $ink-muted;

    &:hover {
      color: $forest;
    }
  }
}
</style>

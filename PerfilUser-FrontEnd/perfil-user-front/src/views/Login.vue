<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="login" class="space-y-5">
        <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            v-model="form.password"
            type="password"
            placeholder="Senha"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/axios';

export default {
  name: 'UserLogin',
  emits: ['loginSuccess'],
  data() {
    return {
      form: { email: '', password: '' }
    };
  },
  methods: {
    async login() {
      try {
        await api.get('/sanctum/csrf-cookie');
        await api.post('/login', this.form);
        this.$emit('loginSuccess');
      } catch {
        alert('Login falhou');
      }
    }
  }
};
</script>

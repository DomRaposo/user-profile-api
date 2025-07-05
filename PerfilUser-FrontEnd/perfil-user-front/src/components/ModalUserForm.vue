<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
      <h3 class="text-lg font-bold mb-4">{{ user ? 'Editar Usuário' : 'Novo Usuário' }}</h3>
      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="form.name" placeholder="Nome" class="input" required />
        <input v-model="form.email" placeholder="Email" class="input" required />
        <input v-if="!user" type="password" v-model="form.password" placeholder="Senha" class="input" required />
        <div class="flex justify-end space-x-2">
          <button type="submit" class="btn btn-blue">Salvar</button>
          <button type="button" class="btn btn-gray" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      form: { name: '', email: '', password: '' }
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form.name = val.name;
          this.form.email = val.email;
        } else {
          this.form = { name: '', email: '', password: '' };
        }
      }
    }
  },
  methods: {
    submit() {
      this.$emit('save', { ...this.form });
    }
  }
};
</script>

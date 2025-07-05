<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
      <h3 class="text-lg font-bold mb-4">Detalhes do Usuário</h3>
      <p><strong>Nome:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <div class="text-right mt-4">
        <button class="btn btn-gray" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
};
</script>
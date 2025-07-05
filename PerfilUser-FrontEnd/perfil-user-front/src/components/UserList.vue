<template>
  <table class="w-full text-left table-auto border border-gray-200 mt-4">
    <thead>
    <tr class="bg-gray-100">
      <th class="p-2">Nome</th>
      <th class="p-2">Email</th>
      <th class="p-2">Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id" class="border-t">
      <td class="p-2">{{ user.name }}</td>
      <td class="p-2">{{ user.email }}</td>
      <td class="p-2 space-x-2">
        <button class="btn btn-blue" @click="$emit('view', user)">Ver</button>
        <button class="btn btn-yellow" @click="$emit('edit', user)">Editar</button>
        <button class="btn btn-red" @click="$emit('delete', user.id)">Excluir</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['users']
};
</script>

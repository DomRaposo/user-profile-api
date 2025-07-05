<template>
  <Header />

  <nav style="margin: 10px;">
    <button v-if="page !== 'login'" @click="page = 'login'">Login</button>
    <button v-if="page !== 'cadastro'" @click="page = 'cadastro'">Cadastro</button>
    <button v-if="page !== 'usuarios'" @click="page = 'usuarios'">Usuários</button>
  </nav>

  <Login v-if="page === 'login'" @loginSuccess="handleLoginSuccess" />
  <Cadastro v-if="page === 'cadastro'" />
  <div v-if="page === 'usuarios'">
    <button @click="openCreateModal">Novo Usuário</button>
    <UserList @edit="openEditModal" @view="openViewModal" @create="openCreateModal" />

    <ModalUserForm
        v-if="isModalOpen"
        :user="editingUser"
        @close="isModalOpen = false"
        @save="handleSave"
    />

    <ModalUserView
        v-if="viewingUser"
        :user="viewingUser"
        @close="viewingUser = null"
    />
  </div>

  <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Login from './views/Login.vue';
import Cadastro from './views/Cadastro.vue';
import UserList from './components/UserList.vue';
import ModalUserForm from './components/ModalUserForm.vue';
import ModalUserView from './components/ModalUserView.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Login,
    Cadastro,
    UserList,
    ModalUserForm,
    ModalUserView
  },
  setup() {
    const page = ref('login');
    const editingUser = ref(null);
    const viewingUser = ref(null);
    const isModalOpen = ref(false);

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        page.value = 'usuarios';
      }
    });

    function handleLoginSuccess() {
      page.value = 'usuarios';
    }

    function openCreateModal() {
      editingUser.value = null;
      isModalOpen.value = true;
    }

    function openEditModal(user) {
      editingUser.value = user;
      isModalOpen.value = true;
    }

    function openViewModal(user) {
      viewingUser.value = user;
    }

    async function handleSave(userData) {
      try {
        if (editingUser.value) {
          await axios.put(`/api/users/${editingUser.value.id}`, userData);
          alert('Usuário atualizado');
        } else {
          await axios.post('/api/users', userData);
          alert('Usuário criado');
        }
        isModalOpen.value = false;
      } catch {
        alert('Erro ao salvar usuário');
      }
    }

    return {
      page,
      editingUser,
      viewingUser,
      isModalOpen,
      handleLoginSuccess,
      openCreateModal,
      openEditModal,
      openViewModal,
      handleSave
    };
  }
};
</script>

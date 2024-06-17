<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
} from 'flowbite-vue'
import auth from './services/auth';
</script>

<template>
  <fwb-navbar>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link is-active link="/">
          Home
        </fwb-navbar-link>
        <div v-if="!isLoggedIn" class="flex">
          <fwb-navbar-link link="/register">
            Register
          </fwb-navbar-link>
          <fwb-navbar-link link="/login" class="px-3 ml-2">
            Login
          </fwb-navbar-link>
        </div>
        <div v-else>
          <fwb-navbar-link link="#" @click="logout">
            Logout
          </fwb-navbar-link>
        </div>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>

  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      sessionValue: ''
    }
  },
  mounted() {
    this.checkSession()
  },
  methods: {
    checkSession() {
      this.isLoggedIn =localStorage.getItem('isLoggedIn')
    },
    async logout() {
      await auth.logout();
      window.location.reload();
    }
  }
}
</script>
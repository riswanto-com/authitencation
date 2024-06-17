<script>
import auth from '../services/auth';
export default {
  data() {
    return {
      name: '',
      username: '',
      isLoggedIn: false,
      password: ''
    };
  },
  mounted() {
    this.getProfil()
    this.checkSession()
  },
  methods: {
    checkSession() {
      this.isLoggedIn =localStorage.getItem('isLoggedIn')
    },
    async getProfil() {
      try {
        const res = await auth.getProfile(localStorage.getItem('user'));
        console.log(res)
        if (res.type == 0) {
          this.name = res.data.name
          this.username = res.data.username
        }
      } catch (error) {
        console.error('Registration failed', error);
      }
    },

  }
};
</script>

<template>
  <main>
    <div v-if="!isLoggedIn">
      <section class="px-8 py-24">
      <div class="container mx-auto text-center">
        <h2
          class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
          Home Page</h2>

      </div>
    </section>
  
    </div>
    <div v-else>
      <section class="px-8 py-24">
      <div class="container mx-auto text-center">
        <h2
          class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
          My Data</h2>

        <div class="mt-24">
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100">
              <div
                class="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                <h5
                  class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 capitalize">
                  Nama</h5>
                <p class="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
                  {{ this.name }}</p>
                
              </div>
              <div
                class="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                <h5
                  class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 capitalize">
                  Username</h5>
                <p class="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
                  {{ this.username }}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </main>
</template>

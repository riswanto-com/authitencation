<template>
    <div class="min-h-screen py-20 mt-10 flex items-center justify-center w-full">
	<div class="bg-white shadow-md py-20 rounded-lg px-8 w-full max-w-md">
		<h1 class="text-2xl font-bold text-center mb-4">Login Application!</h1>
		<form class="px-5" @submit.prevent="login">
            <div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
				<input v-model="username" type="text" placeholder="Username" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
			</div>
            <div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
				<input v-model="password" type="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
			</div>
            <div class="mb-4">
                <button  type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
            </div>
            <div class="mb-4">
                <a href="/register" class="text-blue-500 justify-center">Create Account</a>
            </div>
        </form>
	</div>
</div>
</template>
<script>
import auth from '../services/auth';

export default {
    data() {
        return {
            username: '',
            password: '',
            countdown:0
        };
    },
    mounted(){
        this.reloadPage()
    },
    methods: {
        async login() {
            try {
                await auth.login({
                    username: this.username,
                    password: this.password
                });
                // window.location
                window.location.reload();
            } catch (error) {
                console.error('Login failed', error);
            }
        },
        reloadPage() {
            const isLoggedIn =localStorage.getItem("isLoggedIn")
            if(isLoggedIn){
                this.$router.push('/');
            }
        },
    },

};
</script>

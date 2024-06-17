<template>
    <div class="min-h-screen py-20 mt-10 flex items-center justify-center w-full">
	<div class="bg-white shadow-md py-20 rounded-lg px-8 w-full max-w-md">
		<h1 class="text-2xl font-bold text-center mb-4">Create Your Account</h1>
		<form class="px-5" @submit.prevent="register">
            <div class="mb-4">
				<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
				<input v-model="name" type="text" placeholder="Name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
			</div>
            <div class="mb-4">
				<label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
				<input v-model="username" type="text" placeholder="Username" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
			</div>
            <div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
				<input v-model="password" type="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
			</div>
            <div class="mb-4">
                <button  type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</button>
            </div>
            <div class="mb-4">
                <a href="/login" class="text-blue-500 justify-center">Login Application</a>
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
            name: '',
            username: '',
            password: ''
        };
    },
    mounted(){
        this.reloadPage()
    },
    methods: {
        async register() {
            try {
                const res = await auth.register({
                    name: this.name,
                    username: this.username,
                    password: this.password
                });
                if (res.type == 0) {
                    const sendLogin = await auth.login({
                        username: this.username,
                        password: this.password
                    })
                    this.$router.go('/');
                }
            } catch (error) {
                console.error('Registration failed', error);
            }
        },
        reloadPage() {
            const isLoggedIn =localStorage.getItem("isLoggedIn")
            if(isLoggedIn){
                this.$router.push('/');
            }
        },
    }
};
</script>

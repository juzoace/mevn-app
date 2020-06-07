<template>
  <div>
      <h2>
          Register
      </h2>
      <div class="row">
          <div class="card mx-auto">
              <div class="card-header text-white bg-primary">
                  <h4>Register</h4>
              </div>
              <div class="card-body">
                  <form @submit.prevent="registerUser">
                    <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                    id="name"
                    type="text"
                    placeholder="Name" 
                    name="name" 
                    v-model="name" 
                    class="form-control"
                    >
                    </div> 

                    <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                    id="username"
                    type="text"
                    placeholder="Username" 
                    name="username" 
                    v-model="username" 
                    class="form-control"
                    >
                    </div>  

                    <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                    id="email"
                    type="text"
                    placeholder="Email" 
                    name="email" 
                    v-model="email" 
                    class="form-control"
                    >
                    </div> 

                    <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                    id="password"
                    type="password"
                    placeholder="Password" 
                    name="password" 
                    v-model="password" 
                    class="form-control"
                    >
                    </div>

                    <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input 
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm Password" 
                    name="confirm_password" 
                    v-model="confirm_password" 
                    class="form-control"
                    >
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to="/register" class="card-link">Need an account?</router-link>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>



import { mapActions } from 'vuex';
export default {
  data() {
      return {
          name: "",
          username: "",
          email: "",
          password: "",
          confirm_password: ""
      };
  },
  methods: {
      ...mapActions(['register']),
      registerUser() {
          console.log('Hey')
          let user = {
              name: this.name,
              username: this.username,
              email: this.email,
              password: this.password,
              confirm_password: this.confirm_password
          }
          this.register(user).then(res => {
              if(res.data.success) {
                  this.$router.push("login");
              }
          });
      }
  }
};
</script>

<style>

.card {
    width: 60%;
    border-radius: 0;
}
.btn {
    border-radius: 0;
}
.form-control {
    border-radius: 0;
}

</style>

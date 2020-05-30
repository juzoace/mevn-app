<template>
  <div>
      <h2>Login</h2>
      <div class="row">
          <div class="card mx-auto">
              <div class="card-header text-white bg-primary">
                  <h4>Login</h4>
              </div>
              <div class="card-body">
                  <form>
                    <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                    id="username"
                    type="text"
                    placeholder="username" 
                    name="username" 
                    v-model="username" 
                    class="form-control"
                    >
                    </div>  

                    <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                    id="password"
                    type="text"
                    placeholder="password" 
                    name="password" 
                    v-model="password" 
                    class="form-control"
                    >
                    </div>
                    <button type="button" class="btn btn-primary">Login</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link to="/register" class="card-link">Need an account?</router-link>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  
export default {
  data() {
      return {
        username: "",
        password: ""
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

<template>
 <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="#" class="h1"><b>Password Reset</b></a>
        </div>
        <div class="card-body">
          <form @submit.prevent="adminResetPassword">

            <div v-if="msg">
              <div class="alert alert-success" role="alert">
                <span>{{msg.message}}</span>
              </div>
            </div>


            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
            <div class="input-group mb-3">
              <input type="password" v-model="form.password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>

          <span class="text-danger" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</span>
            <div class="input-group mb-3">
              <input type="password" v-model="form.password_confirmation" class="form-control" placeholder="Password Confirmation">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Confirm</button>
              </div>
            </div>
          </form>
          <p class="mb-0">
            <router-link to="/forgot-password" class="text-center">Return to Forgot</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",

    data(){
    return{
      form:{
        password:null,
        password_confirmation:null,
        token:null,
      },
      errors:{},
      msg:null
    }
  },

  created(){
    this.form.token = this.$route.query.token;

  },

  methods:{
    adminResetPassword(){
      this.$store.dispatch("RESET",this.form)
          .then((res) => {
            this.msg=res.data
            this.$router.push({ path: '/' });
          }).catch(() => {

       
      });
    }
  }
}
</script>

<style scoped>

</style>
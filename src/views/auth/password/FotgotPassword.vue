<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="#" class="h1"><b>Password Reset</b></a>
        </div>
        <div class="card-body">
          <form @submit.prevent="adminForgotPassword">

            <div v-if="msg">
              <div class="alert alert-success" role="alert">
                <span>{{msg.message}}</span>
              </div>
            </div>


            <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
            <div class="input-group mb-3">
              <input type="email" v-model="form.email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Send Password Reset Link</button>
              </div>
            </div>
          </form>
          <p class="mb-0">
            <router-link to="/" class="text-center">Return to login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FotgotPassword",
  data(){
    return{
      form:{
        email:null,
      },
      errors:{},
      msg:null
    }
  },
  methods:{
    adminForgotPassword(){
      this.$store.dispatch("FORGOT",this.form)
          .then((res) => {
            console.log(res.data)
            this.msg=res.data
            this.form.email=null
          }).catch((err) => {
        console.log(err.response.data.errors)
        this.errors = err.response.data.errors
      });
    }
  }
}
</script>

<style scoped>

</style>
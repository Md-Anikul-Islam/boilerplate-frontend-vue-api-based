import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
export const auth = {
    state:{
        auth_status:false,
        auth_token:null,
        auth_info:{
            name:null,
            email:null,
            phone:null,
            image:null,
        }
    },
    getters:{
        GET_AUTH_STATUS(state){
            return state.auth_status;
        },
        GET_AUTH_TOKEN(state){
            return state.auth_token;
        },
        GET_AUTH_INFO(state){
            return state.auth_info;
        }
    },

    actions:{
        REGISTRATION(context,resData){
            return new Promise((resolve, reject)=>{
                axios.post('/register',resData)
                    .then((res) => {
                        context.commit('SET_AUTH_TOKEN',res.data.token)
                        context.commit('SET_AUTH_INFO',res.data.user)
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

       LOGIN(context,loginData){
           return new Promise((resolve, reject)=>{
               axios.post('/login',loginData)
                   .then((res) => {
                       context.commit('SET_AUTH_TOKEN',res.data.token)
                       context.commit('SET_AUTH_INFO',res.data.user)
                       resolve(res)
                   }).catch((err) => {
                       reject(err)
               });
           })
       },

        FORGOT(context,forgotData){
            return new Promise((resolve, reject)=>{
                axios.post('/forgot',forgotData)
                    .then((res) => {
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

        RESET(context,payload){
            return new Promise((resolve, reject)=>{
                axios.post('/reset',payload)
                    .then((res) => {
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        },

        LOGOUT(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.auth_token;
            return new Promise((resolve, reject)=>{
                axios.post('/logout')
                    .then((res) => {
                        context.commit('SET_AUTH_LOGOUT')
                        resolve(res)
                    }).catch((err) => {
                    reject(err)
                });
            })
        }
    },

    mutations:{
        SET_AUTH_TOKEN(state,token){
            state.auth_token = token;
            state.auth_status = true;
        },
        SET_AUTH_INFO(state,info){
            state.auth_info.name = info.name;
            state.auth_info.email = info.email;
            state.auth_info.phone = info.phone;
        },
        SET_AUTH_LOGOUT(state){
            state.auth_token = null;
            state.auth_status = false;

            state.auth_info={
                name:null,
                email:null,
                phone:null,
                image:null,
            }
        },

    },

}
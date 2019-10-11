<template>
    <div id="mainFuncTotal">
        <transition name="totalbar" mode="out-in">
            <totalBar v-if="showTotalBar" v-on:switch="switchFunc" :globle_props="globle_props"></totalBar>
        </transition>

        <transition mode="out-in">
            <div class="container blueBar" style="z-index: -1" v-if="showBlueBar">
                <div class="row no-gutters" style="height: 100%">
                    <div style="min-height: 100%; display: inline-block; z-index: -1; background: #448AFF;" class="col-4 offset-1">
                        <div style="height: 100%; background: url(/static/svg/middle.svg); opacity:0.4"></div>
                    </div>
                </div>
            </div>
        </transition>

        <transition mode="out-in">
            <component :is="comName" v-on:switch="switchFunc" :globle_props="globle_props" v-on:fresh_user_info="getInfo"></component>
        </transition>
    </div>
</template>

<style>
    body{
        background: url(/static/svg/leftUp.svg) left top no-repeat fixed, url(/static/svg/rightDown.svg) 150% -200% no-repeat fixed, url(/static/svg/rightUp.svg) right top no-repeat fixed; 
        background-size: 800px
    }

    .blueBar{
        height: 100%;
        width: 1140px;
        margin: 0 auto;
        left: 0px;
        right: 0px;
        position: fixed;
    }

    #mainFuncTotal{
        height: 100%;
    }

    .form-control:focus {
        box-shadow: 0px 0px 0px;
    }

    input.form-control{
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
    }

    .v-enter, 
    .v-leave-to{
        transform-style: preserve-3d;
        transform: rotateY(90deg);
    }

    .v-enter-active, 
    .v-leave-active{
        transform-style: preserve-3d;
        transition: all 0.5s ease;
    }

    .totalbar-enter, 
    .totalbar-leave-to{
        transform: translateY(-4rem);
        position: absolute;
        width: 100%;
    }

    .totalbar-enter-active, 
    .totalbar-leave-active{
        transition: all 0.5s ease;
    }
</style>

<script>
    import Vue from 'vue'

    Vue.component('totalBar',function(resolve){
        require(['./totalBar.vue'],resolve)
    })

    Vue.component('signIn',function(resolve){
        require(['./signIn.vue'],resolve)
    })

    Vue.component('signUp',function(resolve){
        require(['./signUp.vue'],resolve)
    })

    Vue.component('resetPassword',function(resolve){
        require(['./resetPassword.vue'],resolve)
    })

    Vue.component('setPassword',function(resolve){
        require(['./setPassword.vue'],resolve)
    })

    Vue.component('perfectInfo',function(resolve){
        require(['./perfectInfo.vue'],resolve)
    })

    Vue.component('home',function(resolve){
        require(['./home.vue'],resolve)
    })

    Vue.component('space',function(resolve){
        require(['./space.vue'],resolve)
    })

    Vue.component('taskList',function(resolve){
        require(['./taskList.vue'],resolve)
    })

    Vue.component('noti',function(resolve){
        require(['./noti.vue'],resolve)
    })

    Vue.component('taskDetail',function(resolve){
        require(['./taskDetail.vue'],resolve)
    })

    Vue.component('editTask',function(resolve){
        require(['./editTask.vue'],resolve)
    })

    Vue.component('createTask',function(resolve){
        require(['./createTask.vue'],resolve)
    })

    export default {
        data() {
            return {
                comName: '',
                showTotalBar: false,
                showBlueBar: false,
                init_over: false,

                globle_props: null,
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo: function() {
                this.$http.get("/account/basic_info/").then(result => {
                    this.globle_props = result.body;
                    this.globle_props.randint = Math.ceil(Math.random()*1000);
                    this.showTotalBar = true;
                    this.comName = 'home';
                })
            },
            switchFunc: function(target){
                this.refreshCsrfToken();
                this.globle_props.randint = Math.ceil(Math.random()*1000);

                if (!this.globle_props.is_login){
                    if (target[0] != "signUp" && target[0] != "home" && target[0] != "resetPassword"){
                        target = ['signIn', null];
                    }
                }
                else if (!this.globle_props.perfected_info){
                    target = ['perfectInfo', null];
                }

                this.comName = target[0];
                this.globle_props.task_id = target[1];
                if (['signIn', 'signUp', 'resetPassword', 'setPassword', 'perfectInfo'].indexOf(target[0]) + 1){
                    this.showTotalBar = false;
                    this.showBlueBar = true;
                }
                else{
                    this.showTotalBar = true;
                    this.showBlueBar = false;
                }
            },
            refreshCsrfToken: function() {
                this.$http.get("/csrf_token/").then(result => {
                    if (result.status == 200){
                        Vue.http.headers.common['X-CSRFToken'] = result.body.info;
                    }
                })
            },
        }
    }
</script>

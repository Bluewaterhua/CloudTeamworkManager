<template>
    <!-- 账户相关 -->
    <div id="accountTotal">
        <div class="container blueBar" style="z-index: -1">
            <div class="row no-gutters" style="height: 100%">
                <div style="min-height: 100%; display: inline-block; z-index: -1; background: #448AFF;" class="col-4 offset-1">
                    <div style="height: 100%; background: url(/static/svg/middle.svg); opacity:0.4"></div>
                </div>
            </div>
        </div>
        <div class="container" id="mainFunc">
            <div class="row no-gutters justify-content-md-center" style="height: 100%">
                <div class="col-5 align-self-center">
                    <component :is="comName" v-on:switch="switchFunc"></component>
                </div>
            </div>
        </div>
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

    #accountTotal, #mainFunc{
        height: 100%;
    }

    .form-control:focus {
        box-shadow: 0px 0px 0px;
    }

    .form-control {
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        padding: 0px;
    }
</style>

<script>
    import Vue from 'vue'

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

    export default {
        data() {
            return {
                comName: 'signIn'
            }
        },
        methods: {
            switchFunc: function(target){
                this.comName = target;
            }
        }
    }
</script>
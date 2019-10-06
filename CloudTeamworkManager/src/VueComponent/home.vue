<template>
    <div class="container" style="height: 100%; position: relative; top: -4rem;" id="mainFunc">
        <div class="row" style="height: 100%">
            <div class="row align-self-center col-10 offset-1"
                style="padding: 15px; background-color: rgba(240, 248, 255, 0.7)">
                <div class="col-6 px-0 offset-1" style="color: #212529">
                    <div style="position: relative; top: 50%; transform: translateY(-50%)">
                        <h1 class="display-4 font-italic">任务管理系统</h1>
                        <p class="lead my-3">由云顶书院任务管理系统项目组倾力打造。在任务管理系统的帮助下，您可以将更多精
                            力用于项目开发。监控项目进度和成员时间规划等琐事，交给我们！</p>
                        <div>
                            <a v-if="!is_login" href="/account/login"
                                class="btn btn-outline-primary mb-3 mb-md-0 mr-md-3"
                                style="width: 30%; border-radius: 0px" v-on:click.prevent="mySwitch('signIn')">登录</a>
                            <a v-if="!is_login" href="/account/register"
                                class="btn btn-outline-primary mb-3 mb-md-0 mr-md-3"
                                style="width: 30%; border-radius: 0px" v-on:click.prevent="mySwitch('signUp')">注册</a>
                        </div>
                    </div>
                </div>
                <div class="col-4 px-0">
                    <!-- <img src="/static/pic/logo-stack.png" alt="" style="width: 100%"> -->
                    <img src="/static/pic/betta_fish.png" alt="" style="width: 100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                is_login: false,
            }
        },
        created() {
            this.login_check();
        },
        methods: {
            login_check: function () {
                this.$http.get('/account/login_check/').then(result => {
                    if (result.body.status == 200) {
                        this.is_login = result.body.is_login;
                    }
                })
            },
            mySwitch: function(target) {
                this.$emit('switch', target)
            }
        }
    }
</script>
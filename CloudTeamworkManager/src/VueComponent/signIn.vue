<template>
    <div class="container" id="mainFunc">
        <div class="row no-gutters justify-content-md-center" style="height: 100%">
            <div class="col-5 align-self-center">
                <div class="text-right clearfix">
                    <div class="letter-spacing: 4px; text-uppercase font-weight-light"
                        style="color: #536DFE; font-size: 48px">sign&nbsp;in
                    </div>
                    <div style="letter-spacing: 4px; font-size: 22px; color: #333333">登录你的云顶账号
                    </div>
                    <hr noshade=true style="width: 17%; height: 1px; background-color: #536DFE; float: right;">
                </div>
                <div class="row justify-content-center no-gutters p-0 mb-5 bg-white"
                    style="border-radius: 0px; box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16)">
                    <div class="col-10" style="margin-top: 4.5rem; margin-bottom: 2rem">
                        <form action="" method="POST" class="clearfix">
                            <label :style="{visibility: show_phone_number_label ? 'visible' : 'hidden'}"
                                style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入您的手机号</label>
                            <input v-model="phone_number" style="margin-bottom: 1rem; border-radius: 0px" type="text"
                                class="form-control" :placeholder="show_phone_number_label? '' : '请输入您的手机号'"
                                @focus="show_phone_number_label = !show_phone_number_label"
                                @blur="show_phone_number_label = !show_phone_number_label">
                            <label :style="{visibility: show_password_label ? 'visible' : 'hidden'}"
                                style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入您的密码</label>
                            <input v-model="password" style="border-radius: 0px" type="password" class="form-control"
                                :placeholder="show_password_label? '' : '请输入您的密码'"
                                @focus="show_password_label = !show_password_label"
                                @blur="show_password_label = !show_password_label" @keyon.enter="submit">
                        </form>
                        <a href="/account/reset_password"
                            style="margin-top: 0.5rem; font-size: 14px; float: right;" v-on:click.prevent="mySwitch(['resetPassword', null])">忘记密码</a>
                        <div class="tip" style="margin-top: 0.5rem; font-size: 14px; color: #E86263">{{ tip }}</div>
                        <input @click="submit" type="button" class="btn btn-primary col-6 offset-6" value="登录"
                            style="float: right; font-size: 18px; margin-top: 3.6rem; border-radius: 0px">
                    </div>
                    <div class="text-center col-12 align-self-end rounded-bottom align-middle"
                        style="height: 50px; background-color: rgba(130, 178, 255, 0.2); font-size: 16px">
                        <div style="position: relative; top: 50%; transform: translateY(-50%); color: #999999">没有账号？<a
                                href="/account/register" v-on:click.prevent="mySwitch(['signUp', null])">点击注册</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #mainFunc{
        height: 100%;
    }
</style>

<script>
    export default {
        data() {
            return {
                tip: "",
                phone_number: "",
                password: "",
                show_phone_number_label: false,
                show_password_label: false,
            }
        },
        methods: {
            submit: function () {
                this.$http.post('/account/login/', { 'phone_number': this.phone_number, 'password': this.password }, { emulateJSON: true }).then(result => {
                    if (result.body.status == 302) {
                        this.mySwitch(['home', null]);
                    }
                    else {
                        this.tip = result.body.tip;
                    }
                })
            },
            mySwitch: function(target) {
                this.$emit('fresh_user_info', target);
                this.$emit('switch', target);
            }
        }
    };
</script>

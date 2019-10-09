<template>
    <div class="container" id="mainFunc">
        <div class="row no-gutters justify-content-md-center" style="height: 100%">
            <div class="col-5 align-self-center">
                <div class="text-right clearfix">
                    <div class="text-uppercase font-weight-light"
                        style="letter-spacing: 4px; color: #536DFE; font-size: 48px">
                        password
                    </div>
                    <div style="letter-spacing: 4px; font-size: 22px; color: #333333">重置密码
                    </div>
                    <hr noshade=true style="width: 17%; height: 1px; background-color: #536DFE; float: right;">
                </div>
                <div class="row justify-content-center no-gutters p-0 mb-5 bg-white" style="border-radius: 0px; box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16)" id="mainFunc">
                    <div class="col-10" style="margin-top: 10%; margin-bottom: 10%">
                        <form action="" method="POST" class="clearfix">
                            <label :style="{visibility: show_phone_number_label ? 'visible' : 'hidden'}"
                                style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入您的手机号</label>
                            <input type="text" class="form-control" name="username" autocomplete=off v-model="phone_number"
                                style="margin-bottom: 1rem; border-radius: 0px"
                                :placeholder="show_phone_number_label? '' : '请输入您的手机号'"
                                @focus="show_phone_number_label = !show_phone_number_label"
                                @blur="show_phone_number_label = !show_phone_number_label">
                            <div>
                                <label :style="{visibility: show_picode_label ? 'visible' : 'hidden'}"
                                    style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入图形验证码</label>
                                <input type="text" class="form-control" name="picode" v-model="picode"
                                    style="margin-bottom: 1rem; border-radius: 0px" autocomplete=off
                                    :placeholder="show_picode_label? '' : '请输入图形验证码'"
                                    @focus="show_picode_label = !show_picode_label"
                                    @blur="show_picode_label = !show_picode_label">
                                <img :src="imgsrc"
                                    style="float: right; transform: translateY(-55px); height: 37.84px; width: 30%; border-radius: 0rem"
                                    @click="reload_picode">
                            </div>
                            <div>
                                <label :style="{visibility: show_msgcode_label ? 'visible' : 'hidden'}"
                                    style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入短信验证码</label>
                                <input type="text" class="form-control" name="msgcode" autocomplete=off v-model="msgcode"
                                    style="margin-bottom: 1rem; border-radius: 0px"
                                    :placeholder="show_msgcode_label? '' : '请输入短信验证码'"
                                    @focus="show_msgcode_label = !show_msgcode_label"
                                    @blur="show_msgcode_label = !show_msgcode_label">
                                <button class="btn btn-primary" type="button"
                                    style="float: right; transform: translateY(-55px); border-radius: 0px; width: 30%"
                                    @click="send_msgcode">
                                    <span>点击获取</span>
                                </button>
                            </div>
                            <label :style="{visibility: show_password_label ? 'visible' : 'hidden'}"
                                style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请输入您的密码</label>
                            <input type="password" v-model="password" class="form-control"
                                style="margin-bottom: 1rem; border-radius: 0px" name="password"
                                :placeholder="show_password_label? '' : '请输入您的密码'"
                                @focus="show_password_label = !show_password_label"
                                @blur="show_password_label = !show_password_label">
                            <label :style="{visibility: show_re_password_label ? 'visible' : 'hidden'}"
                                style="font-size: 14px; margin: 0rem 0rem 0.5rem 0rem; color: #333333">请再次输入您的密码</label>
                            <input @keyon.enter="submit" type="password" class="form-control"
                                style="margin-bottom: 1rem; border-radius: 0px" v-model="re_password" name="re_password"
                                :placeholder="show_re_password_label? '' : '请再次输入您的密码'"
                                @focus="show_re_password_label = !show_re_password_label"
                                @blur="show_re_password_label = !show_re_password_label">
                        </form>
                        <div class="tip" style="margin-top: 0.5rem; font-size: 14px; color: #E86263; height: 21px">
                            {{  tip  }}</div>
                        <input type="button" class="btn btn-primary col-6 offset-6" value="提交"
                            style="float: right; font-size: 18px; margin-top: 3.6rem; border-radius: 0px"
                            @click="submit">
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
                phone_number: '',
                picode: '',
                msgcode: '',
                password: '',
                re_password: '',
                tip: '',
                imgsrc: "/file/picode/",
                show_phone_number_label: false,
                show_password_label: false,
                show_re_password_label: false,
                show_picode_label: false,
                show_msgcode_label: false,
            }
        },
        methods: {
            reload_picode: function () {
                this.imgsrc = this.imgsrc + Math.ceil(10)
            },
            send_msgcode: function () {
                if (this.send_msgcode_check()) {
                    this.$http.post('/account/sendmsgcode/', { 'phone_number': this.phone_number, 'picode': this.picode }, { emulateJSON: true }).then(result => {
                        this.tip = result.body.tip;
                    })
                }
            },
            send_msgcode_check: function () {
                if (Boolean(/^\w{4}$/.test(this.msgcode) && /^1[34578]\d{9}$|^09\d{8}$/.test(this.phone_number))) { return true; }
                return false;
            },
            check: function () {
                if (Boolean(!(this.msgcode && this.picode && this.phone_number && this.password))) {
                    this.tip = '请填写完整以上信息';
                    return false;
                }

                if (Boolean(this.phone_number && !(/^1[34578]\d{9}$|^09\d{8}$/.test(this.phone_number)))) {
                    this.tip = '手机号码不正确';
                    return false;
                }

                if (Boolean(this.picode && !/^\S{4}$/.test(this.picode))) {
                    this.tip = '图形验证码不正确';
                    return false;
                }

                if (Boolean(this.msgcode && !/^\w{4}$/.test(this.msgcode))) {
                    this.tip = '短信验证码不正确';
                    return false;
                }

                if (this.password != this.re_password) {
                    this.tip = '两次密码不一致';
                    return false;
                }

                if (!(/^\S{6,16}$/.test(this.password))) {
                    this.tip = '密码不正确';
                    return false;
                }

                return true;
            },
            mySwitch: function(target) {
                this.$emit('switch', target)
            },
            submit: function () {
                if (this.check()) {
                    this.$http.post('account/reset_password/', { phone_number: this.phone_number, password: this.password }, { emulateJSON: true }).then(result => {
                        if (result.body.status == 302) {
                            this.mySwitch(['home', null]);
                        }
                        else if (result.body.status == 400) {
                            this.tip = result.body.tip
                        }
                    })
                }
            },
        }
    };
</script>

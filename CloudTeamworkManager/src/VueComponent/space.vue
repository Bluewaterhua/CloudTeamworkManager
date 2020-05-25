<template>
    <div class="container" id="mainFunc">
        <div class="row">
            <div class="col-10 offset-1">
                <div class="card">
                    <div class="clearfix" style="width: 100%">
                        <div class="title">
                            <div class="text-uppercase lead font-weight-bold title_en">
                                about&nbsp;me
                            </div>
                            <div class="title_zh" @click="getInfo()">
                                基本资料
                            </div>
                        </div>
                    </div>

                    <div class="row no-gutters">
                        <div class="col-2 offset-1" style="text-align: center">
                            <label for="file" style="cursor: pointer">
                                <img :src="avatarsrc" class="rounded-circle" style="width: 7.5rem; height: 7.5rem">
                            </label>
                            <input ref="referenceUpload" type="file" name="avatar" accept=".jpg" @change="upload_avatar" id="file"
                                style="height: 0px; opacity: 0;">
                            <div id="name">{{name}}</div>
                        </div>
                        <div class="col-3 offset-1">
                            <ul class="list-unstyled">
                                <li>{{phone_number}}</li>
                                <li>{{sex | sexFormat}}</li>
                                <li>{{birthday}}</li>
                                <li>{{student_id}}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="clearfix" style="width: 100%">
                        <div class="title">
                            <div class="text-uppercase lead font-weight-bold title_en">
                                about&nbsp;me
                            </div>
                            <div class="title_zh">
                                详细资料
                            </div>
                        </div>
                    </div>

                    <div class="row no-gutters">
                        <table class="table col-10 offset-1" style="margin-bottom: 3rem">
                            <tbody>
                                <tr>
                                    <th scope="row">邮箱</th>
                                    <td><input v-model="email" :readonly="edit_status? false : 'readonly'">
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">方向</th>
                                    <td class="text-capitalize"><input readonly :value="major | majorFormat"></td>
                                </tr>
                                <tr>
                                    <th scope="row">年级</th>
                                    <td><input readonly :value="grade"></td>
                                </tr>
                                <tr>
                                    <th scope="row">宿舍</th>
                                    <td><input v-model="room" :readonly="edit_status? false : 'readonly'">
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">家庭住址</th>
                                    <td><input v-model="home_address" :readonly="edit_status? false : 'readonly'"></td>
                                </tr>
                                <tr>
                                    <th scope="row">监护人电话</th>
                                    <td><input v-model="guardian_phone" :readonly="edit_status? false : 'readonly'">
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">个人介绍</th>
                                    <td>
                                        <textarea @change="auto_height" v-model="introduction"
                                            :readonly="edit_status? false : 'readonly'" rows="1"
                                            id="textarea"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="edit_info" class="edit-icon btn btn-primary" type="button">
                            {{ edit_or_save }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scopted>
    .table td,
    .table th {
        border-top: 0px;
        font-size: 18px;
        color: #666666;
        vertical-align: top;
    }

    .table th {
        width: 9em;
        font-weight: initial;
        letter-spacing: 4px;
    }

    .card {
        margin: 1.2rem 0rem;
        border-radius: 0px;
        border-bottom: 0px;
        border-right: 0px;
        border-top: 0px;
        border-left: 0.25rem solid #448AFF;
    }

    input[readonly]:focus {
        border: 0px solid !important;
        border-bottom: 1px rgba(255, 255, 255, 0) solid !important;
        outline: 0px;
    }

    input[readonly] {
        color: #666666;
        border: 0px solid !important;
        border-bottom: 1px rgba(255, 255, 255, 0) solid !important;
    }

    textarea[readonly] {
        color: #666666;
        border: 1px rgba(255, 255, 255, 0) solid !important;
    }

    textarea[readonly]:focus {
        border: 1px rgba(255, 255, 255, 0) solid !important;
        outline: 0px;
    }

    input{
        color: #666666;
        border-bottom: 1px #ced4da solid;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
    }

    input:focus {
        border-bottom: 1px #80bdff solid;
        outline: 0px;
    }

    textarea {
        color: #666666;
        border: 1px #ced4da solid;
        width: 100%;
    }

    textarea:focus {
        border: 1px #80bdff solid;
        outline: 0px;
    }

    .edit-icon:hover {
        opacity: 1 !important;
    }

    .edit-icon{
        font-size: 0.9rem; 
        padding: 0px; 
        opacity: 0.3; 
        width: 3rem; 
        height: 1.5rem; 
        position: absolute; 
        left: 93%; 
        bottom: 3%; 
        border-radius: 0px;
    }

    .list-unstyled{
        font-size: 18px; 
        color: #666666;
    }

    #name{
        font-size: 30px; 
        margin: 0rem 0rem 3.0rem 0rem; 
        color: #333333;
    }
</style>

<script>
    import Vue from "vue"

    Vue.filter('majorFormat', function (major) {
        if (major == "P") {
            return "Python"
        }
        else if (major == 'F') {
            return "前端"
        }
        else if (major == 'N') {
            return "Node.js"
        }
        else if (major == 'M') {
            return "机电创新团队"
        }
        else if (major == 'J') {
            return "Java"
        }
        else if (major == 'D') {
            return "设计"
        }
    })
    Vue.filter('sexFormat', function (sex) {
        if (sex == 'f') {
            return "女"
        }
        else if (sex == 'm') {
            return "男"
        }
    })

    export default {
        data() {
            return {
                avatarsrc: '/file/avatar/' + Math.ceil(Math.random()*1000),
                edit_status: false,
                edit_or_save: "",
                email: "",
                room: "",
                home_address: "",
                guardian_phone: "",
                introduction: "",
                major: "",
                grade: "",
                phone_number: "",
                sex: "",
                birthday: "",
                student_id: "",
                name: "",
                avatar: "",
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo: function(){
                this.$http.get('/account/space/').then(result=>{
                    if (result.body.status == 200){
                        this.edit_or_save = result.body.info.edit_or_save;
                        this.email = result.body.info.email;
                        this.room = result.body.info.room;
                        this.home_address = result.body.info.home_address;
                        this.guardian_phone = result.body.info.guardian_phone;
                        this.introduction = result.body.info.introduction;
                        this.major = result.body.info.major;
                        this.grade = result.body.info.grade;
                        this.phone_number = result.body.info.phone_number;
                        this.sex = result.body.info.sex;
                        this.birthday = result.body.info.birthday;
                        this.student_id = result.body.info.student_id;
                        this.name = result.body.info.name;
                    }
                })
            },
            auto_height: function () {
                let textarea = document.getElementById("textarea");
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 5 + "px";
            },
            edit_info: function () {
                if (this.edit_status) {
                    this.$http.post("/account/change_information/", { "email": this.email, "room": this.room, "home_address": this.home_address, "guardian_phone": this.guardian_phone, "introduction": this.introduction }, { emulateJSON: true }).then(result => {
                        if (result.body.status == 200) {
                            this.edit_status = false;
                            this.edit_or_save = "编辑";
                        }
                        else {
                            this.tip = result.body.tip;
                        }
                    })
                    return;
                }
                this.edit_status = true;
                this.edit_or_save = "保存";
            },
            upload_avatar: function () {
                this.avatar = event.target.files[0];
                this.avatarsrc = window.URL.createObjectURL(this.avatar);
                this.$refs.referenceUpload.value = null;

                let formData = new FormData();
                formData.append('avatar', this.avatar);
                this.$http.post('/file/avatar/1/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(result => {
                    if (result.body.status == 200) {
                        ;
                    }
                    else {
                        return;
                    }
                })
            }
        }
    }
</script>
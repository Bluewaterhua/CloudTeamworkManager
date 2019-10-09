<template>
    <div id="mainFunc">
        <div v-if="is_show" style="z-index: 999; position: fixed; width: 100%;"
            class="alert alert-dismissible show fade" :class="[is_success? 'alert-success' : 'alert-warning']"
            role="alert">
            <strong>{{ strongTip }}</strong>{{ tip }}
            <button type="button" class="close" @click="is_show = !is_show" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div style="z-index: 998; position: fixed; background-color: rgba(255, 255, 255, 0.7); width: 100%; height: 100%; text-align: center"
            :style="{display: loading_display_mode}">
            <h1 style="position: relative; top: 20%">
                正在提交，请稍后...
            </h1>
            <img src="/static/pic/betta_fish.png" style="height: 100%;">
        </div>
        <div class="container">
            <div class="row no-gutters">
                <div class="col-10 offset-1">
                    <div class="card">
                        <div class="clearfix" style="width: 100%">
                            <div class="title">
                                <div class="text-uppercase lead font-weight-bold title_en">
                                    new&nbsp;task
                                </div>
                                <div class="title_zh">
                                    任务信息
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <table class="table col-10 offset-1" style="margin-bottom: 3rem">
                                <tbody>
                                    <tr>
                                        <th>任务名称</th>
                                        <td><input class="form-control" id="input_task" name="task_name" placeholder=""
                                                style="border-top:none;border-left: 0; border-right: 0; padding: 0; width: 192px;font-size: 18px"
                                                v-model="task_name">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>截止日期</th>
                                        <td>
                                            <input type="date" class="form-control" name="deadline" formmethod="post"
                                                v-model="deadline" style="width: 192px;font-size: 18px">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>任务状态</th>
                                        <td>
                                            <select name="task_status" v-model="task_status"
                                                style="height: 30px;color:#666666">
                                                <option value="-2">请选择</option>
                                                <option value='1'>进行中</option>
                                                <option value='0'>已挂起</option>
                                                <option value='-1'>已结束</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>任务详情</th>
                                        <td>
                                            <div>
                                                <textarea class="form-control" rows="6" placeholder="请输入项目详情......"
                                                    style="color: #666666;padding: 0;font-size: 18px"
                                                    name="task_description" v-model="task_description"></textarea>
                                                <small class="form-text text-muted"
                                                    style="margin-top: 10px;height: 40px;text-align: center;float: left;letter-spacing: 5px">
                                                    需要更详细的介绍?点击
                                                    <span class="md-trigger" data-modal="modal-8"
                                                        style="cursor: pointer;">
                                                        <img src="/static/pic/href_active.png">&nbsp;添加附件
                                                    </span>
                                                </small>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="clearfix" style="width: 100%">
                            <div class="title">
                                <div class="text-uppercase lead font-weight-bold title_en">
                                    members
                                </div>
                                <div class="title_zh">
                                    人员安排
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <table class="table col-10 offset-1 " style="margin-bottom: 1.5rem; width: 100%">
                                <tbody>
                                    <tr>
                                        <th colspan="3">添加成员</th>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary md-trigger"
                                                style="width: 140px; height: 50px; border-radius: 0;"
                                                data-modal="modal-5" @click="showall">
                                                点击选择
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row no-gutters" v-show="act_all">
                            <table class="table col-10 offset-1" style="margin-bottom: 3rem;">
                                <tbody>
                                    <tr>
                                        <th colspan="3">已选择成员(点击选择组长)</th>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_p">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <th colspan="2" style="font-size: 16px">Python</th>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_p">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <input v-for="(item, i) in selected_list_py" class="btn btn-outline-primary"
                                                :class="{active: (leader_list.indexOf(item) != -1)} " type="button"
                                                style="margin: 0px 2rem 0px 0rem; margin-right: 1.5rem; width: 85px; display: inline-block; border-radius: 0"
                                                :key="item.user_id" :value="item.name" @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                    <tr v-show="act_j">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <th colspan="2" style="font-size: 16px">Java</th>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_j">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <input v-for="(item, i) in selected_list_ja" class="btn btn-outline-primary"
                                                :class="{active: (leader_list.indexOf(item) != -1)} " type="button"
                                                style="margin: 0px 2rem 0px 0rem; margin-right: 1.5rem; width: 85px; display: inline-block; border-radius: 0"
                                                :key="item.user_id" :value="item.name" @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                    <tr v-show="act_n">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <th colspan="2" style="font-size: 16px">Node.js</th>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_n">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <input v-for="(item, i) in selected_list_no" class="btn btn-outline-primary"
                                                :class="{active: (leader_list.indexOf(item) != -1)} " type="button"
                                                style="margin: 0px 2rem 0px 0rem; margin-right: 1.5rem; width: 85px; display: inline-block; border-radius: 0"
                                                :key="item.user_id" :value="item.name" @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                    <tr v-show="act_f">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <th colspan="2" style="font-size: 16px">前端</th>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_f">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <input v-for="(item, i) in selected_list_fr" class="btn btn-outline-primary"
                                                :class="{active: (leader_list.indexOf(item) != -1)} " type="button"
                                                style="margin: 0px 2rem 0px 0rem; margin-right: 1.5rem; width: 85px; display: inline-block; border-radius: 0"
                                                :key="item.user_id" :value="item.name" @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                    <tr v-show="act_d">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <th colspan="2" style="font-size: 16px">设计</th>
                                        <td></td>
                                    </tr>
                                    <tr v-show="act_d">
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td style="width: .6rem; padding: 0px"></td>
                                        <td>
                                            <input v-for="(item, i) in selected_list_de" class="btn btn-outline-primary"
                                                :class="{active: (leader_list.indexOf(item) != -1)} " type="button"
                                                style="margin: 0px 2rem 0px 0rem; margin-right: 1.5rem; width: 85px; display: inline-block; border-radius: 0"
                                                :key="item.user_id" :value="item.name" @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row justify-content-md-center" style="margin-bottom: 20px">
                        <input type="button" class="btn btn-primary" value="确认提交" :disabled="subm"
                            style="width: 200px;height: 40px;text-align: center;color:#ffffff ;border-radius:0"
                            @click="submit">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="md-modal md-effect-8" id="modal-5">
                <div class="md-content">
                    <div>
                        <div class="row justify-content-between">
                            <div class="col-4" style="margin-top: 10px; font-size: 24px">
                                添加成员
                            </div>
                            <div class="col-2" style="margin-top: 10px;">
                                <button class="md-close btn-sm btn-primary"
                                    style="background-color: transparent; border: none; height: 100%">
                                    <img src="/static/pic/close.png">
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6" style="padding-right: 0;">
                                <input type="search" id="search" class="form-control">
                            </div>
                            <div style="float: left;margin-top: 2px">
                                <a href="#">
                                    <img src="/static/pic/serch.png">
                                </a>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 5px">
                            <div class="col-3">
                                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                                    aria-orientation="vertical">
                                    <a class="nav-link show active" id="v-pills-home-tab" data-toggle="pill"
                                        href="#v-pills-home" role="tab" aria-controls="v-pills-home"
                                        aria-selected="true" style="border-radius: 0">Python</a>
                                    <a class="nav-link show" id="v-pills-profile-tab" data-toggle="pill"
                                        href="#v-pills-profile" role="tab" aria-controls="v-pills-profile"
                                        aria-selected="false" style="border-radius: 0">Java</a>
                                    <a class="nav-link show" id="v-pills-messages-tab" data-toggle="pill"
                                        href="#v-pills-messages" role="tab" aria-controls="v-pills-messages"
                                        aria-selected="false" style="border-radius: 0">Js</a>
                                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill"
                                        href="#v-pills-settings" role="tab" aria-controls="v-pills-settings"
                                        aria-selected="false" style="border-radius: 0">前端</a>
                                    <a class="nav-link" id="v-pills-design-tab" data-toggle="pill"
                                        href="#v-pills-design" role="tab" aria-controls="v-pills-tabContent"
                                        aria-selected="false" style="border-radius: 0">设计</a>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="tab-content" id="v-pills-tabContent">
                                    <div class="tab-pane fade active show" id="v-pills-home" role="tabpanel"
                                        aria-labelledby="v-pills-home-tab">
                                        <div class="row">
                                            <div class="col-12" style="margin-bottom: 5px; height: 100px">
                                                <input type="button" class="btn btn-outline-primary x"
                                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                                    v-for="item in python_list" :key="item.user_id" :value="item.name"
                                                    @click="del(item.user_id)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel"
                                        aria-labelledby="v-pills-profile-tab">
                                        <div class="row">
                                            <div class="col-12" style="margin-bottom: 5px">
                                                <input type="button" class="btn btn-outline-primary x"
                                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                                    v-for="item_ja in java_list" :key="item_ja.id" :value="item_ja.name"
                                                    @click="del_ja(item_ja.user_id)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel"
                                        aria-labelledby="v-pills-messages-tab">
                                        <div class="row">
                                            <input type="button" class="btn btn-outline-primary x"
                                                style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                                v-for="item_no in node_list" :key="item_no.id" :value="item_no.name"
                                                @click="del_no(item_no.user_id)">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel"
                                        aria-labelledby="v-pills-settings-tab">
                                        <div class="row">
                                            <input type="button" class="btn btn-outline-primary x"
                                                style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                                v-for="item_fr in front_list" :key="item_fr.id" :value="item_fr.name"
                                                @click="del_fr(item_fr.user_id)">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-design" role="tabpanel"
                                        aria-labelledby="v-pills-tabContent-tab">
                                        <div class="row">
                                            <input type="button" class="btn btn-outline-primary x"
                                                style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                                v-for="item_de in design_list" :key="item_de.id" :value="item_de.name"
                                                @click="del_de(item_de.user_id)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style="text-align:center; width: 100%; color:deepskyblue;">
                        <div class="row">
                            <div class="col-12">
                                <input type="button" class="btn btn-outline-primary"
                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                    v-for="item_s in selected_list_py" :key="item_s.user_id" :value="item_s.name"
                                    @click="add(item_s.user_id)">
                                <input type="button" class="btn btn-outline-primary"
                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                    v-for="item_ja in selected_list_ja" :key="item_ja.user_id" :value="item_ja.name"
                                    @click="add_ja(item_ja.user_id)">
                                <input type="button" class="btn btn-outline-primary"
                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                    v-for="item_no in selected_list_no" :key="item_no.user_id" :value="item_no.name"
                                    @click="add_no(item_no.user_id)">
                                <input type="button" class="btn btn-outline-primary"
                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                    v-for="item_fr in selected_list_fr" :key="item_fr.user_id" :value="item_fr.name"
                                    @click="add_fr(item_fr.user_id)">
                                <input type="button" class="btn btn-outline-primary"
                                    style="width: 95px;height: 37px;text-align: center; margin: 0px 1.2rem 1rem 0rem; border-radius: 0"
                                    v-for="item_de in selected_list_de" :key="item_de.user_id" :value="item_de.name"
                                    @click="add_de(item_de.user_id)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-modal md-effect-8" id="modal-8">
                <div class="md-content">
                    <div style="min-height: 400px">
                        <div class="container-fluid">
                            <div class="row justify-content-between">
                                <div class="col-4" style="margin-top: .5rem; font-size: 24px">
                                    添加附件
                                </div>
                                <span class="col-2 md-close" style="margin-top: .5rem; cursor: pointer;"
                                    @click="hide_modal()">
                                    <img src="/static/pic/close.png"
                                        style="position: relative; top: 50%; transform: translateY(-50%); float: right">
                                </span>
                            </div>
                            <div style="height: 24rem" v-if="!load">
                                <div class="row no-gutters"
                                    style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);text-align: center">
                                    <div class="row col-10 offset-1">
                                        <label for="file" class="btn btn-primary col-6 offset-3"
                                            style="cursor: pointer;border-radius: 0">点击选择</label>
                                        <input ref="referenceUpload" type="file" name="appendix" id="file" style="height: 0px; opacity: 0"
                                            v-on:change="add_appendix($event)">
                                        <small class="col-6 offset-3"
                                            style="color: #C9C9C9;float:left; padding: 0px; text-align: left">文件不要超过10M！
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="load" style="height: 23rem; margin-top: 1rem">
                                <div v-if="load">
                                    <label for="file" class="btn btn-primary col-3"
                                        style="cursor: pointer; margin: 0px 0px 0px 7.5px; border-radius: 0px">点击选择</label>
                                    <input ref="referenceUpload" type="file" name="appendix" id="file" style="height: 0px; display: none"
                                        v-on:change="add_appendix($event)">
                                    <span
                                        style="color: #C9C9C9; vertical-align: bottom; font-size: 80%; font-weight: 400; margin-left: .8rem">
                                        文件不要超过10M！
                                    </span>
                                </div>
                                <div class="col-12" style="max-height: 18rem; overflow-y: auto; margin: 1rem 0px">
                                    <table style="width: 100%; border-collapse:separate; border-spacing:0px 1rem;">
                                        <tbody>
                                            <tr v-for="(each, index) in appendix">
                                                <th style="width: 4rem;">
                                                    <img :src="each.name | getLogoSrc">
                                                </th>
                                                <td>
                                                    <div>
                                                        {{each.name}}
                                                    </div>
                                                    <div style="margin-top: 1.2rem">
                                                        {{each.size}}字节
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <button
                                                            style="background: url(/static/pic/826.png); width:24px; height:24px; border:none; float: right"
                                                            @click="remove_appendix(index)">
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-overlay"></div>
        </div>
    </div>
</template>

<style scoped>
    input.form-control:focus {
        box-shadow: 0 0 0;
    }

    input.form-control {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        padding: 0;
        border-radius: 0;
    }

    .form-control {
        border-radius: 0;
    }

    .table td,
    .table th {
        border-top: 0px;
        font-size: 18px;
        color: #666666;
        vertical-align: top;
    }

    .table th {
        width: 7em;
        font-weight: initial;
        letter-spacing: 4px;
    }

    .card {
        margin: 1.2rem 0rem;
        border-radius: 0px;
        border-bottom: 0px;
        border-left: 0px;
        border-right: 0px;
        border-top: 0.25rem solid #448AFF;
    }
</style>

<script>
    import classie from '../../static/js/animation/classie.js'
    
    export default {
        data() {
            return {
                task_id: 0,

                //原表单内提交的数据
                task_name: '',
                deadline: '',
                task_status: -2,
                task_description: '',

                //接口数据
                members_on: [],
                leaders_on: [],
                members: [],
                leaders: [],

                //python组 py
                items_P: [],
                python_list: [],
                selected_list_py: [],
                flag: false,
                leader_list: [],

                //java组  ja
                items_J: [],
                java_list: [],
                selected_list_ja: [],
                flag_ja: false,

                //node组 no
                items_N: [],
                node_list: [],
                selected_list_no: [],
                flag_no: false,

                //前端组 fr front
                items_F: [],
                front_list: [],
                selected_list_fr: [],
                flag_fr: false,

                //设计组 de design
                items_D: [],
                design_list: [],
                selected_list_de: [],
                flag_de: false,

                //文字
                act_p: false,
                act_j: false,
                act_n: false,
                act_f: false,
                act_d: false,
                act_all: false,

                //附件
                appendix: [],
                load: false,

                //submit 按钮
                subm: false,

                // 浮动提示框
                is_success: false,
                is_show: false,
                strongTip: "",
                tip: "",
                loading_display_mode: "none",
            }
        },
        filters: {
            'getLogoSrc': name => {
                var pptClassFilenameExtension = ['ppt', 'pptx', 'pptm', 'potm', 'pot', 'ppsx', 'pps', 'ppa']
                var wordClassFilenameExtension = ['docx', 'docm', 'dotx', 'dotm', 'dot']
                var excelClassFilenameExtension = ['xlsx', 'xlsm', 'xlsb', 'xls', 'xltx', 'xltm', 'xlt', 'xls', 'xlam', 'xla']
                var archiveClassFilenameExtension = ['zip', 'rar', '7z']
                var pictureClassFilenameExtension = ['jpg', 'jpeg', 'png', 'ico', 'gif', 'bmp']
                var textClassFilenameExtension = ['txt']
                var pdfClassFilenameExtension = ['pdf']

                var filenameExtension = name.substring(name.lastIndexOf('.') + 1);
                if (pptClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/ppt.png'
                }
                if (excelClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/excel.png'
                }
                if (wordClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/word.png'
                }
                if (pdfClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/pdf.png'
                }
                if (pictureClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/picture.png'
                }
                if (archiveClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/archive.png'
                }
                if (textClassFilenameExtension.indexOf(filenameExtension) != -1) {
                    return '/static/pic/text.png'
                }
                return '/static/pic/unknown.png';
            }
        },
        mounted() {
            this.modalEffects();
        },
        methods: {
            modalEffects: function() {

                var overlay = document.querySelectorAll( '.md-overlay' )[1];
                
                [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

                    var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                        close = modal.querySelector( '.md-close' );

                    function removeModal( hasPerspective ) {
                        classie.remove( modal, 'md-show' );

                        if( hasPerspective ) {
                            classie.remove( document.documentElement, 'md-perspective' );
                        }
                    }

                    function removeModalHandler() {
                        removeModal( classie.has( el, 'md-setperspective' ) ); 
                    }

                    el.addEventListener( 'click', function( ev ) {
                        classie.add( modal, 'md-show' );
                        overlay.removeEventListener( 'click', removeModalHandler );
                        overlay.addEventListener( 'click', removeModalHandler );

                        if( classie.has( el, 'md-setperspective' ) ) {
                            setTimeout( function() {
                                classie.add( document.documentElement, 'md-perspective' );
                            }, 25 );
                        }
                    });

                    close.addEventListener( 'click', function( ev ) {
                        ev.stopPropagation();
                        removeModalHandler();
                    });
                } );
            },
            showall() {
                this.$http.get('/task/get_members/?key=P').then(result => {
                    this.items_P = result.body;
                    if (this.python_list.length == 0 && this.selected_list_py.length == 0) {
                        for (let i = 0; i < this.items_P.length; i++) {
                            let obj = this.items_P[i];
                            this.python_list.push(obj);
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=J').then(result => {
                    this.items_J = result.body;
                    if (this.java_list.length == 0 && this.selected_list_ja.length == 0) {
                        for (let i = 0; i < this.items_J.length; i++) {
                            let obj = this.items_J[i];
                            this.java_list.push(obj);
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=N').then(result => {
                    this.items_N = result.body;
                    if (this.node_list.length == 0 && this.selected_list_no.length == 0) {
                        for (let i = 0; i < this.items_N.length; i++) {
                            let obj = this.items_N[i];
                            this.node_list.push(obj);
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=F').then(result => {
                    this.items_F = result.body;
                    if (this.front_list.length == 0 && this.selected_list_fr.length == 0) {
                        for (let i = 0; i < this.items_F.length; i++) {
                            let obj = this.items_F[i];
                            this.front_list.push(obj);
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=D').then(result => {
                    this.items_D = result.body;
                    if (this.design_list.length == 0 && this.selected_list_de.length == 0) {
                        for (let i = 0; i < this.items_D.length; i++) {
                            let obj = this.items_D[i];
                            this.design_list.push(obj);
                        }
                    }
                });
            },
            add(id) {
                let index = this.selected_list_py.findIndex(obj => {
                    if (obj.user_id == id) {
                        return true
                    }
                });
                this.python_list.push(this.selected_list_py[index]);
                this.selected_list_py.splice(index, 1);
                if (this.selected_list_py.length == 0)
                    this.act_p = false;
                if (this.selected_list_py.length == 0 && this.selected_list_ja.length == 0 && this.selected_list_de.length == 0 && this.selected_list_no.length == 0 & this.selected_list_fr.length == 0) {
                    this.act_all = false;
                }
            },
            del(id) {
                let index = this.python_list.findIndex(obj => {
                    if (obj.user_id == id) {
                        return true
                    }
                });
                if (this.selected_list_py.length == 0) {
                    this.act_p = true;
                    this.act_all = true;
                }
                this.selected_list_py.push(this.python_list[index]);
                this.python_list.splice(index, 1);
            },
            set_leader(e, item) {
                if (e.target.classList.contains("active")) {
                    e.target.classList.remove("active");
                    if (this.leader_list.indexOf(item) > -1)//判断组长是否被选中
                    {
                        this.leader_list.splice(this.leader_list.indexOf(item));
                    }
                } else {
                    e.target.classList.add("active");
                    if (this.leader_list.indexOf(item) > -1)//判断组长是否被选中
                    {
                        ;
                    } else {
                        this.leader_list.push(item);
                    }
                }
            },
            add_ja(id_ja) {
                let index = this.selected_list_ja.findIndex(obj_ja => {
                    if (obj_ja.user_id == id_ja) {
                        return true
                    }
                });
                this.java_list.push(this.selected_list_ja[index]);
                this.selected_list_ja.splice(index, 1);
                if (this.selected_list_ja.length == 0)
                    this.act_j = false;
                if (this.selected_list_py.length == 0 && this.selected_list_ja.length == 0 && this.selected_list_de.length == 0 && this.selected_list_no.length == 0 & this.selected_list_fr.length == 0) {
                    this.act_all = false;
                }
            },
            del_ja(id_ja) {
                let index = this.java_list.findIndex(obj_ja => {
                    if (obj_ja.user_id == id_ja) {
                        return true
                    }
                });
                if (this.selected_list_ja.length == 0) {
                    this.act_j = true;
                    this.act_all = true;
                }
                this.selected_list_ja.push(this.java_list[index]);
                this.java_list.splice(index, 1);
            },
            add_no(id_no) {
                let index = this.selected_list_no.findIndex(obj_no => {
                    if (obj_no.user_id == id_no) {
                        return true
                    }
                });
                this.node_list.push(this.selected_list_no[index]);
                this.selected_list_no.splice(index, 1);
                if (this.selected_list_no.length == 0)
                    this.act_n = false;
                if (this.selected_list_py.length == 0 && this.selected_list_ja.length == 0 && this.selected_list_de.length == 0 && this.selected_list_no.length == 0 & this.selected_list_fr.length == 0) {
                    this.act_all = false;
                }
            },
            del_no(id_no) {
                let index = this.node_list.findIndex(obj_no => {
                    if (obj_no.user_id == id_no) {
                        return true
                    }
                });
                if (this.selected_list_no.length == 0) {
                    this.act_n = true;
                    this.act_all = true;
                }
                this.act_all = true;
                this.selected_list_no.push(this.node_list[index]);
                this.node_list.splice(index, 1);
            },
            add_fr(id_fr) {
                let index = this.selected_list_fr.findIndex(obj_fr => {
                    if (obj_fr.user_id == id_fr) {
                        return true
                    }
                });
                this.front_list.push(this.selected_list_fr[index]);
                this.selected_list_fr.splice(index, 1);
                if (this.selected_list_fr.length == 0)
                    this.act_f = false;
                if (this.selected_list_py.length == 0 && this.selected_list_ja.length == 0 && this.selected_list_de.length == 0 && this.selected_list_no.length == 0 & this.selected_list_fr.length == 0) {
                    this.act_all = false;
                }
            },
            del_fr(id_fr) {
                let index = this.front_list.findIndex(obj_fr => {
                    if (obj_fr.user_id == id_fr) {
                        return true
                    }
                });
                if (this.selected_list_fr.length == 0) {
                    this.act_f = true;
                    this.act_all = true;
                }
                this.selected_list_fr.push(this.front_list[index]);
                this.front_list.splice(index, 1);
            },
            add_de(id_de) {
                let index = this.selected_list_de.findIndex(obj_de => {
                    if (obj_de.user_id == id_de) {
                        return true
                    }
                });
                this.design_list.push(this.selected_list_de[index]);
                this.selected_list_de.splice(index, 1)
                if (this.selected_list_de.length == 0)
                    this.act_d = false;
                if (this.selected_list_py.length == 0 && this.selected_list_ja.length == 0 && this.selected_list_de.length == 0 && this.selected_list_no.length == 0 & this.selected_list_fr.length == 0) {
                    this.act_all = false;
                }
            },
            del_de(id_de) {
                let index = this.design_list.findIndex(obj_de => {
                    if (obj_de.user_id == id_de) {
                        return true
                    }

                });
                if (this.selected_list_de.length == 0) {
                    this.act_d = true;
                    this.act_all = true;
                }
                this.selected_list_de.push(this.design_list[index]);
                this.design_list.splice(index, 1);
            },
            submit() {
                this.loading_display_mode = 'block'
                //先将选好的人的列表循环加入接口所需要的列表
                if (this.members.length == 0 && this.leaders.length == 0) {
                    for (let i = 0; i < this.selected_list_py.length; i++) {
                        this.members.push(this.selected_list_py[i].user_id)
                    }
                    for (let i = 0; i < this.selected_list_ja.length; i++) {
                        this.members.push(this.selected_list_ja[i].user_id)
                    }
                    for (let i = 0; i < this.selected_list_no.length; i++) {
                        this.members.push(this.selected_list_no[i].user_id)
                    }
                    for (let i = 0; i < this.selected_list_fr.length; i++) {
                        this.members.push(this.selected_list_fr[i].user_id)
                    }
                    for (let i = 0; i < this.selected_list_de.length; i++) {
                        this.members.push(this.selected_list_de[i].user_id)
                    }
                    for (let i = 0; i < this.leader_list.length; i++) {
                        this.leaders.push(this.leader_list[i].user_id)
                    }
                }
                this.subm = true;
                this.members_on = this.members;
                this.leaders_on = this.leaders;
                this.members_on = JSON.stringify(this.members_on);
                this.leaders_on = JSON.stringify(this.leaders_on);
                this.$http.post('/task/create_task/',
                    {
                        'members': this.members_on,
                        'leaders': this.leaders_on,
                        'task_name': this.task_name,
                        'task_status': Number(this.task_status),
                        'deadline': this.deadline,
                        'task_description': this.task_description,
                    }, { emulateJSON: true }).then(res => {
                        if (res.body.status == 200) {
                            this.task_id = res.body.task_id;
                            this.upload_appendix();
                            new Promise(resolve => setTimeout(resolve, 3000))
                            this.$emit('switch', ['taskDetail', this.task_id]);
                        } else if (res.body.status == 400) {
                            this.members = [];
                            this.leaders = [];
                            this.is_success = false;
                            this.strongTip = "任务创建失败！"
                            this.tip = res.body.tip;
                            this.is_show = true;
                        }
                    });
            },
            add_appendix: function () {
                this.appendix.push(event.target.files[0]);
                this.$refs.referenceUpload.value = null;
                this.load = true;
            },
            remove_appendix: function (index) {
                this.appendix.splice(index, 1);
                if (this.appendix.length == 0) {
                    this.load = false;
                }
            },
            upload_appendix: function () {
                if (this.appendix.length == 0) {
                    this.is_success = true;
                    this.strongTip = "任务创建成功！"
                    this.tip = "即将返回任务详情页"
                    this.is_show = true;
                    return;
                }

                this.is_success = true;
                this.strongTip = "任务创建成功！"
                this.tip = "正在上传附件，请稍后..."
                this.is_show = true;

                var each = null;
                for (each of this.appendix) {
                    var formData = new FormData()
                    formData.append('appendix', each)
                    this.$http.post('/file/appendix/' + this.task_id + '/xxx/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(result => {
                        if (result.status == 200) {
                            ;
                        } else if (result.status == 400) {
                            ;
                        }
                    })
                }

                this.is_success = true;
                this.strongTip = "附件上传成功！"
                this.tip = "即将返回任务详情页"
                this.is_show = true;
            }
        }
    }
</script>
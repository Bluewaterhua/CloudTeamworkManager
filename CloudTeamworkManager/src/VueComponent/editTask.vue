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
                                                        style="cursor: pointer;" @click="get_appendixes">
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
                        <div class="row no-gutters">
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
                                                style="margin-right: 1.5rem; width: 5rem;border-radius: 0" :key="item.user_id"
                                                :value="item.name" @click="set_leader($event,item)">
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
                                            <input class="btn btn-outline-primary" type="button"
                                                :class="{active: (leader_list.indexOf(item) != -1)} "
                                                style="margin-right: 1.5rem; width: 5rem;border-radius: 0;border-radius: 0"
                                                v-for="(item,i) in selected_list_ja" :key="item.user_id" :value="item.name"
                                                @click="set_leader($event,item)">
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
                                            <input class="btn btn-outline-primary" type="button"
                                                :class="{active: (leader_list.indexOf(item) != -1)} "
                                                style="margin-right: 1.5rem; width: 5rem"
                                                v-for="(item,i) in selected_list_no" :key="item.user_id" :value="item.name"
                                                @click="set_leader($event,item)">
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
                                            <input class="btn btn-outline-primary" type="button"
                                                :class="{active: (leader_list.indexOf(item) != -1)} "
                                                style="margin-right: 1.5rem; width: 5rem"
                                                v-for="(item,i) in selected_list_fr" :key="item.user_id" :value="item.name"
                                                @click="set_leader($event,item)">
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
                                            <input class="btn btn-outline-primary" type="button"
                                                :class="{active: (leader_list.indexOf(item) != -1)} "
                                                style="margin-right: 1.5rem; width: 5rem"
                                                v-for="(item,i) in selected_list_de" :key="item.user_id" :value="item.name"
                                                @click="set_leader($event,item)">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row justify-content-md-center" style="margin-bottom: 20px">
                        <input type="button" class="btn btn-primary" value="确认提交" :disabled="subm"
                            style="width: 200px;height: 40px;text-align: center;color:#ffffff ;border-radius: 0"
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
                                        aria-selected="true" style="border-radius: 0px">Python</a>
                                    <a class="nav-link show" id="v-pills-profile-tab" data-toggle="pill"
                                        href="#v-pills-profile" role="tab" aria-controls="v-pills-profile"
                                        aria-selected="false" style="border-radius: 0px">Java</a>
                                    <a class="nav-link show" id="v-pills-messages-tab" data-toggle="pill"
                                        href="#v-pills-messages" role="tab" aria-controls="v-pills-messages"
                                        aria-selected="false" style="border-radius: 0px">Js</a>
                                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill"
                                        href="#v-pills-settings" role="tab" aria-controls="v-pills-settings"
                                        aria-selected="false" style="border-radius: 0px">前端</a>
                                    <a class="nav-link" id="v-pills-design-tab" data-toggle="pill"
                                        href="#v-pills-design" role="tab" aria-controls="v-pills-tabContent"
                                        aria-selected="false" style="border-radius: 0px">设计</a>
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
                                                style="width: 95px;height: 37px;text-align: center; margin-right: 1.2rem;border-radius: 0"
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
                            <div style="height: 24rem" v-if="is_empty">
                                <div class="row no-gutters"
                                    style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);text-align: center">
                                    <div class="row col-10 offset-1">
                                        <label for="file" class="btn btn-primary col-6 offset-3"
                                            style="cursor: pointer; border-radius: 0px">点击选择</label>
                                        <input ref="referenceUpload" type="file" name="appendix" id="file" style="height: 0px; opacity: 0"
                                            v-on:change="add_appendix($event)">
                                        <small class="col-6 offset-3"
                                            style="color: #C9C9C9;float:left; padding: 0px; text-align: left">文件不要超过10M！</small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!is_empty" style="height: 23rem; margin-top: 1rem">
                                <div v-if="!is_empty">
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
                                            <tr v-for="(each, index) in appendixes">
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
                                                            style="background: url(/static/pic/826.png); width:24px; height:24px; border:none; float: right; margin-left: 1.2rem"
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
            <div class="md-overlay" @click="hide_modal()"></div>
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
                leader_list: [],
                members_loaded: false,

                //原表单内提交的数据
                task_name: '',
                deadline: '',
                task_status: '',
                task_description: '',
                members_accept: '',
                leaders_accept: '',

                //接口数据
                members: [],
                leaders: [],

                //python组 py
                items_P: [],
                python_list: [],
                selected_list_py: [],
                flag: false,

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

                //文字显示
                act_p: false,
                act_j: false,
                act_n: false,
                act_f: false,
                act_d: false,
                act_all: false,

                //附件
                appendixes: [],
                is_empty: true,
                itmes_a: [],
                pptClassFilenameExtension: ['ppt', 'pptx', 'pptm', 'potm', 'pot', 'ppsx', 'pps', 'ppa'],
                wordClassFilenameExtension: ['docx', 'docm', 'dotx', 'dotm', 'dot'],
                excelClassFilenameExtension: ['xlsx', 'xlsm', 'xlsb', 'xls', 'xltx', 'xltm', 'xlt', 'xls', 'xlam', 'xla'],
                archiveClassFilenameExtension: ['zip', 'rar', '7z'],
                pictureClassFilenameExtension: ['jpg', 'jpeg', 'png', 'ico', 'gif', 'bmp'],
                textClassFilenameExtension: ['txt'],
                pdfClassFilenameExtension: ['pdf'],

                //submit按钮
                subm: false,

                // 浮动提示框
                is_success: false,
                is_show: false,
                strongTip: "",
                tip: "",
            }
        },
        filters: {
            'getLogoSrc': name => {
                var pptClassFilenameExtension = ['ppt', 'pptx', 'pptm', 'potm', 'pot', 'ppsx', 'pps', 'ppa'];
                var wordClassFilenameExtension = ['docx', 'docm', 'dotx', 'dotm', 'dot'];
                var excelClassFilenameExtension = ['xlsx', 'xlsm', 'xlsb', 'xls', 'xltx', 'xltm', 'xlt', 'xls', 'xlam', 'xla'];
                var archiveClassFilenameExtension = ['zip', 'rar', '7z'];
                var pictureClassFilenameExtension = ['jpg', 'jpeg', 'png', 'ico', 'gif', 'bmp'];
                var textClassFilenameExtension = ['txt'];
                var pdfClassFilenameExtension = ['pdf'];

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
        created() {
            this.getInfo();
        },
        props: ['globle_props'],
        updated() {
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
            getInfo() {
                this.$http.get('/task/edit_task/' + this.globle_props.task_id +'/').then(result => {
                    if (result.status == 200){
                        this.task_name = result.body.info.task_name;
                        this.deadline = result.body.info.deadline;
                        this.task_status = result.body.info.task_status;
                        this.members_accept = result.body.info.members;
                        this.leaders_accept = result.body.info.leaders;
                        this.task_description = result.body.info.task_description;
                    }
                    this.classify();
                })
            },
            classify: function() {
                // 生命周期中页面加载时请求的数据
                // java组
                var i = null;
                var j = null;
                for (i of this.members_accept) {
                    //如果方向为python
                    if (i.major == 'P') {
                        this.act_all = true;
                        this.act_p = true;
                        this.selected_list_py.push(i);
                        for (j of this.python_list) {
                            if (j.user_id == i.user_id) {
                                let index = this.python_list.findIndex(obj => {
                                    if (obj.user_id == i.user_id)
                                        return true
                                });
                                this.python_list.splice(index, 1)
                            }
                        }
                    }
                    //如果方向为java
                    if (i.major == 'J') {
                        this.act_all = true;
                        this.act_j = true;
                        this.selected_list_ja.push(i);
                        for (j of this.java_list) {
                            if (j.user_id == i.user_id) {
                                let index = this.java_list.findIndex(obj => {
                                    if (obj.user_id == i.user_id)
                                        return true
                                });
                                this.java_list.splice(index, 1)
                            }
                        }
                    }
                    //如果方向为前端
                    if (i.major == 'F') {
                        this.act_all = true;
                        this.act_f = true;
                        this.selected_list_fr.push(i);
                        for (j of this.front_list) {
                            if (j.user_id == i.user_id) {
                                let index = this.front_list.findIndex(obj => {
                                    if (obj.user_id == i.user_id)
                                        return true
                                });
                                this.front_list.splice(index, 1)
                            }
                        }
                    }
                    if (i.major == 'N') {
                        this.act_all = true;
                        this.act_n = true;
                        this.selected_list_no.push(i);
                        for (j of this.node_list) {
                            if (j.user_id == i.user_id) {
                                let index = this.node_list.findIndex(obj => {
                                    if (obj.user_id == i.user_id)
                                        return true
                                });
                                this.node_list.splice(index, 1)
                            }
                        }
                    }
                    if (i.major == 'D') {
                        this.act_all = true;
                        this.act_d = true;
                        this.selected_list_de.push(i);
                        for (j of this.design_list) {
                            if (j.user_id == i.user_id) {
                                let index = this.design_list.findIndex(obj => {
                                    if (obj.user_id == i.user_id)
                                        return true
                                });
                                this.design_list.splice(index, 1)
                            }
                        }
                    }
                }
                //如果显示的人中有组长
                var m = null;
                var n = null;
                for (m of this.leaders_accept) {
                    for (n of this.members_accept) {
                        if (n.user_id == m.user_id) {
                            this.leader_list.push(n)
                        }
                    }
                }
            },
            hide_modal: function () {
                this.edit_button = true;
                this.add_button = true;
                this.isActive = false;
            },
            showall() {
                if (this.members_loaded){
                    return;
                }
                var each = null;
                var item = null;

                this.members_loaded = true;
                this.$http.get('/task/get_members/?key=P').then(result => {
                    this.items_P = result.body;
                    this.python_list = this.items_P.concat()
                    for (each of this.items_P){
                        for (item of this.members_accept) {
                            if (each.user_id == item.user_id) {
                                this.python_list.splice(this.python_list.indexOf(each), 1)
                                break;
                            }
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=J').then(result => {
                    this.items_J = result.body;
                    this.java_list = this.items_J.concat()
                    for (each of this.items_J){
                        for (item of this.members_accept) {
                            if (each.user_id == item.user_id) {
                                this.java_list.splice(this.java_list.indexOf(each), 1)
                                break;
                            }
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=N').then(result => {
                    this.items_N = result.body;
                    this.node_list = this.items_N.concat()
                    for (each of this.items_N){
                        for (item of this.members_accept) {
                            if (each.user_id == item.user_id) {
                                this.node_list.splice(this.node_list.indexOf(each), 1)
                                break;
                            }
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=F').then(result => {
                    this.items_F = result.body;
                    this.front_list = this.items_F.concat()
                    for (each of this.items_F){
                        for (item of this.members_accept) {
                            if (each.user_id == item.user_id) {
                                this.front_list.splice(this.front_list.indexOf(each), 1)
                                break;
                            }
                        }
                    }
                });
                this.$http.get('/task/get_members/?key=D').then(result => {
                    this.items_D = result.body;
                    this.design_list = this.items_D.concat()
                    for (each of this.items_D){
                        for (item of this.members_accept) {
                            if (each.user_id == item.user_id) {
                                this.design_list.splice(this.design_list.indexOf(each), 1)
                                break;
                            }
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
                if (this.leader_list.indexOf(this.selected_list_py[index]) > -1) {
                    this.leader_list.splice(this.leader_list.indexOf(this.selected_list_py[index]), 1)
                }
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
                        let index = this.leader_list.findIndex(obj => {
                            if (obj.user_id == item.user_id) {
                                return true
                            }
                        });
                        this.leader_list.splice(index, 1);
                    }
                } else {
                    e.target.classList.add("active");
                    if (this.leader_list.indexOf(item) > -1)//判断组长是否被选中
                    {
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
                if (this.leader_list.indexOf(this.selected_list_ja[index]) > -1) {
                    this.leader_list.splice(this.leader_list.indexOf(this.selected_list_ja[index]), 1)
                }
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
                if (this.leader_list.indexOf(this.selected_list_no[index]) > -1) {
                    this.leader_list.splice(this.leader_list.indexOf(this.selected_list_no[index]), 1)
                }
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
                if (this.leader_list.indexOf(this.selected_list_fr[index]) > -1) {
                    this.leader_list.splice(this.leader_list.indexOf(this.selected_list_fr[index]), 1)
                }
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
                if (this.leader_list.indexOf(this.selected_list_de[index]) > -1) {
                    this.leader_list.splice(this.leader_list.indexOf(this.selected_list_de[index]), 1)
                }
                this.selected_list_de.splice(index, 1);
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
                this.subm = true;
                this.members = JSON.stringify(this.members);
                this.leaders = JSON.stringify(this.leaders);

                this.$http.post('/task/edit_task/' + this.globle_props.task_id + '/',
                    {
                        'members': this.members,
                        'leaders': this.leaders,
                        'task_name': this.task_name,
                        'task_status': Number(this.task_status),
                        'deadline': this.deadline,
                        'task_description': this.task_description,
                    }, { emulateJSON: true }).then(res => {
                        if (res.body.status == 302) {
                            this.$emit('switch', ['taskDetail', this.globle_props.task_id]);
                        } else if (res.body.status == 400) {
                            this.is_success = false;
                            this.strongTip = "任务编辑失败！"
                            this.tip = res.body.tip;
                            this.is_show = true;
                            this.members = [];
                            this.leaders = [];
                        }
                    });
            },
            add_appendix: function () {
                this.appendixes.push(event.target.files[0]);
                this.appendixes[this.appendixes.length - 1]['publisher'] = this.user_id;
                this.$refs.referenceUpload.value = null;
                this.is_empty = false;

                var formData = new FormData()
                formData.append('appendix', this.appendixes[this.appendixes.length - 1])
                this.$http.post('/file/appendix/' + this.globle_props.task_id + '/xxx/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(result => {
                    if (result.body.status == 200) {
                        this.appendixes[this.appendixes.length - 1]["id"] = result.body.id;
                    } else if (result.body.status == 400) {
                        ;
                    }
                })
            },
            remove_appendix: function (index) {
                var appendix_id = this.appendixes[index].id
                this.appendixes.splice(index, 1);
                if (this.appendixes.length == 0) {
                    this.is_empty = true;
                }

                this.$http.get('/file/delete_appendix/' + this.globle_props.task_id + '/' + appendix_id + '/').then(result => {
                    if (result.body.status == 200) {
                        ;
                    } else if (result.body.status == 400) {
                        ;
                    }
                })
            },
            get_appendixes: function () {
                this.$http.get('/file/appendix_list/' + this.globle_props.task_id + '/').then(res => {
                    this.appendixes = res.body;
                    if (this.appendixes.length > 0) {
                        this.is_empty = false;
                    }
                    else {
                        this.is_empty = true;
                    }
                })
            },
        }
    }
</script>
<template>
    <div>
        <div id="bar">
            <nav class="navbar navbar-expand-sm navbar-light bg-light" style="height: 4rem">
                <div class="container">
                    <a class="navbar-brand col-3" href="/"><img class="rounded" src="/static/pic/logo2.png"></a>
                    <div class="collapse navbar-collapse container" id="navbarNav">
                        <ul class="navbar-nav col-8 container-fluid row">
                            <li class="nav-item col-4">
                                <a href="/space/" class="nav-link ">个人中心</a>
                            </li>
                            <li class="nav-item col-4">
                                <a href="/task_list/" class="nav-link ">任务列表</a>
                            </li>
                            <li class="nav-item col-4">
                                <a href="/noti/" class="nav-link ">消息中心</a>
                            </li>
                        </ul>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav-1">
                            <ul class="navbar-nav col-auto">
                                <li class="nav-item ">
                                    <a style="cursor: pointer;" @click='show_side_bar()'>
                                        <img src="/static/pic/menu.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="modal fade" id="sidebar">
                <div class="modal-dialog" style="margin: 0px; position: absolute; right: 0rem; height: 100%; width: 20rem;">
                    <div class="modal-content"
                        style="border-radius: 0px; border: 0px; height: 100%; background-color: rgba(255, 255, 255, 0.7)">
                        <div class="modal-body" style="padding: 0px">
                            <div v-if="!is_login">
                                <div style="position: absolute; top: 30%; left: 50%; transform: translateX(-50%)">
                                    <img src="/static/pic/user.png"
                                        style="position: relative; left: 50%; transform: translateX(-50%)">
                                    <div class="lead" style="color: #333333; margin-top: .5rem">您还未<a
                                            href="/account/login">登录</a></div>
                                </div>
                            </div>
                            <div v-if="is_login">
                                <div class="clearfix" style="width: 80%; height: 7.5rem; margin-left: 10%; margin-top: 5%">
                                    <div
                                        style="float: left; transform: translateY(-50%); text-align: center; top: 50%; position: relative;">
                                        <div style="color: #333333; font-size: 26px">[[ name ]]</div>
                                        <a style="color: #F44336; font-size: 18px" href="/account/logout/">退出登录</a>
                                    </div>
                                    <img class="float-right rounded-circle" :src="is_login ? '/file/avatar/' : false"
                                        style="width: 30%; top: 50%; transform: translateY(-50%); position: relative;">
                                </div>
                                <div style="width: 100%; margin-top: 5%">
                                    <div class="toast fade" data-autohide="false" role="alert" aria-live="assertive"
                                        aria-atomic="true" style="box-shadow: 0px 0px 0px; border: 0px; border-radius: 0px">
                                        <div class="toast-header" style="border-bottom: 0px;">
                                            <strong class="mr-auto">已被设置为组长</strong>
                                            <small class="text-muted">11 mins ago</small>
                                            <button type="button" class="ml-2 close" data-dismiss="toast"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span> </button>
                                        </div>
                                        <div class="toast-body">
                                            您好! 您已被设置为任务管理系统项目组组长。
                                        </div>
                                    </div>
                                    <div class="toast fade" data-autohide="false" role="alert" aria-live="assertive"
                                        aria-atomic="true" style="box-shadow: 0px 0px 0px; border: 0px; border-radius: 0px">
                                        <div class="toast-header" style="border-bottom: 0px;">
                                            <strong class="mr-auto">已被设置为组长</strong>
                                            <small class="text-muted">11 mins ago</small>
                                            <button type="button" class="ml-2 close" data-dismiss="toast"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span> </button>
                                        </div>
                                        <div class="toast-body">
                                            您好! 您已被设置为任务管理系统项目组组长。
                                        </div>
                                    </div>
                                    <div class="toast fade" data-autohide="false" role="alert" aria-live="assertive"
                                        aria-atomic="true" style="box-shadow: 0px 0px 0px; border: 0px; border-radius: 0px">
                                        <div class="toast-header" style="border-bottom: 0px;">
                                            <strong class="mr-auto">已被设置为组长</strong>
                                            <small class="text-muted">11 mins ago</small>
                                            <button type="button" class="ml-2 close" data-dismiss="toast"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span> </button>
                                        </div>
                                        <div class="toast-body">
                                            您好! 您已被设置为任务管理系统项目组组长。
                                        </div>
                                    </div>
                                </div>
                                <div style="position: fixed; bottom: 2rem; width: 100%; text-align: center;">
                                    <a href="" style="font-size: 12px; float: right; text-decoration: none; margin-right: 1rem"
                                        @click.prevent="mark_all_read()">标记全部为已读</a>
                                    <a href="/noti/"
                                        style="color: #666666; font-size: 18px; display: block; clear: both; text-decoration: none">进入消息中心</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <component :is="comName"></component>
    </div>
</template>

<script>
export default {
    data() {
        return {
            is_login: false,
            name: "",
            comName: "",
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
                    this.name = result.body.name;
                }
            })
        },
        show_side_bar: function () {
            $("#sidebar").modal("toggle");
            $(".toast").toast('show');
        },
        mark_all_read: function () {
            var noti = $(".toast");
            var noti_num = noti.length - 1;
            var time = 0;
            for (; noti_num >= 0; noti_num--, time++) {
                this.doSetTimeout(noti.eq(noti_num * 1), time);
            }
            setTimeout(() => { $("#sidebar").modal("toggle"); }, time * 150);
        },
        doSetTimeout: function(target, time){
            setTimeout(() => { target.toast("hide") }, time * 150);
        }
    }
}
</script>

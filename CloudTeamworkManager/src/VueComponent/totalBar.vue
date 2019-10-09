<template>
    <div>
        <div id="bar">
            <nav class="navbar navbar-expand-sm navbar-light bg-light" style="height: 4rem; z-index: 1">
                <div class="container">
                    <a class="navbar-brand col-3" href="/" v-on:click.prevent="mySwitch(['home', null])"><img class="rounded" src="/static/pic/logo2.png"></a>
                    <div class="collapse navbar-collapse container" id="navbarNav">
                        <ul class="navbar-nav col-8 container-fluid row">
                            <li class="nav-item col-4">
                                <a href="/space/" class="nav-link" v-on:click.prevent="mySwitch(['space', null])">个人中心</a>
                            </li>
                            <li class="nav-item col-4">
                                <a href="/task_list/" class="nav-link" v-on:click.prevent="mySwitch(['taskList', null])">任务列表</a>
                            </li>
                            <li class="nav-item col-4">
                                <a href="/noti/" class="nav-link" v-on:click.prevent="mySwitch(['noti', null])">消息中心</a>
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
                                            href="/account/login" v-on:click.prevent="hideBarAndSwitch(['signIn', null])">登录</a></div>
                                </div>
                            </div>
                            <div v-if="is_login">
                                <div class="clearfix" style="width: 80%; height: 7.5rem; margin-left: 10%; margin-top: 5%">
                                    <div
                                        style="float: left; transform: translateY(-50%); text-align: center; top: 50%; position: relative;">
                                        <div style="color: #333333; font-size: 26px">{{  name  }}</div>
                                        <a style="color: #F44336; font-size: 18px" href="/account/logout/" @click.prevent="logout">退出登录</a>
                                    </div>
                                    <img class="float-right rounded-circle" :src="is_login ? '/file/avatar/' : false"
                                        style="width: 30%; top: 50%; transform: translateY(-50%); position: relative;">
                                </div>
                                <div style="width: 100%; margin-top: 5%">
                                    <div v-if="Number(notifications) == 0" style="padding-left: .75rem; font-weight: bold">暂无未读消息</div>
                                    <div class="toast fade md-trigger" data-modal="modal-4" data-autohide="false" role="console.log" aria-live="assertive" @click="show_detail(each.verb, each.description, each.timestamp, each.id, index)"
                                        aria-atomic="true" style="box-shadow: 0px 0px 0px; border: 0px; border-radius: 0px" v-for="(each, index) in notifications" :key="index">
                                        <div class="toast-header" style="border-bottom: 0px;">
                                            <strong class="mr-auto">{{  each.verb  }}</strong>
                                            <small class="text-muted">{{  each.timestamp  }}</small>
                                            <button type="button" class="ml-2 close" data-dismiss="toast"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span> </button>
                                        </div>
                                        <div class="toast-body">{{  each.description  }}</div>
                                    </div>
                                </div>
                                <div style="position: fixed; bottom: 1rem; width: 100%; text-align: center;">
                                    <a href="" style="font-size: 12px; float: right; text-decoration: none; margin-right: 1rem"
                                        @click.prevent="mark_all_read()" v-if="Number(notifications) != 0">标记全部为已读</a>
                                    <a href="/noti/"
                                        style="color: #666666; font-size: 18px; display: block; clear: both; text-decoration: none" v-on:click.prevent="hideBarAndSwitch(['noti', null])">进入消息中心</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="md-modal md-effect-8" id="modal-4">
                    <div class="md-content">
                        <div>
                            <div class="container-fluid">
                                <div class="row justify-content-between">
                                    <div class="col-4" style="margin-top: 10px; font-size: 24px">
                                        消息详情
                                    </div>
                                    <div class="col-2" style="margin-top: 10px;">
                                        <button class="md-close btn-sm btn-primary"
                                            style="background-color: transparent; border: none; height: 100%">
                                            <img src="/static/pic/close.png">
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="lead" style="letter-spacing: 2px">{{detail_title}}</div>
                                        <div class="text-left" style="letter-spacing: 1px">
                                            {{detail_body}}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <small>{{detail_date}}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md-overlay"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .navbar {
        width: 100%;
    }

    .toast{
        padding: 0px;
    }
</style>

<script>
    import classie from '../../static/js/animation/classie.js'

    export default {
        data() {
            return {
                is_login: false,
                name: "",
                comName: "",
                notifications: [],
                detail_title: "",
                detail_body: "",
                detail_date: "",
            }
        },
        created() {
            this.login_check();
            this.receive_noti();
        },
        updated() {
            this.modalEffects();
        },
        methods: {
            modalEffects: function() {

                var overlay = document.querySelector( '.md-overlay' );
                
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
            login_check: function () {
                this.$http.get('/account/login_check/').then(result => {
                    if (result.body.status == 200) {
                        this.is_login = result.body.is_login;
                        this.name = result.body.name;
                    }
                })
            },
            logout: function() {
                this.$http.get('/account/logout/');
                this.hideBarAndSwitch("signIn");
            },
            hideBarAndSwitch: function(target) {
                $('#sidebar').modal('hide'); 
                this.mySwitch(target);
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

                this.$http.get('/noti/mark_all_as_read/');
            },
            doSetTimeout: function(target, time){
                setTimeout(() => { target.toast("hide") }, time * 150);
            },
            mySwitch: function(target) {
                if (target[0] != 'signUp' && !this.is_login){
                    this.$emit('switch', ['signIn', null]);
                    return;
                }
                
                this.$emit('switch', target);
            },
            show_detail: function (title, body, date, id, index) {
                this.detail_title = title;
                this.detail_body = body;
                this.detail_date = date;
                this.$http.get('/noti/mark_target_as_read/' + id)

                this.notifications.splice(index, 1);
            },
            receive_noti: function() {
                this.$http.get('/noti/get_unread/').then(result => {
                    if (result.status == 200){
                        this.notifications = result.body;
                    }
                })

                var that = this;
                if ("WebSocket" in window) {
                    console.log("您的浏览器支持 WebSocket!");

                    var ws = new WebSocket("ws://" + window.location.host + "/noti/receive_noti/");

                    ws.onopen = function () {
                        console.log("与服务器连接成功!");
                    };

                    ws.onmessage = function (evt) {
                        var received_msg = JSON.parse(evt.data);
                        
                        if (received_msg.status == 200){
                            that.notifications.push(received_msg);
                        }
                    };

                    ws.onclose = function () {
                        console.log("连接已断开");
                    };

                    // else if (received_msg.status == 201){
                    //     ws.send(SON.stringify({"tip": "客户端在线", "status": 201}));
                    // }

                    window.s = ws;
                }

                else {
                    // 浏览器不支持 WebSocket
                    console.log("您的浏览器不支持 WebSocket!");
                }
            }
        }
    }
</script>

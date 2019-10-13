<template>
    <div class="container" id="mainFunc">
        <div class="row no-gutter">
            <div class="col-10 offset-1">
                <div class="card" style="border-top: 0.25rem solid #448AFF">
                    <div class="clearfix" style="width: 100%">
                        <div style="float: right; height: 6rem; width: 22rem">
                            <div class="text-uppercase lead font-weight-bold"
                                style="font-size: 60px; color: rgba(41, 98, 255, 0.05); z-index: -1">
                                messages
                            </div>
                            <div
                                style="letter-spacing: 4px; font-size: 30px; color: #999999; position: relative; top: -65%; left: 8%; z-index: 1;">
                                消息列表
                            </div>
                        </div>
                    </div>

                    <div class="row no-gutters">
                        <div class="offset-1">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all"
                                        role="tab" aria-controls="pills-all" aria-selected="true"
                                        style="border-radius: 0px;">全部消息</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " id="pills-system-tab" data-toggle="pill" href="#pills-system"
                                        role="tab" aria-controls="pills-system" aria-selected="false"
                                        style="border-radius: 0px;">系统消息</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="pills-group-tab" data-toggle="pill" href="#pills-group"
                                        role="tab" aria-controls="pills-group" aria-selected="false"
                                        style="border-radius: 0px;">组内消息</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="tab-content col-12" id="pills-tabContent" style="margin-top: 1rem; margin-bottom: 1rem;">
                            <div class="tab-pane fade show active" id="pills-all" role="tabpanel"
                                aria-labelledby="pills-all-tab">
                                <div v-if="!globle_props.unread_notifications.length && !globle_props.read_notifications.length" class="offset-1 col-10">暂无消息</div>
                                <div class="unread_notific">
                                    <div v-for="(each, index) in globle_props.unread_notifications" class="row no-gutters md-trigger col-10 offset-1"
                                        style="height: 5rem; cursor: pointer; margin-bottom: 1.5rem"
                                        data-modal="modal-8" :key="index"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id, index)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="JSON.parse(each.data).type == 1? sys_logo : team_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}
                                                    <span class="badge badge-pill badge-primary">New</span>
                                                </span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr v-if="globle_props.read_notifications.length && globle_props.unread_notifications.length" style="background-color: #007bff">
                                <div class="read_notific">
                                    <div v-for="each in globle_props.read_notifications" class="row no-gutters md-trigger col-10 offset-1"
                                        style="height: 5rem; cursor: pointer;margin-bottom: 1.5rem;"
                                        data-modal="modal-8" :key="each"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id, -1)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="JSON.parse(each.data).type == 1? sys_logo : team_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}</span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-system" role="tabpanel"
                                aria-labelledby="pills-profile-tab">
                                <div class="unread_notific">
                                    <div v-for="(each, index) in globle_props.unread_notifications" v-if="JSON.parse(each.data).type == 1"
                                        class="row no-gutters md-trigger col-10 offset-1" style="height: 5rem; cursor: pointer;"
                                        data-modal="modal-8" :key="index"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id, index)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="sys_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}
                                                    <span class="badge badge-pill badge-primary">New</span>
                                                </span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr v-if="sys_read.length && sys_unread.length" style="background-color: #007bff">
                                <div class="read_notific">
                                    <div v-for="each in globle_props.read_notifications" v-if="JSON.parse(each.data).type == 1"
                                        class="row no-gutters md-trigger col-10 offset-1" :key="each"
                                        style="height: 5rem; cursor: pointer;margin-bottom: 1.5rem" data-modal="modal-8"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id, -1)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="sys_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}
                                                </span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-group" role="tabpanel"
                                aria-labelledby="pills-contact-tab">
                                <div class="unread_notific">
                                    <div v-for="(each, index) in globle_props.unread_notifications" v-if="JSON.parse(each.data).type == 0"
                                        class="row no-gutters md-trigger col-10 offset-1" :key="index"
                                        style="height: 5rem; cursor: pointer;margin-bottom: 1.5rem" data-modal="modal-8"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id, index)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="team_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}
                                                    <span class="badge badge-pill badge-primary">New</span>
                                                </span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr v-if="team_read.length && team_unread.length" style="background-color: #007bff" />
                                <div class="read_notific">
                                    <div v-for="each in globle_props.read_notifications" v-if="JSON.parse(each.data).type == 0"
                                        class="row no-gutters md-trigger col-10 offset-1"
                                        style="height: 5rem; cursor: pointer;margin-bottom: 1.5rem;"
                                        data-modal="modal-8" :key="each"
                                        @click="show_detail(each.verb, each.description, each.timestamp, each.id)">
                                        <div class="col-2" style="text-align: center">
                                            <img :src="team_logo"
                                                style="border-radius: 100%; height: 4rem; width: auto; position: relative; top: 50%; transform: translateY(-50%)">
                                        </div>
                                        <div class="col-10">
                                            <span style="position: relative; top: 1.1rem">
                                                <span style="padding: 0;letter-spacing: 3px">{{each.verb}}</span>
                                                <br>
                                                <small>{{each.description}}</small>
                                            </span>
                                            <div style="float: right; margin-right: 8.33%">
                                                <span>{{timestamp_to_date(each.timestamp)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row no-gutters"
                    style="background-color: #E4EBFF; height: 4rem; cursor: pointer; display: none">
                        <div style="text-decoration: none; color: #999999; margin-left: auto; margin-right: auto">
                            <div style="position: relative; transform: translateY(-50%); top: 50%">
                                <div>点击加载更多</div>
                                <div style="text-align: center; transform: rotate(180deg)">^</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="md-modal md-effect-8" id="modal-8">
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
                                                <small>{{timestamp_to_date(detail_date)}}</small>
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
        </div>
    </div>
</template>

<style scoped>
    li {
        line-height: 3rem;
        vertical-align: middle;
    }

    .card {
        margin: 1.2rem 0rem;
        border-radius: 0px;
        border-bottom: 0px;
        border-right: 0px;
        border-left: 0px;
    }

    .nav-link {
        padding: 0rem 1rem;
        border: 0rem;
    }

    .nav-tabs {
        border: 0rem;
    }

    .nav-link.active {
        border: 0px;
        border-bottom: 1px solid #2962FF;
    }
</style>

<script>
    import classie from '../../static/js/animation/classie.js'

    export default {
        data() {
            return {
                detail_title: "",
                detail_body: "",
                detail_date: "",

                team_unread: 0,
                team_read: 0,
                sys_unread: 0,
                sys_read: 0,
                
                sys_logo: "/static/pic/系统消息logo.png",
                team_logo: "/static/pic/组内消息logo.png"
            }
        },
        props: ['globle_props'],
        computed: {
            timestamp_to_date() {
                return function(timestamp) {
                    return new Date(parseInt(timestamp * 1000)).toLocaleString().replace(/:\d{1,2}$/, ' ');
                }
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
            show_detail: function (title, body, date, id, index = -1) {
                this.detail_title = title;
                this.detail_body = body;
                this.detail_date = date;
                this.$http.get('/noti/mark_target_as_read/' + id)
                
                if (index != -1) {
                    this.globle_props.read_notifications.unshift(this.globle_props.unread_notifications.splice(index, 1)[0]);
                }
            },
        }
    }

</script>
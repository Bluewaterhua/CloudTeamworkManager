(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{69:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container",staticStyle:{height:"100%",position:"relative",top:"-4rem"},attrs:{id:"mainFunc"}},[s("div",{staticClass:"row",staticStyle:{height:"100%"}},[s("div",{staticClass:"row align-self-center col-10 offset-1",staticStyle:{padding:"15px","background-color":"rgba(240, 248, 255, 0.7)"}},[s("div",{staticClass:"col-6 px-0 offset-1",staticStyle:{color:"#212529"}},[s("div",{staticStyle:{position:"relative",top:"50%",transform:"translateY(-50%)"}},[s("h1",{staticClass:"display-4 font-italic"},[t._v("任务管理系统")]),t._v(" "),s("p",{staticClass:"lead my-3"},[t._v("由云顶书院任务管理系统项目组倾力打造。在任务管理系统的帮助下，您可以将更多精\n                        力用于项目开发。监控项目进度和成员时间规划等琐事，交给我们！")]),t._v(" "),s("div",[t.is_login?t._e():s("a",{staticClass:"btn btn-outline-primary mb-3 mb-md-0 mr-md-3",staticStyle:{width:"30%","border-radius":"0px"},attrs:{href:"/account/login"},on:{click:function(i){return i.preventDefault(),t.mySwitch("signIn")}}},[t._v("登录")]),t._v(" "),t.is_login?t._e():s("a",{staticClass:"btn btn-outline-primary mb-3 mb-md-0 mr-md-3",staticStyle:{width:"30%","border-radius":"0px"},attrs:{href:"/account/register"},on:{click:function(i){return i.preventDefault(),t.mySwitch("signUp")}}},[t._v("注册")])])])]),t._v(" "),t._m(0)])])])};e._withStripped=!0;var a={data:()=>({is_login:!1}),created(){this.login_check()},methods:{login_check:function(){this.$http.get("/account/login_check/").then(t=>{200==t.body.status&&(this.is_login=t.body.is_login)})},mySwitch:function(t){this.$emit("switch",t)}}},n=s(5),c=Object(n.a)(a,e,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"col-4 px-0"},[i("img",{staticStyle:{width:"100%"},attrs:{src:"/static/pic/betta_fish.png",alt:""}})])}],!1,null,null,null);c.options.__file="src/VueComponent/home.vue";i.default=c.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{18:function(t,i,a){var e,s;
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */!function(n){"use strict";function o(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}var c,l,r;function d(t,i){(c(t,i)?r:l)(t,i)}"classList"in document.documentElement?(c=function(t,i){return t.classList.contains(i)},l=function(t,i){t.classList.add(i)},r=function(t,i){t.classList.remove(i)}):(c=function(t,i){return o(i).test(t.className)},l=function(t,i){c(t,i)||(t.className=t.className+" "+i)},r=function(t,i){t.className=t.className.replace(o(i)," ")}),void 0===(s="function"==typeof(e={hasClass:c,addClass:l,removeClass:r,toggleClass:d,has:c,add:l,remove:r,toggle:d})?e.call(i,a,i,t):e)||(t.exports=s)}(window)},20:function(t,i,a){var e=a(35);"string"==typeof e&&(e=[[t.i,e,""]]);var s={insert:"head",singleton:!1};a(3)(e,s);e.locals&&(t.exports=e.locals)},34:function(t,i,a){"use strict";var e=a(20);a.n(e).a},35:function(t,i,a){(t.exports=a(2)(!1)).push([t.i,"\n.navbar[data-v-1d1d7504] {\n    width: 100%;\n}\n.toast[data-v-1d1d7504]{\n    padding: 0px;\n}\n",""])},67:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("div",{attrs:{id:"bar"}},[a("nav",{staticClass:"navbar navbar-expand-sm navbar-light bg-light",staticStyle:{height:"4rem","z-index":"1"}},[a("div",{staticClass:"container"},[a("a",{staticClass:"navbar-brand col-3",attrs:{href:"/"},on:{click:function(i){return i.preventDefault(),t.mySwitch(["home",null])}}},[a("img",{staticClass:"rounded",attrs:{src:"/static/pic/logo2.png"}})]),t._v(" "),a("div",{staticClass:"collapse navbar-collapse container",attrs:{id:"navbarNav"}},[a("ul",{staticClass:"navbar-nav col-8 container-fluid row"},[a("li",{staticClass:"nav-item col-4"},[a("a",{staticClass:"nav-link",attrs:{href:"/space/"},on:{click:function(i){return i.preventDefault(),t.mySwitch(["space",null])}}},[t._v("个人中心")])]),t._v(" "),a("li",{staticClass:"nav-item col-4"},[a("a",{staticClass:"nav-link",attrs:{href:"/task_list/"},on:{click:function(i){return i.preventDefault(),t.mySwitch(["taskList",null])}}},[t._v("任务列表")])]),t._v(" "),a("li",{staticClass:"nav-item col-4"},[a("a",{staticClass:"nav-link",attrs:{href:"/noti/"},on:{click:function(i){return i.preventDefault(),t.mySwitch(["noti",null])}}},[t._v("消息中心")])])]),t._v(" "),a("div",{staticClass:"collapse navbar-collapse justify-content-end",attrs:{id:"navbarNav-1"}},[a("ul",{staticClass:"navbar-nav col-auto"},[a("li",{staticClass:"nav-item "},[a("a",{staticStyle:{cursor:"pointer"},on:{click:function(i){return t.show_side_bar()}}},[a("img",{attrs:{src:"/static/pic/menu.png"}})])])])])])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"sidebar"}},[a("div",{staticClass:"modal-dialog",staticStyle:{margin:"0px",position:"absolute",right:"0rem",height:"100%",width:"20rem"}},[a("div",{staticClass:"modal-content",staticStyle:{"border-radius":"0px",border:"0px",height:"100%","background-color":"rgba(255, 255, 255, 0.7)"}},[a("div",{staticClass:"modal-body",staticStyle:{padding:"0px"}},[t.is_login?t._e():a("div",[a("div",{staticStyle:{position:"absolute",top:"30%",left:"50%",transform:"translateX(-50%)"}},[a("img",{staticStyle:{position:"relative",left:"50%",transform:"translateX(-50%)"},attrs:{src:"/static/pic/user.png"}}),t._v(" "),a("div",{staticClass:"lead",staticStyle:{color:"#333333","margin-top":".5rem"}},[t._v("您还未"),a("a",{attrs:{href:"/account/login"},on:{click:function(i){return i.preventDefault(),t.hideBarAndSwitch(["signIn",null])}}},[t._v("登录")])])])]),t._v(" "),t.is_login?a("div",[a("div",{staticClass:"clearfix",staticStyle:{width:"80%",height:"7.5rem","margin-left":"10%","margin-top":"5%"}},[a("div",{staticStyle:{float:"left",transform:"translateY(-50%)","text-align":"center",top:"50%",position:"relative"}},[a("div",{staticStyle:{color:"#333333","font-size":"26px"}},[t._v(t._s(t.name))]),t._v(" "),a("a",{staticStyle:{color:"#F44336","font-size":"18px"},attrs:{href:"/account/logout/"},on:{click:function(i){return i.preventDefault(),t.logout(i)}}},[t._v("退出登录")])]),t._v(" "),a("img",{staticClass:"float-right rounded-circle",staticStyle:{width:"30%",top:"50%",transform:"translateY(-50%)",position:"relative"},attrs:{src:!!t.is_login&&"/file/avatar/"}})]),t._v(" "),a("div",{staticStyle:{width:"100%","margin-top":"5%"}},[0==Number(t.notifications)?a("div",{staticStyle:{"padding-left":".75rem","font-weight":"bold"}},[t._v("暂无未读消息")]):t._e(),t._v(" "),t._l(t.notifications,(function(i,e){return a("div",{key:e,staticClass:"toast fade md-trigger",staticStyle:{"box-shadow":"0px 0px 0px",border:"0px","border-radius":"0px"},attrs:{"data-modal":"modal-4","data-autohide":"false",role:"console.log","aria-live":"assertive","aria-atomic":"true"},on:{click:function(a){return t.show_detail(i.verb,i.description,i.timestamp,i.id,e)}}},[a("div",{staticClass:"toast-header",staticStyle:{"border-bottom":"0px"}},[a("strong",{staticClass:"mr-auto"},[t._v(t._s(i.verb))]),t._v(" "),a("small",{staticClass:"text-muted"},[t._v(t._s(i.timestamp))]),t._v(" "),t._m(0,!0)]),t._v(" "),a("div",{staticClass:"toast-body"},[t._v(t._s(i.description))])])}))],2),t._v(" "),a("div",{staticStyle:{position:"fixed",bottom:"1rem",width:"100%","text-align":"center"}},[0!=Number(t.notifications)?a("a",{staticStyle:{"font-size":"12px",float:"right","text-decoration":"none","margin-right":"1rem"},attrs:{href:""},on:{click:function(i){return i.preventDefault(),t.mark_all_read()}}},[t._v("标记全部为已读")]):t._e(),t._v(" "),a("a",{staticStyle:{color:"#666666","font-size":"18px",display:"block",clear:"both","text-decoration":"none"},attrs:{href:"/noti/"},on:{click:function(i){return i.preventDefault(),t.hideBarAndSwitch(["noti",null])}}},[t._v("进入消息中心")])])]):t._e()])])])]),t._v(" "),a("div",[a("div",{staticClass:"md-modal md-effect-8",attrs:{id:"modal-4"}},[a("div",{staticClass:"md-content"},[a("div",[a("div",{staticClass:"container-fluid"},[t._m(1),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"lead",staticStyle:{"letter-spacing":"2px"}},[t._v(t._s(t.detail_title))]),t._v(" "),a("div",{staticClass:"text-left",staticStyle:{"letter-spacing":"1px"}},[t._v("\n                                        "+t._s(t.detail_body)+"\n                                    ")])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("small",[t._v(t._s(t.detail_date))])])])])])])]),t._v(" "),a("div",{staticClass:"md-overlay"})])])])};e._withStripped=!0;var s=a(18),n=a.n(s),o={data:()=>({is_login:!1,name:"",comName:"",notifications:[],detail_title:"",detail_body:"",detail_date:""}),created(){this.login_check(),this.receive_noti()},updated(){this.modalEffects()},methods:{modalEffects:function(){var t=document.querySelector(".md-overlay");[].slice.call(document.querySelectorAll(".md-trigger")).forEach((function(i,a){var e=document.querySelector("#"+i.getAttribute("data-modal")),s=e.querySelector(".md-close");function o(){var t;t=n.a.has(i,"md-setperspective"),n.a.remove(e,"md-show"),t&&n.a.remove(document.documentElement,"md-perspective")}i.addEventListener("click",(function(a){n.a.add(e,"md-show"),t.removeEventListener("click",o),t.addEventListener("click",o),n.a.has(i,"md-setperspective")&&setTimeout((function(){n.a.add(document.documentElement,"md-perspective")}),25)})),s.addEventListener("click",(function(t){t.stopPropagation(),o()}))}))},login_check:function(){this.$http.get("/account/login_check/").then(t=>{200==t.body.status&&(this.is_login=t.body.is_login,this.name=t.body.name)})},logout:function(){this.$http.get("/account/logout/"),this.hideBarAndSwitch("signIn")},hideBarAndSwitch:function(t){$("#sidebar").modal("hide"),this.mySwitch(t)},show_side_bar:function(){$("#sidebar").modal("toggle"),$(".toast").toast("show")},mark_all_read:function(){for(var t=$(".toast"),i=t.length-1,a=0;i>=0;i--,a++)this.doSetTimeout(t.eq(1*i),a);setTimeout(()=>{$("#sidebar").modal("toggle")},150*a),this.$http.get("/noti/mark_all_as_read/")},doSetTimeout:function(t,i){setTimeout(()=>{t.toast("hide")},150*i)},mySwitch:function(t){"signUp"==t[0]||this.is_login?this.$emit("switch",t):this.$emit("switch",["signIn",null])},show_detail:function(t,i,a,e,s){this.detail_title=t,this.detail_body=i,this.detail_date=a,this.$http.get("/noti/mark_target_as_read/"+e),this.notifications.splice(s,1)},receive_noti:function(){this.$http.get("/noti/get_unread/").then(t=>{200==t.status&&(this.notifications=t.body)});var t=this;if("WebSocket"in window){console.log("您的浏览器支持 WebSocket!");var i=new WebSocket("ws://"+window.location.host+"/noti/receive_noti/");i.onopen=function(){console.log("与服务器连接成功!")},i.onmessage=function(i){var a=JSON.parse(i.data);200==a.status&&t.notifications.push(a)},i.onclose=function(){console.log("连接已断开")},window.s=i}else console.log("您的浏览器不支持 WebSocket!")}}},c=(a(34),a(5)),l=Object(c.a)(o,e,[function(){var t=this.$createElement,i=this._self._c||t;return i("button",{staticClass:"ml-2 close",attrs:{type:"button","data-dismiss":"toast","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"row justify-content-between"},[i("div",{staticClass:"col-4",staticStyle:{"margin-top":"10px","font-size":"24px"}},[this._v("\n                                    消息详情\n                                ")]),this._v(" "),i("div",{staticClass:"col-2",staticStyle:{"margin-top":"10px"}},[i("button",{staticClass:"md-close btn-sm btn-primary",staticStyle:{"background-color":"transparent",border:"none",height:"100%"}},[i("img",{attrs:{src:"/static/pic/close.png"}})])])])}],!1,null,"1d1d7504",null);l.options.__file="src/VueComponent/totalBar.vue";i.default=l.exports}}]);
import Vue from 'vue'
import './total.css'
import '../static/css/animation/component.css'
import superComponent from "./VueComponent/superComponent.vue"
import VueResource from 'vue-resource'
import $ from 'jquery'

Vue.use(VueResource);
Vue.http.headers.common['X-CSRFToken'] = $("input[name='csrfmiddlewaretoken']").val()

var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#superComponent',
    render: function (createElements){
        return createElements(superComponent)
    }
})

<template>
    <!-- 底 -->
    <div style="height: 100%;">
        <!-- 主体 -->
        <mainFuncTotal></mainFuncTotal>
    </div>
</template>

<style>
    html, body{
        font-family: 'SourceHanSansCN-Normal';
        width: 100%;
        height: 100%;
    }

    @font-face {
        font-family: 'SourceHanSansCN-Normal';
        src: url('/static/font/SourceHanSansCN-Normal.otf');
    }

    .modal.fade .modal-dialog {
        transform: translate3d(100%, 0, 0);
    }

    .modal.show .modal-dialog {
        transform: translate3d(0, 0, 0);
    }

    .toast {
        padding: 0px 10%;
    }
</style>

<script>
    import Vue from 'vue'

    Vue.component('mainFuncTotal',function(resolve){
        require(['./mainFuncTotal.vue'],resolve)
    })

    export default {

    }
</script>

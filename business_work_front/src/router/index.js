import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');


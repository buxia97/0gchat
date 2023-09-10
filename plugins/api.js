import Vue from 'vue'
import data from '@/utils/api.js';
import Qs from "qs"

Vue.prototype.qs = Qs;
Vue.prototype.$api = data;


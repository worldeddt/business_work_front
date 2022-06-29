import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const storage = {
    async fetch() {
        await axios.post('http:://localhost:8090/project/all')
              .then(function (response) {
                console.log("==============================;;;");
                console.log(response);
                console.log("==============================;;;");
                return response;
              })
              .catch(function (error) {
                console.log(error);
              });
        
		// if (localStorage.length > 0) {
        //     for (let i = 0; i < localStorage.length; i++) {
        //         if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
        //             arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        //         }
        //     }
        // }
		// return arr;
	}
 }


export const store = new Vuex.Store({
    state: {
        projects: storage.fetch(),
        sections: '',
    },
    mutations: {

    },
    methods : {

    }
});
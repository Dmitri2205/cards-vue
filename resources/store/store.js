import Vue from 'vue';
import Vuex from 'vuex';
import storeState from './storeState';
import storeGetters from './storeGetters';
import storeActions from './storeActions';
import storeMutations from './storeMutations';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: null,
        item: null,
        isLoading:true,
    },
    getters: {
        globalGetter(store, type) {
            let state = storeGetters(store, type);
            return state;
        },
    },
    actions: {
        globalAction(ctx,payload) {
            let actionType = payload.type;
            let data = payload.data;
            let state = this.state;
            const action = storeActions(actionType,data,state);
            action.then((result) => {
                    let params = {
                        data: result.payload,
                        type: result.type,
                    };
                    this.state.isLoading = false;
                    ctx.commit('globalMutation', params);
                })
                .catch((error) => {
                    console.log(error);
                    this.state.isLoading = false;
                });
        },
    },
    mutations: {
        globalMutation(state, data) {
            let mutation = storeMutations(state, data);
            let type = mutation.data.type;
            let payload = mutation.data.data
            state[type] = payload;
        },
    }
})
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


interface State {
    token: string;
    user: object;
}

const getDefaultState = (): State => {
    return {
        token: '',
        user: {},
    };
};

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    strict: true,
    state: getDefaultState(),
    getters: {
        getUser: (state: State) => {
            return state.user;
        },
        isLoggedIn: (state: State) => {
            return state.token !== '';
        },
    },
    actions: {
        setToken: ({ commit }, { token }: { token: string }) => {
            commit('SET_TOKEN', token);
            // set auth header
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        },
        setUser: ({ commit }, { user }: { user: object }) => {
            commit('SET_USER', user);
        },
    },
    mutations: {
        SET_TOKEN: (state: State, token: string) => {
            state.token = token;
        },
        SET_USER: (state: State, user: object) => {
            state.user = user;
        },
        RESET: (state: State) => {
            Object.assign(state, getDefaultState());
        },
    },
});

export default store;

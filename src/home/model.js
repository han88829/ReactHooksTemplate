import { action } from 'easy-peasy';

const store = {
    data: [],
    value: '',
    onChangeValue: action((state, payload) => {
        return { ...state, ...payload }
    }),
    onChangeData: action((state, payload) => {

        /*  state 为Proxy  直接修改state中的字段值即可 
        *   获取data [...state.data]
        *   let target = {}
        *   let handlers = {} // do nothing
        *   let proxy = new Proxy(target, handlers)
        *
        *   proxy.a = 123
        *
        *   console.log(target.a) // 123
        */

        state.data.push(payload);
        state.value = '';
    })
}

export default store;
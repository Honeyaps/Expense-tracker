import {atom} from "recoil"

export const pageState = atom({
    key: 'pageState',
    default: "home",
})

export const datastate = atom({
    key: 'datastate',
    default: [],
})
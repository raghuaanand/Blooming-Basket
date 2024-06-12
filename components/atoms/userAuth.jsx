import { atom } from "recoil"

export const userAuth = atom({
    key:'userAuth',
    default:''
})

export const ToggleMode = atom({
    key:'ToggleMode',
    default:false
})

export const CartItem = atom({
    key:'CartItem',
    default:[]
})

export const UserID = atom({
    key:'UserID',
    default:''
})
export const UserProfile = atom({
    key:'UserProfile',
    default:''
})
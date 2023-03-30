import { makeAutoObservable, action } from "mobx"

export default class UserStore {
    constructor(){
        this._isAuth= false
        this._user= {}
        this._roleUser={}
        makeAutoObservable(this)
    }
    get roleUser(){
        return this._roleUser
    }
    setRoleUser(role) {
        this._roleUser = role
    }
setIsAuth(bool) {
    this._isAuth = bool
}

setUser(user) {
    this._user = user
}

get isAuth() {
    return this._isAuth
}
get user() {
    return this._user
}
}
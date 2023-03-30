import { makeAutoObservable } from "mobx"

export default class MastersStore {
    constructor(){
        this._isMasters= false
        this._masters= [

        ]
        this._selectedType= {}
        makeAutoObservable(this)
    }

    setIsMasters(bool) {
        this._isMasters = bool
    }
    setTypes(types) {
        this._types = types
    }
    setSelectedType(type){
        this._selectedType = type
    }

    setMasters(masters) {
        this._masters = masters
    }

    setDevices(haircuts) {
        this._haircuts = haircuts
    }
    get isMasters() {
        return this._isMasters
    }
    get types() {
        return this._types
    }
    get haircuts() {
        return this._haircuts
    }
    get masters() {
        return this._masters
    }
    get selectedType() {
        return this._selectedType
    }
}
import {makeAutoObservable} from 'mobx'
import {IUser} from "../Interfaces/IUser";

class UserStore {
    private _user: IUser
    private _isAuth: boolean
    private _error: string

    constructor() {
        this._user = {
            id: 0,
            username: "",
            password: "",
            phone: "",
            email: "",
        }
        this._isAuth = false
        this._error = ""
        makeAutoObservable(this)
    }

    setUser(payload: IUser) {
        this._user = payload
    }
    cleanUser() {
        this._user = {} as IUser
        this._isAuth = false
    }
    setIsAuth(state: boolean) {
        this._isAuth = state
    }
    setError(payload: string) {
        this._error = payload
    }

    get User() {
        return this._user
    }
    get IsAuth() {
        return this._isAuth
    }
    get Error() {
        return this._error
    }
}

export default new UserStore()
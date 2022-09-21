import {makeAutoObservable} from 'mobx'
import {IContact} from "../Interfaces/IContact";

class ContactsStore {
    private _contacts: IContact[]
    private _pageCount: number
    private _currentPage: number
    private _isFiltered: boolean

    constructor() {
        this._isFiltered = false
        this._currentPage = 1
        this._pageCount = 1
        this._contacts = []
        makeAutoObservable(this)
    }

    setCurrentPage(payload: number) {
        return this._currentPage = payload
    }
    setPageCount(count: number) {
        return this._pageCount = count
    }
    setContacts(payload: IContact[]) {
        return this._contacts = payload
    }
    addContact(payload: IContact) {
        return this._contacts = [...this._contacts, payload]
    }
    removeContact(id: number) {
        let newArr = this._contacts.filter((item) => {
            return item.id !== id
        })
        return this._contacts = newArr
    }
    setIsFiltered(payload: boolean) {
        return this._isFiltered = payload;
    }

    get IsFiltered() {
        return this._isFiltered
    }
    get PageCount() {
        return this._pageCount
    }
    get Contacts() {
        return this._contacts
    }
    get CurrentPage() {
        return this._currentPage
    }
}

export default new ContactsStore()
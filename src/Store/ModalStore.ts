import {IContact} from "../Interfaces/IContact";
import {makeAutoObservable} from "mobx";
import ContactsStore from "./ContactsStore";


class ModalStore {
    private _editingId: number
    private _isOpen: boolean
    private _editingContact: IContact
    private _error: string

    constructor() {
        this._error = ""
        this._editingId = -1
        this._editingContact = this.clearEditingObject()
        this._isOpen = false;
        makeAutoObservable(this)
    }

    clearEditingObject() {
        return this._editingContact = {
            id: 0,
            userId: 0,
            Name: "",
            Surname: "",
            Phone: "",
            Email: ""
        }
    }
    setEditingId(payload: number) {
        return this._editingId = payload;
    }
    setModalOpen() {
        return this._isOpen = true;
    }
    setModalClose() {
        return this._isOpen = false;
    }
    setEditingContact() {
        let foundContact = ContactsStore.Contacts.find(item => {
            return item.id === this._editingId
        })
        return this._editingContact = foundContact!;
    }
    handleChange(prop: keyof IContact, value: string) {
        return this._editingContact = {...this._editingContact, [prop]: value}
    }
    setError(payload: string) {
        return this._error = payload
    }

    get isOpen() {
        return this._isOpen
    }
    get editingObject() {
        return this._editingContact
    }
    get isEditing() {
        return this._editingId
    }
    get Error() {
        return this._error
    }
}

export default new ModalStore()
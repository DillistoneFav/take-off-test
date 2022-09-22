import {$host} from "./AxiosConfig";
import {IContact} from "../Interfaces/IContact";
import ContactsStore from "../Store/ContactsStore";
import UserStore from "../Store/UserStore";

export const setTotalPages = async(limit: number = 5) => {
    try {
        await $host.get(`/contacts?userId=${UserStore.User.id}`).then(response => {
            ContactsStore.setPageCount(Math.ceil(response.data.length / limit))
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const getContacts = async (page: number, limit: number = 5) => {
    try {
        await $host.get(`/contacts?userId=${UserStore.User.id}&_page=${page}&_limit=${limit}`).then(response => {
            ContactsStore.setContacts(response.data)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const findContactsByName = async (name: string) => {
    try {
        await $host.get(`/contacts?userId=${UserStore.User.id}&Name=${name}`).then(response => {
            ContactsStore.setContacts(response.data)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const createContact = async (body: IContact) => {
    try{
        await $host.post('/contacts', {
            userId: UserStore.User.id,
            Name: body.Name,
            Surname: body.Surname,
            Phone: body.Phone,
            Email: body.Email,
        }).then(response => {
            if (ContactsStore.CurrentPage === ContactsStore.PageCount && ContactsStore.Contacts.length < 5) {
                ContactsStore.addContact(response.data)
            } else {
                setTotalPages()
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const editContact = async (id: number, body: IContact) => {
    try{
        await $host.put(`/contacts/${body.id}`, {
            id: body.id,
            userId: body.userId,
            Name: body.Name,
            Surname: body.Surname,
            Phone: body.Phone,
            Email: body.Email,
        }).then(() => {
            getContacts(ContactsStore.CurrentPage)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const deleteContact = async (id: number) => {
    try {
        await $host.delete(`/contacts/${id}`).then(response => {
            if (ContactsStore.Contacts.length === 1 && ContactsStore.PageCount > 1) {
                ContactsStore.setCurrentPage(ContactsStore.CurrentPage-1)
                ContactsStore.setPageCount(ContactsStore.PageCount-1)
            } else if (ContactsStore.CurrentPage < ContactsStore.PageCount && ContactsStore.Contacts.length === 5) {
                getContacts(ContactsStore.CurrentPage)
                setTotalPages()
            } else {
                ContactsStore.removeContact(id)
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}
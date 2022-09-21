import ContactsStore from "../../Store/ContactsStore";

export const setValuesById = (id: number) => {
    let findedContact = ContactsStore.Contacts.find((item) => {
        return item.id === id
    })
    return findedContact;
}
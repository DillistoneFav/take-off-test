import React from 'react';
import ContactsStore from "../../../Store/ContactsStore";
import ContactItem from "./ContactItem";
import {observer} from "mobx-react";


const ContactsList = observer(() => {
    return (
        <div className={"contacts-container"}>
            {ContactsStore.Contacts.map(item => {
                return (
                    <ContactItem
                        id={item.id}
                        name={item.Name}
                        surname={item.Surname}
                        phone={item.Phone}
                        email={item.Email}
                        key={item.id}
                    />
                )
            })}
        </div>
    );
});

export default ContactsList;
import React, {useEffect, useState} from 'react';
import './ContactsPage.scss'
import {observer} from "mobx-react";
import ContactsList from "./components/ContactsList";
import {Pagination} from "@mui/material";
import SearchInput from "./components/SearchInput";
import ModalComponent from "./components/ModalComponent";
import ModalStore from "../../Store/ModalStore";
import ContactsStore from "../../Store/ContactsStore";
import {getContacts, setTotalPages} from "../../API/ContactsApi";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import {useTranslation} from "react-i18next";
import Loader from "../../Components/Loader/Loader";

const ContactsPage = observer(() => {
    const {t} = useTranslation()
    const [name, setName] = useState<string>("")

    const {Contacts, IsFiltered, PageCount, CurrentPage, IsLoading} = ContactsStore

    const handleOpen = () => {
        ModalStore.setEditingId(-1)
        ModalStore.setModalOpen()
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        ContactsStore.setCurrentPage(value);
    };
    const handleResetFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
        setName("")
        ContactsStore.setIsFiltered(false)
        getContacts(CurrentPage)
    }

    useEffect(() => {
        setTotalPages()
    }, [])

    useEffect(() => {
        getContacts(CurrentPage).then(() => {
            setTimeout(() => {
                ContactsStore.setIsLoading(false)
            }, 500)
        })
    }, [CurrentPage])

    return !IsLoading ? (
        <div className={"contactsPage"}>
            <div className={"container"}>
                <h1>{`${t("contactsPage.title")}`}</h1>
                <div style={!Contacts.length && !IsFiltered ? {justifyContent: "center"} : {} } className={"management-container"}>
                    {!Contacts.length && !IsFiltered ? <></> : <SearchInput name={name} setName={setName}/>}
                    {IsFiltered && <button onClick={handleResetFilters} className={"create-button"}>{`${t("contactsPage.resetFilters")}`}</button>}
                    <button onClick={handleOpen} className={"create-button"}>{`${t("contactsPage.createContact")}`}</button>
                </div>
                {Contacts.length
                    ? <ContactsList/>
                    : <div className={"dont-have-contacts"}>
                        <ContactPhoneIcon sx={{fontSize: "80px"}}/>
                        {`${t("contactsPage.dontHaveAcc")}`}
                </div>
                }
                {PageCount > 1 && !ContactsStore.IsFiltered
                    ? <Pagination className={"pag"} size={"large"} count={PageCount} page={CurrentPage} onChange={handleChange}/>
                    : <></>
                }
            </div>
            <ModalComponent/>
        </div>
    ) : (
        <Loader/>
    )
});

export default ContactsPage;
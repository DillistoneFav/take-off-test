import React, {useEffect} from 'react';
import {createTheme, Fade, Modal, ThemeProvider} from "@mui/material";
import Input from "../../../Components/Input/Input";
import {observer} from "mobx-react";
import {IContact} from "../../../Interfaces/IContact";
import ModalStore from "../../../Store/ModalStore";
import {createContact, editContact} from "../../../API/ContactsApi";
import {useTranslation} from "react-i18next";
import InputMask from "react-input-mask";

const outerTheme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

const ModalComponent = observer(() => {
    const {t} = useTranslation()

    const {isEditing, isOpen, editingObject, Error} = ModalStore

    useEffect(() => {
        if (isEditing >= 0) ModalStore.setEditingContact()
        else ModalStore.clearEditingObject()
    }, [isOpen])

    const handleClose = () => {
        ModalStore.setError("")
        ModalStore.setModalClose()
    }
    const handleChangeInputValue = (prop: keyof IContact) => (event: React.ChangeEvent<HTMLInputElement>) => {
        ModalStore.handleChange(prop, event.target.value)
    };
    const handleOk = () => {
        if (editingObject.Name && editingObject.Phone) {
            if (isEditing >= 0) {
                editContact(editingObject.id, editingObject).then(() => {
                    handleClose()
                })} else {
                createContact(editingObject).then(() => {
                    handleClose()
                })
            }
        } else {
            ModalStore.setError(t("modalComponent.fillLabels"))
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={isOpen}>
                    <div className={"modalContainer"}>
                        <h2>{isEditing >= 0 ? `${t("modalComponent.editContact")}` : `${t("modalComponent.createContact")}`}</h2>
                        <div className={"inputs-cont"}>
                            <ThemeProvider theme={outerTheme}>
                                <Input placeholder={t("utils.name")} value={editingObject.Name} handleChangeInputValue={handleChangeInputValue('Name')}/>
                                <Input placeholder={t("utils.surname")} value={editingObject.Surname} handleChangeInputValue={handleChangeInputValue('Surname')}/>
                                <InputMask
                                    mask="+7(999) 999 99 99"
                                    value={editingObject.Phone}
                                    onChange={handleChangeInputValue('Phone')}
                                    className={"phone-input"}
                                    placeholder={t("authPage.phoneNumber")}
                                />
                                <Input placeholder={t("utils.email")} value={editingObject.Email} handleChangeInputValue={handleChangeInputValue('Email')}/>
                            </ThemeProvider>
                        </div>
                        <div className={"error-message"}>{Error}</div>
                        <div className={"buttons-cont"}>
                            <button onClick={handleOk} className={"okButton"}>
                                {isEditing >= 0 ?
                                    `${t("utils.edit")}`
                                    :
                                    `${t("utils.create")}`}
                            </button>
                            <button onClick={handleClose} className={"cancelButton"}>{`${t("utils.cancel")}`}</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
});

export default ModalComponent;
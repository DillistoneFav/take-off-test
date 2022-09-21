import React, {FC} from 'react';
import {Avatar} from "@mui/material";
import Boss from './sticke1r.jpg'
import PopoverComp from "../../../Components/Popover/Popover";
import {deleteContact} from "../../../API/ContactsApi";
import modalStore from "../../../Store/ModalStore";
import {useTranslation} from "react-i18next";


interface ContactItemProps {
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
}

const ContactItem: FC<ContactItemProps> = ({id, name, surname, phone, email}) => {
    const {t} = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDeleteContact = () => {
        deleteContact(id)
    }
    const handleOpenEditingModal = () => {
        modalStore.setEditingId(id)
        modalStore.setModalOpen()
    }

    return (
            <div className={"contactItem"}>
                <div className={"avatar"}>
                    <Avatar src={Boss} sx={{width: "75px", height: "75px"}}/>
                </div>
                <div className={"information"}>
                    <div className={"informationItem"}>
                        <div className={"title"}>{`${t("utils.name")}`}:</div>
                        <div className={"description"}>{name} {surname}</div>
                    </div>
                    <div className={"informationItem"}>
                        <div className={"title"}>{`${t("utils.phone")}`}:</div>
                        <div className={"description"}>{phone}</div>
                    </div>
                    { email ?
                        <div className={"informationItem"}>
                            <div className={"title"}>{`${t("utils.email")}`}:</div>
                            <div className={"description"}>{email}</div>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className={"actions"}>
                    <button className={"primary"} onClick={handleOpenEditingModal}>{`${t("utils.edit")}`}</button>
                    <button className={"danger"} onClick={handleClick}>{`${t("utils.delete")}`}</button>
                </div>
                <PopoverComp anchorEl={anchorEl} setAnchorEl={setAnchorEl} popoverText={t("utils.deleteThis")} func={handleDeleteContact}/>
            </div>
    );
};

export default ContactItem;
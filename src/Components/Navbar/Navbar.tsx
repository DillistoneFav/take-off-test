import React, {FC} from 'react';
import './Navbar.scss'
import {observer} from "mobx-react";
import UserStore from "../../Store/UserStore";
import PopoverComp from "../Popover/Popover";
import {logout} from "../../API/UserApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Navbar: FC = observer(() => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const changeLanguage = (event: React.MouseEvent<HTMLDivElement>) => {
        const lang = localStorage.getItem("i18nextLng")
        lang === "en" ?
            i18n.changeLanguage("ru")
            :
            i18n.changeLanguage("en")
    }

    return (
        <div className={"navbar"}>
            <div className={"container"}>
                <div className={"items"}>
                    <div className={"item"}>
                        <div className={"logo"}>{`${t("navbar.logo")}`}</div>
                    </div>
                    <div className={"item"}>
                        {UserStore.User.username ?
                            <div className={"signedAs"}>
                                {`${t("navbar.signedAs")}`}
                                <button onClick={handleClick} className={"userName"}>{UserStore.User.username}</button>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className={"item"}>
                        <div className={"language"}>
                            {`${t("navbar.language")}`}:
                            <span onClick={changeLanguage} className={"languageExactly"}>{`${t("navbar.languageExactly")}`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <PopoverComp
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                popoverText={`${t("navbar.popoverLogoutText")}`}
                func={handleLogout}
            />
        </div>

    );
});

export default Navbar;
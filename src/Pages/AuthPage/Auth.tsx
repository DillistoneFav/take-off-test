import React, {FC, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CONTACTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../Features/Routing/consts";
import InputMask from "react-input-mask";
import './Auth.scss'
import PasswordInput from "./Components/PasswordInput";
import {Button} from "@mui/material";
import {Login, Registration} from '../../API/UserApi'
import UserStore from "../../Store/UserStore";
import {observer} from "mobx-react";
import Input from "../../Components/Input/Input";
import {useTranslation} from "react-i18next";

interface authData {
    name: string,
    phone: string,
    email: string,
    password: string,
}

const Auth: FC = observer(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const {Error} = UserStore

    const [authData, setAuthData] = useState<authData>({
        name: "",
        phone: "",
        email: "",
        password: "",
    })

    const handleChange = (prop: keyof authData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({ ...authData, [prop]: event.target.value });
    };

    const handleAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (authData.name.length && authData.password.length && isLogin) {
            Login(authData.name, authData.password, `${t("utils.incorrectPass")}`).then(() => {
                navigate(CONTACTS_ROUTE)
        })}
        else if (authData.email.length && authData.phone.length) {
            authData.phone = authData.phone.replace(/[()_\s]/g,"")
            Registration(authData.name, authData.phone, authData.email, authData.password).then(() => {
                navigate(CONTACTS_ROUTE)
        })}
        else {
            UserStore.setError(t("authPage.error"))
        }
    }

    return (
        <div className={"container"}>
            <div className={"authPage"}>
                <div className={"card"}>
                    <h2>
                        {isLogin ?
                            `${t("authPage.login")}`
                            :
                            `${t("authPage.registration")}`
                        }
                    </h2>
                    <Input
                        value={authData.name}
                        handleChangeInputValue={handleChange('name')}
                        placeholder={t("utils.name")}
                    />
                    {!isLogin &&
                        <InputMask
                            mask="+7(999) 999 99 99"
                            value={authData.phone}
                            onChange={handleChange('phone')}
                            className={"phone-input"}
                            placeholder={t("authPage.phoneNumber")}
                        />
                    }
                    {!isLogin &&
                        <Input
                            value={authData.email}
                            handleChangeInputValue={handleChange('email')}
                            placeholder={t("authPage.email")}
                        />
                    }
                    <PasswordInput password={authData.password} handleChange={handleChange('password')}/>
                    {Error ? <div className={"errorString"}>{Error}</div> : <></>}
                    <Button
                        sx={{mt: "0.5rem", width: "300px"}}
                        variant="contained"
                        onClick={handleAuth}
                    >
                        {isLogin ? `${t("authPage.logIn")}` : `${t("authPage.registration")}`}
                    </Button>
                    {isLogin
                        ?
                        <div className={"account-existence"}>
                            {`${t("authPage.haveNoAcc")}`}
                            <NavLink className={"sign-route-link"} to={REGISTRATION_ROUTE}>{`${t("authPage.signUp")}`}</NavLink>
                        </div>
                        :
                        <div className={"account-existence"}>
                            {`${t("authPage.haveAcc")}`}
                            <NavLink className={"sign-route-link"} to={LOGIN_ROUTE}>{`${t("authPage.signIn")}`}</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});
export default Auth;
import {CONTACTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import ContactsPage from "../../Pages/Contacts/ContactsPage";
import Auth from "../../Pages/AuthPage/Auth";

export const authRoutes = [
    {
        path: CONTACTS_ROUTE,
        Component: ContactsPage
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
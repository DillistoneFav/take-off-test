import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import UserStore from "../../Store/UserStore";
import {authRoutes, publicRoutes} from "./routes";
import {CONTACTS_ROUTE, LOGIN_ROUTE} from "./consts";
import {observer} from "mobx-react";

const AppRouter = observer(() => {
    return UserStore.IsAuth ? (
        <Routes>
            {authRoutes.map(item => <Route path={item.path} element={<item.Component/>} key={item.path}/>)}
            <Route path="*" element={<Navigate to={CONTACTS_ROUTE} replace />}/>
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(item => <Route path={item.path} element={<item.Component/>} key={item.path}/>)}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />}/>
        </Routes>
    )
});

export default AppRouter;
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '../index.js';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import jwt_decode from "jwt-decode";
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
    const { user } = useContext(Context)
    const { master } = useContext(Context)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken); // отладочный вывод
            user.setRoleUser(decodedToken.role);
        }
    }, [token, user])

    return (
        <Routes>
            {user.roleUser === "ADMIN" && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
});
export default AppRouter;
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../index.js';
import { NavLink } from 'react-router-dom';
import { ABOUTUS_ROUTE, ADMIN_ROUTE, MASTER_ROUTE, SHOP_ROUTE, LOGIN_ROUTE } from '../utils/consts.js';
import { observer } from 'mobx-react-lite';
import styles from './NavBar.module.css';
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";



const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {master} =useContext(Context)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken); // отладочный вывод
            user.setRoleUser(decodedToken.role);
        }
    }, [token, user])

    const logOut= () => {
      user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    return (
<nav>
<NavLink onClick={() => {
    master.setSelectedType({});
    master.setIsMasters(false);
}} className={styles.active} to={SHOP_ROUTE}>BARBERSHOP</NavLink>
      {user.isAuth ?
      <ul>
      <li>
      <NavLink onClick={() => {
          master.setSelectedType({});
          master.setIsMasters(false);
      }} className={styles.activelink} to={ABOUTUS_ROUTE}>О нас</NavLink >
        </li>
        <li>
        <NavLink onClick={() => {
            master.setSelectedType({});
            master.setIsMasters(false);
        }} className={styles.activelink} to={MASTER_ROUTE}>Мастера</NavLink>
        </li>
        <li>
        |
        </li>
          {user._roleUser==="ADMIN" && <li>
            <button onClick={() => {
                navigate(ADMIN_ROUTE);
                master.setSelectedType({});
                master.setIsMasters(false);
            }} className={styles.navbutton} >Админ панель</button>
        </li>}
        <li>
        <button  className={styles.navbutton} onClick={()=> {
            navigate(LOGIN_ROUTE);
            logOut();

        }
        }>Выйти</button>
        </li>
        </ul>
      :
      <ul>
      <li>
      <NavLink onClick={() => {
          master.setSelectedType({});
          master.setIsMasters(false);
      }} className={styles.activelink} to={ABOUTUS_ROUTE}>О нас</NavLink >
        </li>
        <li>
        <NavLink onClick={() => {
            master.setSelectedType({});
            master.setIsMasters(false);
        }} className={styles.activelink} to={MASTER_ROUTE}>Мастера</NavLink>
        </li>
        <li>
        |
        </li>
      <li>
          <button onClick={() => {
              navigate(LOGIN_ROUTE);
              master.setSelectedType({});
              master.setIsMasters(false);
          }}  className={styles.navbutton}>Авторизация</button>
        </li>
        </ul>
      }
       
    </nav>
  );
});
 export default NavBar
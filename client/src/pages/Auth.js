import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import styles2 from './Auth.module.css';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user}= useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data); // здесь нужно использовать свойство "user" из полученных данных
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
        }
    };




    return (
             <form className={styles2.loginform}>
      <h2 className={styles2.formtitle}>{isLogin ? 'Авторизация': 'Регистрация'}</h2>
      <label  className={styles2.formlabel}>
        Email
      </label>
      <input type="email"
       id="email"
        className={styles2.forminput}
       value={email} 
       onChange={e=>setEmail(e.target.value)}
       required />
      <label  className={styles2.formlabel}>
        Пароль
      </label>
      <input type="password"
       id="password" 
       className={styles2.forminput}
       value={password} 
       onChange={e=>setPassword(e.target.value)}
       required />
      <button type="submit" className={styles2.formbutton} onClick={(event) => {
  event.preventDefault();
  click();
}}>
      {isLogin ? 'Войти': 'Регистрация'}
      </button>
      {isLogin ? 

      <label className={styles2.formlabel}>
      Нет аккаунта?  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
    </label>:

      <label className={styles2.formlabel}>
        Есть аккаунт?  <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
      </label>
      }
    </form>
  );
});

 export default Auth
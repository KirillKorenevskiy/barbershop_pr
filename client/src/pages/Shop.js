import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import About from './About';
import shop from './Shop.module.css'
import {MASTER_ROUTE} from '../utils/consts.js';


function scrollToCoordinates() {
  window.scrollTo({
    top: 500, // замените на нужные вам координаты<button className={shop.primarybutton}>Записаться</button>
    left: 0,
    behavior: 'smooth'
  });
}

const Shop = () => {
    return (
      <Fragment>
        <div className={shop.maincontainer}>
        <h1 className={shop.title}>BARBERSHOP</h1>
        <p className={shop.description}>Благодаря нам, люди увидят тебя другим!</p>
        <div className={shop.buttoncontainer}>
          <NavLink to={MASTER_ROUTE} className={shop.active}>Записаться</NavLink>
          <button className={shop.secondarybutton} onClick={scrollToCoordinates}>Узнать больше</button>
        </div>
        </div>
    <About/>
    </Fragment>
    );
  }
 export default Shop
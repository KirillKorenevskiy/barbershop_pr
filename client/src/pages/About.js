import React, { Fragment } from 'react'
import './About.css'
import barber from "./barber.jpg"
import barber2 from "./barber2.jpg"
import barber3 from "./barber3.jpg"

const About = () => {
    return (
     <Fragment>
            <div className='contain'>
     <img src={barber} alt="grege"></img>
     <div className='whiteback'>
     <div className='mini'>Добро пожаловать в наш барбершоп</div>
<div className='mini'>Стильные стрижки для мужчин</div>
<div className='mini'>Профессиональная стрижка - легко и быстро</div>
     </div>
     </div>
     <div className='contain'>
     
     <div className='whiteback'>
     <div className='mini'>Мастерская стрижки для истинных джентльменов</div>
<div className='mini'>Почувствуйте себя настоящим мужчиной</div>
<div className='mini'>Создайте стиль, который выделяет вас из толпы</div>
     </div>
     <img src={barber2} alt="grege"></img>
     </div>

     <div className='contain'>
     <img src={barber3} alt="grege"></img>
     <div className='whiteback'>
<div className='mini'>Превратите свою прическу в произведение искусства</div>
<div className='mini'>Уход за волосами - это просто с нашими мастерами</div>
<div className='mini'>Барбершоп - это не просто стрижка, это стиль жизни</div>
     </div>
     </div>
     </Fragment>
    );
  }
 export default About
import { observer } from 'mobx-react-lite';
import React, {Fragment, useContext, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { Context } from '..';

import styles from './Menu.module.css';
import {fetchMasters} from "../http/mastersAPI";

const Menu = observer(() => {
      const {master} =useContext(Context)

    useEffect(() => {

        fetchMasters().then(data =>
            master.setMasters(data)

        )}, [])

    return (
        <Fragment>
        <h1 className={styles.title}>Наши мастера
        <div key={Math.random()} className={styles.haircutstyles}>


        {master.masters.map(masters =>
     <button
      key={Math.random()}
      onClick={() => {
        master.setSelectedType(masters);
        master.setIsMasters(true);
      }}
      >{masters.name}</button>
      )}

      </div>

      Стрижки
      <div key={Math.random()} className={styles.haircutstyles}>


        {master.masters.map(masters =>
     <button
      key={Math.random()}
      onClick={() => {
        master.setSelectedType(masters);
        master.setIsMasters(true);
      }}
      >{masters.nameCut}</button>
      )}
      </div>
      </h1>
        {master.masters.map(masters =>
        <div key={Math.random()}>
{master.selectedType === masters &&(<div key={Math.random()} className={styles.masters}>

      <div key={Math.random()} className={styles.master}>
              <img src={process.env.REACT_APP_API_URL + masters.image} alt={masters.name} className={styles.photo} />
              <h2 className={styles.name}>{masters.name}</h2>
              <p className={styles.description}>{masters.description}</p>
            </div>
            <div key={Math.random()} className={styles.master}>
              <img src={process.env.REACT_APP_API_URL + masters.imageCut} alt={masters.nameCut} className={styles.photo} />
              <h2 className={styles.name}>{masters.nameCut}</h2>
              <p className={styles.description}>{masters.descriptionOfCut}</p>
              <p className={styles.description}>{masters.price} рублей</p>
              <NavLink>Записаться к мастеру на стрижку "{masters.nameCut}"</NavLink>
            </div>
            </div>)}

            </div>
)}

{master.masters.map(masters =>
        <div key={Math.random()}>

{master.isMasters === false &&(<div className={styles.masters}>

      <div key={Math.random()} className={styles.master}>
              <img src={process.env.REACT_APP_API_URL + masters.image} alt={masters.name} className={styles.photo} />
              <h2  className={styles.name}>{masters.name}</h2>
              <p className={styles.description}>{masters.description}</p>
            </div>
            <div key={Math.random()} className={styles.master}>
              <img src={process.env.REACT_APP_API_URL + masters.imageCut} alt={masters.nameCut} className={styles.photo} />
              <h2 className={styles.name}>{masters.nameCut}</h2>
              <p className={styles.description}>{masters.descriptionOfCut}</p>
              <p className={styles.description}>{masters.price} рублей</p>
              <NavLink>Записаться к мастеру на стрижку "{masters.nameCut}"</NavLink>
            </div>
            </div>)}
            </div>
)}

      </Fragment>
    );
  }
)


export default Menu
import React, {useContext, useState} from 'react';
import styles from './Admin.module.css';
import {createMasters, deleteMasterByName} from "../http/mastersAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
const Admin = observer(() => {
  const {master} = useContext(Context)
  const [name, setName] = useState('');
  const [masterImage, setMasterImage] = useState(null);
  const [masterDescription, setMasterDescription] = useState('');
  const [haircutName, setHaircutName] = useState('');
  const [haircutImage, setHaircutImage] = useState(null);
  const [haircutDescription, setHaircutDescription] = useState('');
  const [price, setPrice] = useState(0);

  /*const handleSubmit = (event) => {
    event.preventDefault();
  };*/
  const deleteMasters = () => {

    deleteMasterByName(name)
        .then(result => {
          console.log(name)
          console.log(result.message); // Мастер успешно удалён
        })
        .catch(error => {
          console.log(name)
          console.error(error);
        })
  }
  const addMasters = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('nameCut', haircutName)
    formData.append('description', masterDescription)
    formData.append('descriptionOfCut', haircutDescription)
    formData.append('price', `${price}`)
    formData.append('image', masterImage)
    formData.append('imageCut', haircutImage)
    createMasters(formData).then(data => master.setMasters(data))
  }

  const selectFile = e => {
    setMasterImage(e.target.files[0])
  }
  const selectFile2 = e => {
    setHaircutImage(e.target.files[0])
  }
  return (
    <div className={styles.admin}>
      <h1>Добавить мастера</h1>
      <form /*onSubmit={handleSubmit}*/ className={styles.masterForm} >
        <div className={styles.formGroup}>
          <label htmlFor="name">Имя мастера:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="masterImage">Изображение мастера:</label>
          <input
            type="file"
            id="masterImage"
            /*onChange={(event) => setMasterImage(event.target.value)}*/
            onChange={selectFile}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="masterDescription">Описание мастера:</label>
          <textarea
            id="masterDescription"
            value={masterDescription}
            onChange={(event) => setMasterDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="haircutName">Название стрижки:</label>
          <input
            type="text"
            id="haircutName"
            value={haircutName}
            onChange={(event) => setHaircutName(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="haircutImage">Изображение стрижки:</label>
          <input
            type="file"
            id="haircutImage"
            onChange={selectFile2}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="haircutDescription">Описание стрижки:</label>
          <textarea
            id="haircutDescription"
            value={haircutDescription}
            onChange={(event) => setHaircutDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"

            onChange={(event) => setPrice(Number(event.target.value))}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton} onClick={addMasters} >
          Добавить мастера
        </button>
      </form>



      <h1>Удалить мастера</h1>
      <form /*onSubmit={handleSubmit}*/ className={styles.masterForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Имя мастера:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        
        <button onClick={
          deleteMasters
        }
                type="submit" className={styles.submitButton}>
          Удалить мастера
        </button>
      </form>
    </div>
  );
});

export default Admin;
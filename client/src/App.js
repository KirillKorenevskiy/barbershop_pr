import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import "./index.css";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Spinner from 'react-bootstrap/Spinner';

const App =observer(()=> {
  const {user}= useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      check().then(data=>{
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(()=>setLoading(false))
    }, `1000`)

  }, [])

  if (loading){
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }
  return (
    <BrowserRouter>
    <NavBar />
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;

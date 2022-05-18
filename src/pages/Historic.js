import React, {useEffect, useState} from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';


function Login() {
  const api = axios.create({
    baseURL: "https://acesse-cafe-back.herokuapp.com/",
    //baseURL: "http://localhost:3001"
  });
const [coffee, setCoffee] = useState([])
const [msg, setMsg] = useState("")
  useEffect(() => {
    api
      .get("/historic")
      .then((response) => setCoffee(response.data)) //response.data.map((item)=> console.log(item.colaborador)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);



  return (
    <main>
    <header>
    <h1>Acesse  café <img width="25px" src="./coffee.png" /></h1>
    </header>

    <div id="alert" className='none'>{msg}</div>
    

    <div className="list-coffee">
      <h1>colaboradores no café</h1>
      <ul>
      { coffee.map( (item) => <li>{ item.colaborador }<span>{(((item.minutos )/1000)/60).toFixed(0) /*((((new Date().getTime() - new Date(item.data).getTime())/1000)/60)/60).toFixed(0)+":"+Math.floor((((new Date().getTime() - new Date(item.data).getTime())/1000)/60).toFixed(0)%60)+":"+ Math.floor((((new Date().getTime() - new Date(item.data).getTime())/1000)%60)) */}</span></li>) }
      </ul>
    </div>
 
  </main>
  );
}

export default Login;
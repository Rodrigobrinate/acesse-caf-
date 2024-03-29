import React from 'react';
import './App.css';
import { useState, useEffect,useRef } from 'react';
import axios from "axios";
import {ProgressBar, Modal, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


const api = axios.create({
  baseURL: "https://acesse-cafe-back.herokuapp.com/",
  //baseURL: "http://localhost:3001"
});

function App() {
  var a = [ "ALEXANDRO ","AUREA","DORIS","EDUARDO","ERLIEI","GEDSON ","GLEYCYKELLY","GUILHERME NEVES","IGOR","JHONNATAN","JOICE","LAYLA","LORENA","LUCAS MATOS","LUCAS MOREIRA ","LUCAS MUNIZ ","MARCELY ","MATHEUS GANDHI","NATAN","RAFAEL","RAIANA ","RAMON","RAONE","REYDNER ","RODRIGO","SAVIO"]


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    api
      .get("/")
      .then((response) => setCoffee(response.data)) //response.data.map((item)=> console.log(item.colaborador)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
 const [coffee, setCoffee] = useState([])
 const [msg, setMsg] = useState("")




  function addCoffee(item){
  
   api
      .post("/add",{
        colaborador: item
      })
      .then((response1) => {
       setMsg(response1.data.msg)
       if (response1.data.st == 0){
        document.getElementById('alert').classList.add("danger")
        document.getElementById('alert').classList.remove("none")
        setTimeout(() => {
         document.getElementById('alert').classList.add("none")
        document.getElementById('alert').classList.remove("danger")
        }, 3000);
       }else{
       
       document.getElementById('alert').classList.add("succes")
       document.getElementById('alert').classList.remove("none")
       setTimeout(() => {
        document.getElementById('alert').classList.add("none")
       document.getElementById('alert').classList.remove("succes")
       }, 3000);
      }
        api
      .get("/")
      .then((response) => setCoffee(response.data)) //response.data.map((item)=> console.log(item.colaborador)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
    }
      )
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
      
  }

 


  function removecoffee(item, minutos){
  
    api
       .post("/remove",{
         colaborador: item
       })
       .then((response) =>   api
      .get("/")
      .then((response) => { setCoffee(response.data)
      api
      .post("/add-historic",{
        colaborador: item,
        minutos: minutos,

      })
      .then((response1) => {


      })}
      ) //response.data.map((item)=> console.log(item.colaborador)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
        
       )
       .catch((err) => {
         console.error("ops! ocorreu um erro" + err);
       });
       
       
       
   }

  


  console.log(localStorage.getItem('coffee'))

  return (
    <main>
      <header>
      <h1>Acesse  café <img width="25px" src="./coffee.png" /></h1>
      </header>

      <div id="alert" className='none'>{msg}</div>
      <div className="list-coffee">
        <h1>colaboradores</h1>
        <ul>
        { a.map( (item) => <li>{ item }<img onClick={() => {addCoffee(item)}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvdlO0NwjAMRF8nYARgE0aByWAURoEN2ABkhKWQIn+1VSX6t/a9OyfxwMLfsLA+FuAAnIFd0sQNOAFX6bMAUrhNimu59O49wLMorm1v81aCVQFqzDIxKUEJoG7CzUAqgQfw3kwPG41odUB7a8NjbGN7Cf4LEHnk6UOOiI7GaJ3BA9hkVT/1d93CFkDW9aWwUUX8+Gtd97eoaP67zUowO6A6c3OFtD+rMw8DZhlJL+JtyMnQFx9TLBnzsocbAAAAAElFTkSuQmCC"/></li>) }
          
        </ul>
      </div>
      

      <div className="list-coffee">
        <h1>colaboradores no café</h1>
        <ul>
        { coffee.map( (item) => <li>{ item.colaborador }
        <ProgressBar now={ (((new Date().getTime() - new Date(item.data).getTime()) * 100)/600000).toFixed(0) /*((((new Date().getTime() - new Date(item.data).getTime())/1000)/60)/60).toFixed(0)+":"+Math.floor((((new Date().getTime() - new Date(item.data).getTime())/1000)/60).toFixed(0)%60)+":"+ Math.floor((((new Date().getTime() - new Date(item.data).getTime())/1000)%60)) */}/>
        <img onClick={handleShow}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAP9JREFUSEvFlesRATEURs9WQAeogBLogA6oQAnoQAd0QAeUQAd0oAPmM7kzkdllkuyu/NtJcs59ZJOChkfRMJ9WBWNgB/Qzs7oBC+Asjp+BJnqZcNsu1iAUPGuCG+YdvJ9Ba4LcxluglRn8RbAGtsDDFbgLLIFNSd+iMxB8BVyAiQOegJETaN4f0QJFqzM9dBLBBL8C+ncsK5NEC7TRl+i7Cq65ZIGVRRArVxh9kkDRG1yRa1i51JPsEk2Bg1cWCawnM+CY22Ttl0RQ/5iqwSE8qUSxV1RSk2MklQKl34khfVl7t3fFv3dU030Nb4Lg87IHp6bgPzG5N+fPoBoXvADVUUAZPLLH/wAAAABJRU5ErkJggg=="/>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>você deseja remover {item.colaborador} do café</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={() => {removecoffee(item.colaborador, (new Date().getTime() - new Date(item.data).getTime()))}}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal></li>) }
        </ul>
      </div>

      
   
    </main>
  );
}

export default App;
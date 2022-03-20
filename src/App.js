import React from 'react'
import './App.css';
import Navbar from './components/navbar'
import News from './components/news'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from 'react';

const App = ()=>{
  const [togglestyle,settogglestyle] = useState({
    background:"white",
    color:"black"
  })
  const [progress,setprogress] = useState(0);
  const [mode,setmode]=useState("dark");
  const [switchst,setswitchst]=useState({color:"white",
  background:"black"})
  const setprogress1=(progrss)=>{
    setprogress(progrss)
  }
    var apiKey = process.env.REACT_APP_API_KEY;
    const togglecolor =()=>{
      if(mode==="dark"){
        settogglestyle({
          background:"black",
          color:"white"
        })
        setmode("light");
        setswitchst({
          color:"black",
          background:"white"
        })
        document.body.style.background = "black";
        document.body.style.color = "white";
      }
      else{
        settogglestyle({
          background:"white",
         color:"black"
        })
        setmode("dark");
        setswitchst({
          color:"white",
          background:"black"
        })
       document.body.style.background = "white";
       document.body.style.color = "black";
      }
    }
    return (
      <div>
       <Router>
        <Navbar md={mode} swst={switchst} func={togglecolor}/>
      <LoadingBar
        color='red'
        height={3}
        progress={progress}
        onLoaderFinished={()=>setprogress(0)}
      />
    
      <Switch>
          <Route exact path="/">
          <News key="general" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="general"/>
          </Route>
          <Route exact path="/Business">
          <News key="buisness" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="business"/>
          </Route>
          <Route exact path="/Entertainment">
          <News key="entertainment" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="entertainment"/>
          </Route>
          <Route exact path="/Sports">
          <News key="sports" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="sports"/>
          </Route>
          <Route exact path="/Technology">
          <News key="technology" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="technology"/>
          </Route> 
          <Route exact path="/Science">
          <News key="science" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="science"/>
          </Route>
          <Route exact path="/Health">
          <News key="health" setprogress1={setprogress1} apikey1={apiKey} tgstyle={togglestyle} cat="health"/>
          </Route>
      </Switch>
      </Router>
      </div>
    )
  }
export default App
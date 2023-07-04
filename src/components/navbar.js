import React from 'react'
import {
   Link
} from "react-router-dom";
const Navbar =(props)=>{
 
          let {swst,md,func} = props;
    return (
      <>
        <nav className={`navbar fixed-top navbar-expand-lg navbar-${md} bg-${md}`}>
            <div className="container-fluid">
              <a className="navbar-brand" href="\">NewsMonkey</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{color : swst.color}}>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/">General</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Entertainment">Entertainment</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Sports">Sports</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Technology">Technology</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Business">Business</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Health">Health</Link>
                  </li>
                  <li className="nav-item" style={{margin:"0% 3%"}}>
                    <Link className="nav-link active" aria-current="page" to="/Science">Science</Link>
                  </li>
                </ul>
                <div className="form-check form-switch mx-3">
                    <input className="form-check-input" type="checkbox" role="switch" onClick={func} id="flexSwitchCheckDefault"/>
                    <label className="form-check-label darkbg" htmlFor="flexSwitchCheckDefault" style={swst}>Enable Dark Mode</label>
                  </div>
                </div>
            </div>
        </nav>
      </>
    )
  }

export default Navbar
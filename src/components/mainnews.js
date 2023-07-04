import React from 'react'

const Mainnews =(props)=>{
    let {mytitle,mydisc,imglink,newsurl,tgstyle,src1,author,publish}  = props;
    return (
        <div className="card m4" style = {{width:"18rem"}}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger m1">
                      {src1}
                </span>
                <img src={imglink} className="card-img-top" style={{height:"10rem"}} alt="news related"/>
            <div className="card-body" style={tgstyle}>
                <h5 className="card-title">{mytitle}....</h5>
                <p className="card-text">{mydisc}.....</p>
                <div className="authorpara">~by {!author?"Unknown":author} at {Date(publish).toLocaleString()}</div>
                <div className="text-center">
                <a href={newsurl} target="_blank" rel='noreferrer' className="btn btn-primary btn-small">Read more</a>
                </div>
            </div>      
      </div>
    )
  }

  export default Mainnews

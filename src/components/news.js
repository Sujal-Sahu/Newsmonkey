import React from 'react'
import Mainnews from './mainnews'
import Spinner from './spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

const News = (props)=>{
  const [text,settext] = useState("india")
  const [loading,setloading] = useState(false)
  const [articles,setarticles] = useState([])
  const [totalresults,settotalresults] = useState(0)
  const [page,setpage]=useState(1)
  const [len,setlen]=useState(18)
  const [mystyle,setmystyle] = useState({
    display:"none"
  })
  let {tgstyle,cat,apikey1} = props;
    const capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
     useEffect(()=>{
      async function getapifirst(){
      props.setprogress1(0);
      setloading(true)
      let country = text.slice(0,2);
        let apisource = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey1}&category=${cat}&page=${page}&pagesize=18`;
    let data = await fetch(apisource);
    props.setprogress1(20);
    let arrdata =await data.json();
    props.setprogress1(30);
    let arrdata1 = [arrdata];
    props.setprogress1(40);
    console.log(arrdata1);
    props.setprogress1(80);
    document.title = `NewsMonkey-${capitalizeFirstLetter(cat)} News`;
    props.setprogress1(100);
    setarticles(arrdata1[0].articles);
    settotalresults(arrdata1[0].totalResults);
    setmystyle({
      display:"block"
    });
    setloading(false)}
    getapifirst()
  },[])
  const getdata = async(pages) => {
        setloading(true)
        let country = text.slice(0,2);
        let apisource = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey1}&category=${cat}&page=${pages}&pagesize=18`;
        let data = await fetch(apisource);
        let arrdata =await data.json();
        let arrdata1 = [arrdata];
        console.log(arrdata1);
        document.title = `NewsMonkey-${this.capitalizeFirstLetter(this.props.cat)} News`;
        setarticles(arrdata1[0].articles);
        settotalresults(arrdata1[0].totalResults);
        setmystyle({
          display:"block"
        })
        setloading(false);
  }
  const searchcountry=async()=>{
      getdata(page);
  }
  const fetchData = async()=>{
  let country = text.slice(0,2);
  let apisource = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey1}&category=${cat}&page=${page+1}&pagesize=18`;
  let data = await fetch(apisource);
  let arrdata =await data.json();
  let arrdata1 = [arrdata];
  console.log(arrdata1);

  setarticles(articles.concat(arrdata1[0].articles));
  settotalresults(arrdata1[0].totalResults);
  setmystyle({
            display:"block"
          });
          setlen(len+18);
          setpage(page+1);
          }

          const handleonchange = (event) =>{
                  settext(event.target.value);
          }
    return (
      <>
      <div className="container">
      <div className="form-floating mb-3 s1 media" style={tgstyle}>
  <input type="text" className="form-control s2 medias3"  style={tgstyle} id="floatingInput" value={text} onChange={handleonchange} placeholder="Enter the country name" />
  <label htmlFor="floatingInput">Enter the country name</label>
<button className="btn btn-primary s3" type="submit" onClick={searchcountry}>Search</button>
</div>
</div>
       <div>
         {loading && <Spinner />}
         <h1 className='text-center' style={mystyle}>NewsMonkey-Top {capitalizeFirstLetter(props.cat)} Headlines</h1>
         <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={fetchData}
            hasMore={len<=totalresults}
            loader={<Spinner />}
            endMessage={
              <div className="container text-center">yay! you have seen it all.</div>
            }
          >
            <div className="container">
            <div className="row my-3">
            {articles!==undefined ? 
               articles.map((element)=>{
               return  <div className="col-md-4 my-3 m2" key={element.publishedAt}>
               <Mainnews author={element.author} publish={element.publishedAt} src1={element.source.name} tgstyle={tgstyle} mytitle={element.title===null?" ":element.title.slice(0,48)} mydisc={element.description===null?" ":element.description.slice(0,88)} imglink={element.urlToImage} newsurl={element.url}/>
               </div>
         })
         :
         " "
        }
         </div>
         </div>
         </InfiniteScroll>
       </div>
      </>
    )
}
News.defaultProps={
  cat:"general"
}
News.propTypes={
  cat:propTypes.string
}
export default News



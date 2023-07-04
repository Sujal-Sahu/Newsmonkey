import React from 'react'
import Mainnews from './mainnews'
import Spinner from './spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const News = (props)=>{
  const [country,setcountry] = useState("in")
  const [loading,setloading] = useState(false)
  const [articles,setarticles] = useState([])
  const [totalresults,settotalresults] = useState(0)
  const [page,setpage]=useState('')
  const [len,setlen]=useState(10)
  const [mystyle,setmystyle] = useState({
    display:"none"
  })
  let {apikey1,tgstyle,cat} = props;
    const capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
     useEffect(()=>{
      async function getapifirst(){
      props.setprogress1(0);
      setloading(true);
      let apisource = `https://newsdata.io/api/1/news?apikey=${apikey1}&category=${cat}&country=${country}&language=en`;
    let data = await fetch(apisource);
    props.setprogress1(20);
    let arrdata =await data.json();
    props.setprogress1(30);
    let arrdata1 = [arrdata];
    props.setprogress1(40);
    // console.log(arrdata1);
    props.setprogress1(80);
    document.title = `NewsMonkey-${capitalizeFirstLetter(cat)} News`;
    props.setprogress1(100); 
    setarticles(arrdata1[0].results);
    settotalresults(arrdata1[0].totalResults);
    setpage(arrdata1[0].nextPage);
    setmystyle({
      display:"block"
    });
    setloading(false)}
    getapifirst()
  },[])
  const getdata = async(pages) => {
        setloading(true)
        let apisource = `https://newsdata.io/api/1/news?apikey=${apikey1}&category=${cat}&country=${country}&language=en`;
        let data = await fetch(apisource);
        let arrdata =await data.json();
        let arrdata1 = [arrdata];
        // console.log(arrdata1);
        document.title = `NewsMonkey-${capitalizeFirstLetter(cat)} News`;
        setarticles(arrdata1[0].results);
        settotalresults(arrdata1[0].totalResults);
        setpage(arrdata1[0].nextPage);
        setmystyle({
          display:"block"
        })
        setloading(false);
  }
  const searchcountry=async()=>{
      getdata(page);
  }
  const fetchData = async()=>{
  let apisource = `https://newsdata.io/api/1/news?apikey=${apikey1}&category=${cat}&country=${country}&language=en&page=${page}`;
  let data = await fetch(apisource);
  let arrdata =await data.json();
  let arrdata1 = [arrdata];
  // console.log(arrdata1);

  setarticles(articles.concat(arrdata1[0].results));
  settotalresults(arrdata1[0].totalResults);
  setmystyle({
            display:"block"
          });
          setpage(arrdata1[0].nextPage);
          setlen(len+10);
          }

          const handleonchange = (event) =>{
                  setcountry(event.target.value);
          }
    return (
      <>
      <div className="container">
      <div className="form-floating mb-3 s1 media" style={tgstyle}>
        <label htmlFor="validationDefault04" style={{padding: "8px 23px",fontWeight: "500",fontSize: "21px"}}>State</label>
    <select name="country" style={{margin: "2%"}} class="form-select" id="validationDefault04" onChange={(event)=>{event.preventDefault();setcountry(event.target.value)}} required>
        <option value="af">Afghanistan</option>
        <option value="al">Albania</option>
        <option value="dz">Algeria</option>
        <option value="au">Australia</option>
        <option value="bd">Bangladesh</option>
        <option value="be">Belgium</option>
        <option value="bm">Bermuda</option>
        <option value="bt">Bhutan</option>
        <option value="br">Brazil</option>
        <option value="ca">Canada</option>
        <option value="cn">China</option>
        <option value="co">Colombia</option>
        <option value="dk">Denmark</option>
        <option value="eg">Egypt</option>
        <option value="fi">Finland</option>
        <option value="fr">France</option>
        <option value="de">Germany</option>
        <option value="hk">Hong Kong</option>
        <option value="ie">Ireland</option>
        <option value="it">Italy</option>
        <option value="in" selected="selected">India</option>
        <option value="jp">Japan</option>
        <option value="lu">Luxembourg</option>
        <option value="mx">Mexico</option>
        <option value="nl">Netherlands</option>
        <option value="pl">Poland</option>
        <option value="pt">Portugal</option>
        <option value="sg">Singapore</option>
        <option value="es">Spain</option>
        <option value="tn">Tunisia</option>
        <option value="gb">United Kingdom</option>
        <option value="us">United States</option>
    </select>
<button className="btn btn-primary s3" type="submit" onClick={searchcountry}>Search</button>
</div>
</div>
       <div>
         {loading && <Spinner />}
         <h1 className='text-center' style={mystyle}>NewsMonkey-Top {cat==="top"?"Latest":capitalizeFirstLetter(cat)} Headlines</h1>
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
                const uniqueId = uuidv4();
               return  <div className="col-md-4 my-3 m2" key={element.link}>
               <Mainnews author={element.creator} publish={element.pubDate} src1={element.source_id} tgstyle={tgstyle} mytitle={element.title===null?" ":element.title.slice(0,48)} mydisc={element.description===null?" ":element.description.slice(0,88)} imglink={!element.image_url?`https://source.unsplash.com/random/800x600/?${element.title}-news-${uniqueId}`:element.image_url} newsurl={element.link}/>
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



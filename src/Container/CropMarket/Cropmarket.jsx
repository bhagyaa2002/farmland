import React, { useEffect, useState } from 'react'
import honest from '../../assets/image/honest.jpg'
import mix from '../../assets/image/mix.jpg'
import Card from '../../Component/Card/Card'
import CarouselList from '../../Component/Carousel/Carousel'
import Nav from '../../Component/nav/Nav'
import './Cropmarketstyle.scss'



import { collection } from "firebase/firestore"
import rupee from '../../assets/image/rupee.jpg'
import Footer from "../../Component/Footer/Footer"
import Loder from '../../Component/Loder/Loder'
import { db } from "../../config/firebase"
import { useUserAuth } from "../../context/UserAuthContext"


function Cropmarket() {
  const[cropMarket,setCropmarket]=useState()
  const[cropcat,setCropcat] = useState("All")
  const {getCropMarket,cropMarketData} =useUserAuth();
  const ref=collection(db,"crop market")
  useEffect(() => {
     const getdata = async() =>{
       const data = await getCropMarket()
       await setCropmarket(data)
      //  const data = onSnapshot(ref, (doc) => {
      //   setCropmarket(doc.docs)
      // });
      console.log("line 34",data);
      

     }
     getdata()
  

  }, [window.location.pathname=="/cropmarket"])
  
  return (
    <div className='cropmarketmain'>
      <Nav/>
      {cropMarket?
      <>
       <div className='markettop'>
        <div className='carousel'>
        <CarouselList type={"crop"}/>
        </div>

        <div className='banner'>
          <div className='eachbanner'>
            <img style={{opacity:"0.5"}} src={mix} alt="" />
            <div className='text-block'  style={{position:"absolute",top:"50px",left:"30px"}}>
              <p style={{fontSize:"28px"}}>Sell Crop on One Click</p>
            </div>
          </div>
          <div className='eachbanner'>
            <img src={honest} style={{opacity:"0.5"}} alt="" />
            <div className='text-block' style={{position:"absolute",top:"50px",right:"30px"}}>
              <p style={{fontSize:"28px"}}>Honest Pricing </p>
            </div>
          </div>
          <div className='eachbanner'>
            <img src={rupee} style={{opacity:"0.5"}} alt="" />
            <div className='text-block'  style={{position:"absolute",top:"40px",left:"30px"}}>
              <p style={{fontSize:"28px"}}>No Middle Man</p>
            </div>
          </div>
        </div>
      </div>

      <div className='cropcat'>
        <div className='catlist'>
            <div className={cropcat=="All"?"cropcatmainactive":'cropcatmain'} onClick={()=>{setCropcat("All");}}>
                <h5>All <hr/></h5> 
            </div>
            <div className={cropcat=="Near"?"cropcatmainactive":'cropcatmain'} onClick={()=>{setCropcat("Near");}}>
                <h5>Nearby My Location <hr/></h5>    
            </div>
        </div>
      </div>

      <div className='marketcard'>
        <div className='cardheading'>
        <h5>Instant  Required Crop </h5>
        </div>
        <div className='cardlist'>
          {cropMarket.map((marketdata)=>(
               <Card Id={marketdata._id} data={marketdata} type="Required Instant" type2="" cat={cropcat}/>
          ))}
        </div>
      </div>

      <div className='marketcard'>
        <div className='cardheading'>
        <h5>Crop Required  After 2 Days </h5>
        </div>
        <div className='cardlist'>
        {cropMarket.map((marketdata)=>(
        (marketdata._id != undefined &&
               <Card Id={marketdata._id } data={marketdata} type="Required after week" type2="Required after 2 days" cat={cropcat}/>
        )
          ))}
        </div>
      </div>
      <Footer/>
      </>
      :<Loder/>}
     

    </div>
  )
}

export default Cropmarket
import React, { useEffect, useState } from 'react'
import "./Admindashboard.scss"
import Nav from '../nav/Nav'
import cron from "../../assets/image/corn.png"
import { Icon } from '@iconify/react';
import {auth,db} from "../../config/firebase"
import { collection, onSnapshot } from 'firebase/firestore'
import Loder from '../Loder/Loder';
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router";
import Footer from "../../Component/Footer/Footer";

const Admindashboard = () => {
  const ref=collection(db,"pending crops")
  const[cropdata,setCropdata]=useState()
  const { addCrop,deletePendingcrop,getPendingCrop} =useUserAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getdata = async()=>{
    const data1= await getPendingCrop();
    console.log("line 21 admin",data1);
    setCropdata(data1);
    // const data = onSnapshot(ref, (doc) => {
    //   setCropdata(doc.docs)
    //   console.log(doc.docs);
    // });
  }
    getdata()
  }, [])


 const publish = async (i,id)=>{
  console.log(cropdata[i]);
    await addCrop(cropdata[i])
    console.log(id);
    await deletePendingcrop({cropname:cropdata[i].cropname})
    const updatedData = await getPendingCrop();
    console.log(updatedData);
    setCropdata(updatedData);  
    // const data1= await getPendingCrop();
    // setCropdata(data1);
    // window.location.reload();
    navigate(0); 
    
 }

 const view=(id)=>{
  console.log("line 49",id);
  navigate(`/editpendingcrop/${id}`)
 }

  return (
    <>
    <div className='dashContainer'>
      <Nav/>
      <h1>Add Crop Request</h1>
      <div className='cardwrap'>
      {
        cropdata?<>

        {
          cropdata?.map((crop,i)=>(



            <div className='dashCard'>
            <div className='dashImage'>
            <img src={crop.cropImageUrl} alt="" />
            </div>
            <div className='dashleft'>
              <h1>{crop.cropname}</h1>
                <div className='dashinfo'>
                  <Icon icon="carbon:soil-moisture-field" width="23" height="23" />
                    <h3>{crop.soiltype}</h3>
                </div>
                <div className='dashinfo'>
                    <Icon icon="entypo:drop" color="#73c1fa" width="23" height="23" />
                    <h3>{crop.irrigation}</h3>
                </div>
                {/* <div className='dashinfo'>
                  <Icon icon="bx:rupee" width="23" height="23"/>
                  <h3> {crop.data().price}/kg</h3>
                </div> */}
                <div className='dashinfo'>
                  <Icon icon="carbon:temperature-max" color="red" width="23" height="23" />
                  <h3>{crop.temperature}°C</h3>
                </div>
            </div>
            <div className='dashbtn'>
              <div className='btndash' onClick={()=>view(crop._id)} style={{backgroundColor:"yellowgreen"}}>
               View
              </div>
              <div className='btndash' onClick={()=>publish(i,crop._id)}  style={{backgroundColor:"green"}}>
               Publish
              </div>
              <div className='btndash'  style={{backgroundColor:"red"}}>
               Delete
              </div>
    
            </div>
          </div>

          ))
        }

        
        </>:
        <>
        <Loder/>
        </>
      }
      


      </div>
      
    </div>
    
    </>
  )
}

export default Admindashboard
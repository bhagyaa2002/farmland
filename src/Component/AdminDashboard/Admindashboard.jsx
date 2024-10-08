import { Icon } from '@iconify/react';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "../../Component/Footer/Footer";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import Loder from '../Loder/Loder';
import Nav from '../nav/Nav';
import "./Admindashboard.scss";

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
  console.log("line 33",cropdata[i]);
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
 const deleteCrop= async(cropname)=>{
   await deletePendingcrop({cropname:cropname})
  //  window.location.reload();
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
              <div className='btndash' onClick={()=>deleteCrop(crop.cropname)}  style={{backgroundColor:"red"}}>
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
    <Footer/>
    </>
  )
}

export default Admindashboard
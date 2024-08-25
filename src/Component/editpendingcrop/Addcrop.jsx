import "./Addcrop1.scss"
import TextField from '@mui/material/TextField';
import Nav from '../nav/Nav';
import { useUserAuth } from "../../context/UserAuthContext";
import { useParams } from "react-router-dom";
import {auth,db} from "../../config/firebase"
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Loder from "../Loder/Loder";
import { useNavigate } from "react-router";

const Addpendingcrop = () => {
  const ref=collection(db,"pending crops")
  const[cropdata,setCropdata]=useState()
  const navigate = useNavigate();
  const { getPendingCrop } = useUserAuth();
  useEffect(() => {
    getting()
    
  //console.log(cropdata);
  }, [])

  const getting= async()=>{


    // const data1=await getDocs(ref)
    const data1 = await getPendingCrop()
    console.log("line 28", data1);
    await data1.map((crop)=>{
        
      if(crop._id==params.id){
        setCropname(crop.cropname)
        setCropweather(crop.soiltype)
        setCropirr(crop.irrigation)
        setCroptemp(crop.temperature)
        setCroploc(crop.location)
        setCropdec(crop.description)
        setCropsub1(crop.subcrops[0])
        setCropsub2(crop.subcrops[1])
        setCropsub3(crop.subcrops[2])
        setCropsub4(crop.subcrops[3])
        setCropvar1(crop.variety[0])
        setCropvar2(crop.variety[1])
        setCropvar3(crop.variety[2])
        setCropvar4(crop.variety[3])

        console.log(crop);
        setCropdata(crop)
      }
    

    })
    
    // const data = onSnapshot(ref, (doc) => {

    //   console.log(doc.docs);
      // doc.docs.map((crop)=>{
        
      //   if(crop.id==params.id){
      //     console.log(crop);
      //     setCropdata(crop.data())
      //   }
      

      // })
      
    // });

  }


  const { addCrop,deletePendingcrop} =useUserAuth();
  const params = useParams();

    const[cropname,setCropname]=useState("")

    const[cropweather,setCropweather]=useState("")
    const[cropirr,setCropirr]=useState("")
    const[croptemp,setCroptemp]=useState("")
    const[croploc,setCroploc]=useState("")

    const[cropdec,setCropdec]=useState("")

    const[cropsub1,setCropsub1]=useState("")
    const[cropsub2,setCropsub2]=useState("")
    const[cropsub3,setCropsub3]=useState("")
    const[cropsub4,setCropsub4]=useState("")

    const[cropvar1,setCropvar1]=useState("")
    const[cropvar2,setCropvar2]=useState("")
    const[cropvar3,setCropvar3]=useState("")
    const[cropvar4,setCropvar4]=useState("")

   
    const handelchange = async() =>{

      const data={
        cropname:cropname,
        soiltype:cropweather,
        irrigation:cropirr,
        temperature:croptemp,
        cropImageUrl:"https://firebasestorage.googleapis.com/v0/b/farmland-89e6d.appspot.com/o/crops%2Fcoconut%2Flouis-hansel-gBxUqEpBPsI-unsplash.jpg?alt=media&token=862aff6e-5288-41b8-805a-e4260e3484bb",
        subcrops:[cropsub1,cropsub2,cropsub3,cropsub4],
        description:cropdec,
        location:croploc,
        variety:[cropvar1,cropvar2,cropvar3,cropvar4]
      }
      await addCrop(data);
      await deletePendingcrop(params.id)
      navigate(`/news`)

    }

  return (
    
    <>
    {
      cropdata?
      <div className='addcontanier'>
        <Nav/>
        <h1>CrowdSourcing</h1>
        <div className='textinput1'>
        <input type="text" placeholder='CropName' style={{width: "700px"}} value={cropname} onChange={(e)=>setCropname(e.target.value)} />
        </div>
        <div className='multiinput1'>
        <input type="text" placeholder='Weather Type' style={{width: "300px"}} value={cropweather} onChange={(e)=>setCropweather(e.target.value)} />
        <input type="text" placeholder='Irrigation Type' style={{width: "300px", marginLeft:"100px"}} value={cropirr} onChange={(e)=>setCropirr(e.target.value)} />
        </div>
        <div className='multiinput1'>
        <input type="text" placeholder='Temprature Required' style={{width: "300px"}} value={croptemp} onChange={(e)=>setCroptemp(e.target.value)}/>
        <input type="text" placeholder='Location' style={{width: "300px", marginLeft:"100px"}} value={croploc} onChange={(e)=>setCroploc(e.target.value)}/>
        </div>
        <div className='textinput1'>
        <textarea type="text" placeholder='Crop Description' style={{width: "700px",fontSize:"16px", padding:"20px"}} rows="10" value={cropdec} onChange={(e)=>setCropdec(e.target.value)} />
        </div>
        <div className='multiinput1'>
        <input type="text" placeholder='SubCrops Recommendation 1'  style={{width: "300px"}} value={cropsub1} onChange={(e)=>setCropsub1(e.target.value)} />
        <input type="text" placeholder='SubCrops Recommendation 2' style={{width: "300px", marginLeft:"100px"}} value={cropsub2} onChange={(e)=>setCropsub2(e.target.value)}/>
        </div>
        <div className='multiinput1'>
        <input type="text" placeholder='SubCrops Recommendation 3' style={{width: "300px"}} value={cropsub3} onChange={(e)=>setCropsub3(e.target.value)} />
        <input type="text" placeholder='SubCrops Recommendation 4' style={{width: "300px", marginLeft:"100px"}} value={cropsub4} onChange={(e)=>setCropsub4(e.target.value)}/>
        </div>
        
        <div className='multiinput1'>
        <input type="text" placeholder='Varieties 1'  style={{width: "300px"}} value={cropvar1} onChange={(e)=>setCropvar1(e.target.value)}/>
        <input type="text" placeholder='Varieties 2' style={{width: "300px", marginLeft:"100px"}} value={cropvar2} onChange={(e)=>setCropvar2(e.target.value)}/>
        </div>
        <div className='multiinput1'>
        <input type="text" placeholder='Varieties 3' style={{width: "300px"}} value={cropvar3} onChange={(e)=>setCropvar3(e.target.value)}/>
        <input type="text" placeholder='Varieties 4' style={{width: "300px", marginLeft:"100px"}} value={cropvar4} onChange={(e)=>setCropvar4(e.target.value)}/>
        </div>

        <div className='submitbtn1' onClick={()=>handelchange()}>
            <h4>Submit</h4>

        </div>

    </div>
    :<Loder/>
    }
     
    
    </>
    
   
  )
}

export default Addpendingcrop
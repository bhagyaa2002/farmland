import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 } from "uuid";
import { storage } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import "./CropModelstyle.scss";



const CropModel = ({open,onClose,type}) => {

  const[btnclick,setBtnclick] = useState(false)

  const[cropname,setCropname]=useState("")
  const[image,setImage]=useState()
  const[quantity,setQuantity]=useState("")
  const[rate,setRate]=useState("")
  const[offerrate,setOfferate]=useState("")
  const[requiredtype,setRequiredtype]=useState("")
  const[croptype,setCroptype]=useState("")

  const[fertilizername,setFertilizername]=useState("")
  const[fertilizerimage,setFertilizerImage]=useState()
  const[fertilizerquantity,setFertilizerQuantity]=useState("")
  const[fertilizerstock,setFertilizerStock]=useState("")
  const[fertilizerate,setFertilizerRate]=useState("")
  const[fertilizerofferrate,setFertilizerOfferate]=useState("")
  const[fertilizercat,setFertilizerCat]=useState("")
  const[fertilizertype,setFertilizertype]=useState("")
  const[errorMessage,setErrorMessage]=useState("")
  const[errorMessage1,setErrorMessage1]=useState("")
  const[errorMessage2,setErrorMessage2]=useState("")
  const[errorMessage3,setErrorMessage3]=useState("")
  const[errorMessage4,setErrorMessage4]=useState("")
  
  const[fertilizerErrorMessage,setFertilizerErrorMessage]=useState("")
  const[fertilizerErrorMessage1,setFertilizerErrorMessage1]=useState("")
  const[fertilizerErrorMessage2,setFertilizerErrorMessage2]=useState("")
  const[fertilizerErrorMessage3,setFertilizerErrorMessage3]=useState("")
  const[fertilizerErrorMessage4,setFertilizerErrorMessage4]=useState("")
  const[fertilizerErrorMessage5,setFertilizerErrorMessage5]=useState("")
  const { addCropMarket,user,addFertilizerMarket,getCropMarket,getFertilizerMarket } =useUserAuth();
  const navigate  = useNavigate()



  const handleChangefertilizer = async() =>{
    if(fertilizername===""){
      setFertilizerErrorMessage4("Please enter a fertilizer name.")
    return;
    }
    setFertilizerErrorMessage4("")
    if(fertilizerimage==null){
      setFertilizerErrorMessage3("No image choosen, Please choose a image.")
    return;
    }
    setFertilizerErrorMessage3("")
    if(fertilizerquantity==""){
      setFertilizerErrorMessage("Please enter the value.")
      return;
    }
    setFertilizerErrorMessage("")
   
    if(fertilizerstock==""){
      setFertilizerErrorMessage5("Please enter the value.")
      return;
    }
    setFertilizerErrorMessage5("")

    if(fertilizerate==""){
      setFertilizerErrorMessage1("Please enter the value.")
      return;
    }
   
    setFertilizerErrorMessage1("")
    if(fertilizerofferrate==""){
      setFertilizerErrorMessage2("Please enter the value.")
      return;
    }
    setFertilizerErrorMessage2("")
    
    
   
    setBtnclick(true)
    const imageRef=ref(storage,`market/${fertilizerimage.name+v4()}`);

    await uploadBytes(imageRef,fertilizerimage).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then(url =>{
        const data={
          url:url,
          name:fertilizername,
          quantity:fertilizerquantity,
          NoOfItemsAvailable:fertilizerstock,
          mrp:fertilizerate,
          offerPrice:fertilizerofferrate,
          categori:fertilizercat,
          fertilizertype:fertilizertype,
          owner:user.shop,
          location:user.location
        };
        console.log(data)
        addFertilizerMarket(data)
      })
    });
    await getFertilizerMarket()
    setFertilizername("")
    setFertilizerImage(null)
    setFertilizerQuantity("")
    setFertilizerStock("")
    setFertilizerRate("")
    setFertilizerOfferate("")
    setFertilizerCat("")
    setFertilizertype("")
    setBtnclick(false)

    navigate("/fertilizermarket")
    onClose()
  }


  const handleChange = async() =>{
    if(cropname===""){
      setErrorMessage4("Please enter a cropname.")
    return;
    }
    setErrorMessage4("")
    if(image==null){
      setErrorMessage3("No image choosen, Please choose a image.")
    return;
    }
    setErrorMessage3("")
    if(quantity==""){
      setErrorMessage("Please enter the value.")
      return;
    }
    setErrorMessage("")
    if(rate==""){
      setErrorMessage1("Please enter the value.")
      return;
    }
   
    setErrorMessage1("")
    if(offerrate==""){
      setErrorMessage2("Please enter the value.")
      return;
    }
    setErrorMessage2("")
    
    
    setBtnclick(true)
    const imageRef=ref(storage,`market/${image.name+v4()}`);
    await uploadBytes(imageRef,image).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then(url =>{
        const data={
          url:url,
          name:cropname,
          quantity:quantity,
          reamining:quantity,
          mrp:rate,
          offerPrice:offerrate,
          requiredtime:requiredtype,
          croptype:croptype,
          owner:user.shop,
          location:user.location

        };
        addCropMarket(data)
      })
    });
    await getCropMarket()
    setCropname("")
    setImage(null)
    setQuantity("")
    setRate("")
    setOfferate("")
    setRequiredtype("")
    setCroptype("")
    setBtnclick(false)
    onClose()
  }





    if(!open) return null
  return (
    <div onClick={onClose} className='overlaycrop'>
      {type=="fertilizer"?
      <div onClick={(e)=>{
            e.stopPropagation()
        }} className='modelcontainercrop'>
            <div className='btncover'>
            <p onClick={onClose} className="closebtn">X</p>
            </div>
            <div className='modelbody'> 
            <h2 className='heading-model'>Add Fertilizer</h2>
            <TextField 
            label="Fertilizer Name" 
            variant="outlined" 
            sx={{width:"500px",}}
            value={fertilizername}
            onChange={(e)=>{setFertilizername(e.target.value)}}
            />
            
            {fertilizerErrorMessage4 &&(<h6 className="errorMessage">{fertilizerErrorMessage4}</h6>)}
            <TextField   accept="image/*"
             InputLabelProps={{ shrink: true }}
             label="Fertilizer Image"
             multiple
             type="file" 
             sx={{width:"500px", marginTop:"10px"}}
             onChange={(event)=>{setFertilizerImage(event.target.files[0])}}
             />
             {fertilizerErrorMessage3 &&(<h6 className="errorMessage">{fertilizerErrorMessage3}</h6>)}
            <TextField  
            label="Quantity per bag" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerquantity}
            onChange={(e)=>{
              const value = e.target.value;
              // const numValue = Number(value);
            if (value === "" ) {
              setFertilizerErrorMessage("Value should be greater than 0")
              setFertilizerQuantity("");
            } 
            else if (value !== "") {
              setFertilizerQuantity(value);
              setFertilizerErrorMessage("");
            }
            }}
            />
            {fertilizerErrorMessage &&(<h6 className="errorMessage">{fertilizerErrorMessage}</h6>)}

            <TextField  
            label="Stock Availability" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerstock}
            onChange={(e)=>{
              const value = e.target.value;
              // const numValue = Number(value);
            if (value === "" ) {
              setFertilizerErrorMessage5("Value should be greater than 0")
              setFertilizerStock("");
            } 
            else if (value !== "") {
              setFertilizerStock(value);
              setFertilizerErrorMessage5("");
            }
            }}
            />
            {fertilizerErrorMessage5 &&(<h6 className="errorMessage">{fertilizerErrorMessage5}</h6>)}

            <TextField  
            label="Market Rate of Fertilizer" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerate}
            onChange={(e)=>{
            const value = e.target.value;
              const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setFertilizerErrorMessage1("Value should be greater than 0")
              setFertilizerRate("");
            } 
            else if (numValue > 0) {
              setFertilizerRate(value);
              setFertilizerErrorMessage1("");
            }
      }}
            />
            {fertilizerErrorMessage1 &&(<h6 className="errorMessage">{fertilizerErrorMessage1}</h6>)}
            <TextField  
            label="offer Rate" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerofferrate}
            onChange={(e)=>{
              const value = e.target.value;
              const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setFertilizerErrorMessage2("Value should be greater than 0")
              setFertilizerOfferate("");
            } 
            else if (numValue > 0) {
              setFertilizerOfferate(value);
              setFertilizerErrorMessage2("");
            }
            }}
            />
            {fertilizerErrorMessage2 &&(<h6 className="errorMessage">{fertilizerErrorMessage2}</h6>)}

            <FormControl sx={{width:"500px", marginTop:"10px"}}>
            <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categoryyy"
                value={fertilizercat}
                onChange={(e)=>{setFertilizerCat(e.target.value)}}
                >
                <MenuItem value={"Fertilizer"}>Fertilizer</MenuItem>
                <MenuItem value={"Seeds"}>Seeds</MenuItem>
                <MenuItem value={"Pestisides"}>Pestisides</MenuItem>
                <MenuItem value={"Equipment"}>Equipment</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{width:"500px", marginTop:"10px"}}>
            <InputLabel id="demo-simple-select-label" >Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={fertilizertype}
                onChange={(e)=>{setFertilizertype(e.target.value)}}
                >
                {(fertilizercat==="Fertilizer" || fertilizercat==="Pestisides")&&<MenuItem value={"Organic"}>Organic</MenuItem>}
                {(fertilizercat==="Fertilizer" || fertilizercat==="Pestisides")&&<MenuItem value={"Chemical"}>Chemical</MenuItem>}
                {fertilizercat==="Seeds" &&<MenuItem value={"Normal"}>Normal</MenuItem>}
                {fertilizercat==="Seeds" &&<MenuItem value={"Hybrid"}>Hybrid</MenuItem>}
                {fertilizercat==="Equipment" &&<MenuItem value={"With subsidy"}>With subsidy</MenuItem>}
                {fertilizercat==="Equipment" &&<MenuItem value={"Without subsidy"}>Without subsidy</MenuItem>}

                </Select>
            </FormControl>

            </div>

            <div className='cropsave'>
              <div className={!btnclick?'savecrop':'savecropdisable'} onClick={handleChangefertilizer}>Save</div> 
            </div>
        </div> :
        <div onClick={(e)=>{
          e.stopPropagation()
      }} className='modelcontainercrop'>
          <div className='btncover'>
          <p onClick={onClose} className="closebtn">X</p>
          </div>
          <div className='modelbody'> 
          <h2 className='heading-model'>Add Crop</h2>

          <TextField 
          label="Crop Name" 
          variant="outlined" 
          sx={{width:"500px"}}
          value={cropname}
          onChange={(e)=>{setCropname(e.target.value)}}
          />
          {errorMessage4 &&(<h6 className="errorMessage">{errorMessage4}</h6>)}
          <TextField   accept="image/*"
           InputLabelProps={{ shrink: true }}
           label="Crop Image"
           multiple
           type="file" 
           sx={{width:"500px", marginTop:"10px"}}
           onChange={(event)=>{setImage(event.target.files[0])}}
           />
           {errorMessage3 &&(<h6 className="errorMessage">{errorMessage3}</h6>)}
          <TextField  
          type='number'
          label="Quantity" 
          variant="outlined" 
          sx={{width:"500px", marginTop:"10px"}}
          value={quantity}
          onChange={(e) => {
            const value = e.target.value;
            // const numValue = Number(value);
            if (value === "") {
              setErrorMessage("Value should be greater than 0")
              setQuantity("");
            } 
            else if (value !== "") {
              setQuantity(value);
              setErrorMessage("")
            }
          }}
          />
          {errorMessage &&(<h6 className="errorMessage">{errorMessage}</h6>)}
          <TextField  
          type='number'
          label="Market Rate" 
          variant="outlined" 
          sx={{width:"500px", marginTop:"10px"}}
          value={rate}
          onChange={(e) => {
    const value = e.target.value;
            const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setErrorMessage1("Value should be greater than 0")
              setRate("");
            } 
            else if (numValue > 0) {
              setRate(value);
              setErrorMessage1("")
            }
          }}
          
          />

{errorMessage1 &&(<h6 className="errorMessage">{errorMessage1}</h6>)}
          <TextField  
          type='number'
          label="Supplier Rate" 
          variant="outlined" 
          sx={{width:"500px", marginTop:"10px"}}
          value={offerrate}
          onChange={(e) => {

    const value = e.target.value;
            const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setErrorMessage2("Value should be greater than 0")
              setOfferate("");
            } 
            else if (numValue > 0) {
              setOfferate(value);
              setErrorMessage2("")
            }

    
          }}
          />
{errorMessage2 &&(<h6 className="errorMessage">{errorMessage2}</h6>)}
          <FormControl sx={{width:"500px", marginTop:"10px"}}>
          <InputLabel id="demo-simple-select-label" >Required Time</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="RequiredTimee"
              value={requiredtype}
              displayEmpty
              onChange={(e)=>{setRequiredtype(e.target.value)}}
              >
              <MenuItem value={"Required Instant"}>Required Instant</MenuItem>
              <MenuItem value={"Required after 2 days"}>Required after 2 days</MenuItem>
              <MenuItem value={"Required after week"}>Required after week</MenuItem>
              </Select>
          </FormControl>

          <FormControl sx={{width:"500px", marginTop:"10px"}}>
          <InputLabel id="demo-simple-select-label" >Type</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={croptype}
              onChange={(e)=>{setCroptype(e.target.value)}}
              >
              <MenuItem value={"Vegitable"}>Vegetable</MenuItem>
              <MenuItem value={"Fruits"}>Fruits</MenuItem>
              <MenuItem value={"Grain"}>Grain</MenuItem>
              <MenuItem value={"Daily Need"}>Daily Need</MenuItem>

              </Select>
          </FormControl>

          </div>

          <div className='cropsave'>
            <div className={!btnclick?'savecrop':'savecropdisable'} onClick={handleChange}>Save</div> 
          </div>
      </div>
        }
        
        
    </div>
  )
}

export default CropModel
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React,{useState} from 'react'
import "./EditCropCardstyle.scss"
import { useUserAuth } from "../../context/UserAuthContext";
import {useNavigate} from 'react-router'



const EditCropModel = ({open,onClose,data,id}) => {

  const[btnclick,setBtnclick] = useState(false)

  const[cropname,setCropname]=useState(data.name)
  const[image,setImage]=useState()
  const[quantity,setQuantity]=useState(data.quantity)
  const[rate,setRate]=useState(data.mrp)
  const[offerrate,setOfferate]=useState(data.offerPrice)
  const[requiredtype,setRequiredtype]=useState(data.requiredtime)
  const[croptype,setCroptype]=useState(data.croptype)
  const[errorMessage,setErrorMessage]=useState("")
  const[errorMessage1,setErrorMessage1]=useState("")
  const[errorMessage2,setErrorMessage2]=useState("")
  const[errorMessage4,setErrorMessage4]=useState("")





  const { addCropMarket,user,updateCropMarket,getCropMarket,updateFertilizerMarket } =useUserAuth();
  const navigate  = useNavigate()



  const handleChange = async() =>{
    if(cropname===""){
      setErrorMessage4("Please enter a cropname.")
    return;
    }
    setErrorMessage4("")
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

        const data={
          _id:id,
          name:cropname,
          quantity:quantity,
          mrp:rate,
          offerPrice:offerrate,
          requiredtime:requiredtype,
          croptype:croptype,
        };
        updateCropMarket(id,data);
        await getCropMarket();
    setCropname("")
    setImage(null)
    setQuantity("")
    setRate("")
    setOfferate("")
    setRequiredtype("")
    setCroptype("")
    setBtnclick(true)
    window.location.reload()
    // navigate("/cropmarket")
    onClose()
  }





    if(!open) return null
  return (
    <div onClick={onClose} className='editoverlay'>
        <div onClick={(e)=>{
            e.stopPropagation()
        }} className='editmodelcontainer'>
            <div className='btncover'>
            <p onClick={onClose} className="closebtn">X</p>
            </div>
            <div className='modelbody'> 
            <h2 className='heading-model-edit'>Edit Crop</h2>
            <TextField 
            label="Crop Name" 
            variant="outlined" 
            sx={{width:"500px",marginTop:"3px"
            }}
            value={cropname}
            onChange={(e)=>{setCropname(e.target.value)}}
            />
            {errorMessage4 &&(<h6 className="errorMessage">{errorMessage4}</h6>)}
            <TextField  
            label="Quantity" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={quantity}
            onChange={(e)=>{
              
                const value = e.target.value;
                const numValue = Number(value);
                if (value === "" || numValue === 0) {
                  setErrorMessage("Value should be greater than 0")
                  setQuantity("");
                } 
                else if (numValue > 0) {
                  setQuantity(value);
                  setErrorMessage("")
                }
              
            }}
            />
            {errorMessage &&(<h6 className="errorMessage">{errorMessage}</h6>)}
            <TextField  
            label="Market Rate" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={rate}
            onChange={(e)=>{const value = e.target.value;
              const numValue = Number(value);
              if (value === "" || numValue === 0) {
                setErrorMessage1("Value should be greater than 0")
                setRate("");
              } 
              else if (numValue > 0) {
                setRate(value);
                setErrorMessage1("")
              }}}
            />
            {errorMessage1 &&(<h6 className="errorMessage">{errorMessage1}</h6>)}
            <TextField  
            label="Supplier Rate" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={offerrate}
            onChange={(e)=>{ const value = e.target.value;
              const numValue = Number(value);
              if (value === "" || numValue === 0) {
                setErrorMessage2("Value should be greater than 0")
                setOfferate("");
              } 
              else if (numValue > 0) {
                setOfferate(value);
                setErrorMessage2("")
              }}}
            />
{errorMessage2 &&(<h6 className="errorMessage">{errorMessage2}</h6>)}
            <FormControl sx={{width:"500px", marginTop:"10px"}}>
            <InputLabel id="demo-simple-select-label" >Required Time</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="RequiredTimee"
                value={requiredtype}
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
                <MenuItem value={"Vegitable"}>Vegitable</MenuItem>
                <MenuItem value={"Fruits"}>Furutes</MenuItem>
                </Select>
            </FormControl>

            </div>

            <div className='cropsave'>
              <div className={!btnclick?'savecrop':'savecropdisable'} onClick={handleChange}>Update</div> 
            </div>
        </div>
        
    </div>
  )
}

export default EditCropModel
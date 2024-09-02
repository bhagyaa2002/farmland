import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React,{useState} from 'react'
import "./EditFertilizerCard.scss"
import { useUserAuth } from "../../context/UserAuthContext";
import {useNavigate} from 'react-router'



const EditFertilizerModel = ({open,onClose,data,id}) => {
    const[fertilizername,setFertilizername]=useState(data.name)
    const[fertilizerquantity,setFertilizerQuantity]=useState(data.quantity)
    const[fertilizerate,setFertilizerRate]=useState(data.mrp)
    const[fertilizerofferrate,setFertilizerOfferate]=useState(data.offerPrice)
    const[fertilizercat,setFertilizerCat]=useState(data.categori)
    const[fertilizertype,setFertilizertype]=useState(data.fertilizertype)
  const { addCropMarket,user,updateCropMarket,getCropMarket,updateFertilizerMarket,getFertilizerMarket } =useUserAuth();
  const navigate  = useNavigate()
  const[fertilizerErrorMessage,setFertilizerErrorMessage]=useState("")
  const[fertilizerErrorMessage1,setFertilizerErrorMessage1]=useState("")
  const[fertilizerErrorMessage2,setFertilizerErrorMessage2]=useState("")
  const[fertilizerErrorMessage4,setFertilizerErrorMessage4]=useState("")



  const handleChange = async() =>{
      console.log("line 22",id);
      if(fertilizername===""){
        setFertilizerErrorMessage4("Please enter a fertilizer name.")
      return;
      }
      setFertilizerErrorMessage4("")
      if(fertilizerquantity==""){
        setFertilizerErrorMessage("Please enter the value.")
        return;
      }
      setFertilizerErrorMessage("")
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
      
      
        const data={
          _id:id,
            name:fertilizername,
            quantity:fertilizerquantity,
            mrp:fertilizerate,
            offerPrice:fertilizerofferrate,
            categori:fertilizercat,
            fertilizertype:fertilizertype,
        };
        updateFertilizerMarket(id,data);
        await getFertilizerMarket();
        setFertilizername("")
        setFertilizerQuantity("")
        setFertilizerRate("")
        setFertilizerOfferate("")
        setFertilizerCat("")
        setFertilizertype("")
        window.location.reload()
        // navigate("/fertilizermarket")

        onClose()
  }





    if(!open) return null
  return (
    <div onClick={onClose} className='editoverlay'>
        <div onClick={(e)=>{
            e.stopPropagation()
        }} className='editmodelcontainer1'>
                        <div className='btncover'>
            <p onClick={onClose} className="closebtn">X</p>
            </div>
            <div className='modelbody'> 
            <h2 className='heading-model-edit'>Edit Fertilizer</h2>
            <TextField 
            label="Fertilizer Name" 
            variant="outlined" 
            sx={{width:"500px",}}
            value={fertilizername}
            onChange={(e)=>{setFertilizername(e.target.value)}}
            />
            {fertilizerErrorMessage4 &&(<h6 className="errorMessage">{fertilizerErrorMessage4}</h6>)}
            <TextField  
            label="Quantity per bag" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerquantity}
            onChange={(e)=>{const value = e.target.value;
              const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setFertilizerErrorMessage("Value should be greater than 0")
              setFertilizerQuantity("");
            } 
            else if (numValue > 0) {
              setFertilizerQuantity(value);
              setFertilizerErrorMessage("");
            }}}
            />
            {fertilizerErrorMessage &&(<h6 className="errorMessage">{fertilizerErrorMessage}</h6>)}
            <TextField  
            label="Market Rate of Fertilizer" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerate}
            onChange={(e)=>{const value = e.target.value;
              const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setFertilizerErrorMessage1("Value should be greater than 0")
              setFertilizerRate("");
            } 
            else if (numValue > 0) {
              setFertilizerRate(value);
              setFertilizerErrorMessage1("");
            }}}
            />
            {fertilizerErrorMessage1 &&(<h6 className="errorMessage">{fertilizerErrorMessage1}</h6>)}
            <TextField  
            label="offer Rate" 
            variant="outlined" 
            sx={{width:"500px", marginTop:"10px"}}
            value={fertilizerofferrate}
            onChange={(e)=>{const value = e.target.value;
              const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setFertilizerErrorMessage2("Value should be greater than 0")
              setFertilizerOfferate("");
            } 
            else if (numValue > 0) {
              setFertilizerOfferate(value);
              setFertilizerErrorMessage2("");
            }}}
            />
            {fertilizerErrorMessage2 &&(<h6 className="errorMessage">{fertilizerErrorMessage2}</h6>)}
            <FormControl sx={{width:"500px", marginTop:"10px"}}>
            <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={fertilizercat}
                onChange={(e)=>{setFertilizerCat(e.target.value)}}
                >
                <MenuItem value={"Fertilizer"}>Fertilizere</MenuItem>
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
                <MenuItem value={"Organic"}>Organic</MenuItem>
                <MenuItem value={"Chemical"}>Chemical</MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                <MenuItem value={"With subsidy"}>With subsidy</MenuItem>
                <MenuItem value={"Without subsidy"}>Without subsidy</MenuItem>

                </Select>
            </FormControl>

            </div>

            <div className='cropsave'>
              <div className='savecrop' onClick={handleChange}>Update</div> 
            </div>
        </div>
        
    </div>
  )
}

export default EditFertilizerModel
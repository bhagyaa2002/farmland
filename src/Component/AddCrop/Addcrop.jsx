import React, { useState } from 'react';
import { useUserAuth } from "../../context/UserAuthContext";
import Nav from '../nav/Nav';
import "./Addcrop.scss";

const Addcrop = () => {
  const { addPendingCrop } = useUserAuth();
  const [cropname, setCropname] = useState("")

  const [soiltype, setSoiltype] = useState("")
  const [cropirr, setCropirr] = useState("")
  const [croptemp, setCroptemp] = useState("")
  const [croploc, setCroploc] = useState("")

  const [cropdec, setCropdec] = useState("")

  const [cropsub1, setCropsub1] = useState("")
  const [cropsub2, setCropsub2] = useState("")
  const [cropsub3, setCropsub3] = useState("")
  const [cropsub4, setCropsub4] = useState("")

  const [cropvar1, setCropvar1] = useState("")
  const [cropvar2, setCropvar2] = useState("")
  const [cropvar3, setCropvar3] = useState("")
  const [cropvar4, setCropvar4] = useState("")
  const [Imageurl, setimage] = useState("")
  const [bannerImageurl, setBannerImageurl] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("");
  const [isCheckedKerala, setIsCheckedKerala] = useState(false);
  const [isCheckedKarnataka, setIsCheckedKarnataka] = useState(false);
  const [isCheckedTamilnadu, setIsCheckedTamilnadu] = useState(false);
  const [isCheckedAndrapradesh, setIsCheckedAndrapradesh] = useState(false);

  const categories = ["Horticulture", "Long Term Crop", "Short Term Crop", "Sericulture"];

  const handleCheckboxChangeKerala = (event) => {
    setIsCheckedKerala(event.target.checked);
  };
  const handleCheckboxChangeKarnataka = (event) => {
    setIsCheckedKarnataka(event.target.checked);
  };
  const handleCheckboxChangeTamilnadu = (event) => {
    setIsCheckedTamilnadu(event.target.checked);
  };
  const handleCheckboxChangeAndrapradesh = (event) => {
    setIsCheckedAndrapradesh(event.target.checked);
  };


  const [organicFerilizer, setOrganicFerilizer] = useState([{ name: "", description: "" }]);

  const handleAddOrganicFerilizer = () => {
    setOrganicFerilizer([...organicFerilizer, { name: "", description: "" }]);
  };

  const handleRemoveOrganicFerilizer = (index) => {
    setOrganicFerilizer(organicFerilizer.filter((_, i) => i !== index));
  };

  const handleOrganicFerilizerChange = (index, field, value) => {
    const newOrganic = [...organicFerilizer];
    newOrganic[index][field] = value;
    setOrganicFerilizer(newOrganic);
  };

  const getFormattedOrganicFerilizer = () => {
    return organicFerilizer.map(organic => ({ [organic.name]: organic.description }));
  };



  const [chemicalFerilizer, setChemicalFerilizer] = useState([{ name: "", description: "" }]);

  const handleAddChemicalFerilizer = () => {
    setChemicalFerilizer([...chemicalFerilizer, { name: "", description: "" }]);
  };

  const handleRemoveChemicalFerilizer = (index) => {
    setChemicalFerilizer(chemicalFerilizer.filter((_, i) => i !== index));
  };

  const handleChemicalFerilizerChange = (index, field, value) => {
    const newChemical = [...chemicalFerilizer];
    newChemical[index][field] = value;
    setChemicalFerilizer(newChemical);
  };

  const getFormattedChemicalFerilizer = () => {
    return chemicalFerilizer.map(chemical => ({ [chemical.name]: chemical.description }));
  };

  const [diseases, setDiseases] = useState([{ name: "", description: "" }]);

  const handleAddDisease = () => {
    setDiseases([...diseases, { name: "", description: "" }]);
  };

  const handleRemoveDisease = (index) => {
    setDiseases(diseases.filter((_, i) => i !== index));
  };

  const handleDiseaseChange = (index, field, value) => {
    const newDiseases = [...diseases];
    newDiseases[index][field] = value;
    setDiseases(newDiseases);
  };

  const getFormattedDiseases = () => {
    return diseases.map(disease => ({ [disease.name]: disease.description }));
  };




  const [harvesting, setHarvesting] = useState([""]);

  const handleAddHarvesting = () => {
    setHarvesting([...harvesting, ""]);
  };

  const handleRemoveHarvesting = (index) => {
    setHarvesting(harvesting.filter((_, i) => i !== index));
  };

  const handleHarvestingChange = (index, value) => {
    const newLinks = [...harvesting];
    newLinks[index] = value;
    setHarvesting(newLinks);
  };

  const [seeding, setSeeding] = useState([""]);

  const handleAddSeeding = () => {
    setSeeding([...seeding, ""]);
  };

  const handleRemoveSeeding = (index) => {
    setSeeding(seeding.filter((_, i) => i !== index));
  };

  const handleSeedingChange = (index, value) => {
    const newLinks = [...seeding];
    newLinks[index] = value;
    setSeeding(newLinks);
  };



  const [soilPreparation, setSoilPreparation] = useState([""]);

  const handleAddSoilPreparation = () => {
    setSoilPreparation([...soilPreparation, ""]);
  };

  const handleRemoveSoilPreparation = (index) => {
    setSoilPreparation(soilPreparation.filter((_, i) => i !== index));
  };

  const handleSoilPreparationChange = (index, value) => {
    const newLinks = [...soilPreparation];
    newLinks[index] = value;
    setSoilPreparation(newLinks);
  };

  const [waterManagement, setWaterManagement] = useState([""]);

  const handleAddWaterManagement = () => {
    setWaterManagement([...waterManagement, ""]);
  };

  const handleRemoveWaterManagement = (index) => {
    setWaterManagement(waterManagement.filter((_, i) => i !== index));
  };

  const handleWaterManagementChange = (index, value) => {
    const newLinks = [...waterManagement];
    newLinks[index] = value;
    setWaterManagement(newLinks);
  };

  const [youtubeLinks, setYoutubeLinks] = useState([""]);

  const handleAddLink = () => {
    setYoutubeLinks([...youtubeLinks, ""]);
  };

  const handleRemoveLink = (index) => {
    setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...youtubeLinks];
    newLinks[index] = value;
    setYoutubeLinks(newLinks);
  };
  const[errorMessage,setErrorMessage]=useState("")
  const[errorMessage1,setErrorMessage1]=useState("")



  const handelchange = async () => {
    let states = [];
    if (isCheckedKerala) {
      states.push("Kerala")
    }
    if (isCheckedKarnataka) {
      states.push("Karnataka")
    }
    if (isCheckedTamilnadu) {
      states.push("Tamilnadu")
    }
    if (isCheckedAndrapradesh) {
      states.push("Andra Pradesh")
    }
    console.log("line 201",getFormattedDiseases);
    

    const data = {
      cropname: cropname,
      soiltype: soiltype,
      irrigation: cropirr,
      temperature: croptemp,
      cropImageUrl: Imageurl,
      subcrops: [cropsub1, cropsub2, cropsub3, cropsub4],
      description: cropdec,
      location: croploc,
      variety: [cropvar1, cropvar2, cropvar3, cropvar4],
      category: category,
      state: states,
      bannerImageUrl: [bannerImageurl],
      price: price,
      organicFertilizer:getFormattedOrganicFerilizer(),
      chemicalFertilizer:getFormattedChemicalFerilizer(),
      disease: getFormattedDiseases(),
      harvesting: harvesting,
      seeding: seeding,
      soilPreparation: soilPreparation,
      waterManagement: waterManagement,
      youtubeLinks: youtubeLinks


    }
    console.log("line 48", data);
    await addPendingCrop(data);
  }

  return (
    <div className='addcontanier'>
      <Nav />
      <h1>CrowdSourcing</h1>
      <div className='textinputwithHeading'>
        <span className='textinputCropName'>Crop Name</span>
        <div className='textinput'>
          <input type="text" style={{ width: "700px", height: "10px" }} value={cropname} onChange={(e) => setCropname(e.target.value)} />
        </div>
      </div>
      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>Soil Type</span>
          <input type="text" style={{ width: "300px" }} value={soiltype} onChange={(e) => setSoiltype(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>Irrigation Type</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={cropirr} onChange={(e) => setCropirr(e.target.value)} />
        </div>
      </div>
      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>Temprature Required(°C)</span>
          <input type="number" style={{ width: "300px" }} value={croptemp} onChange={(e) =>{
            const value = e.target.value;
            const numValue = Number(value);
            if (value === "" || numValue === 0) {
              setErrorMessage("Value should be greater than 0 and less than 100")
              setCroptemp("");
            } 
            else if (numValue > 0 && numValue<100) {
              setCroptemp(value);
              setErrorMessage("")
            }
          }} />
        </div>
        
        <div className='textinputwithHeading'>
          <span className='textinputRight'>Location</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={croploc} onChange={(e) => setCroploc(e.target.value)} />
        </div>
      </div>
      {errorMessage &&(<h6 className="errorMessageTemp">{errorMessage}</h6>)}
      

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Crop Description</span>
          <textarea type="text" style={{ width: "700px", fontSize: "16px", padding: "20px" }} rows="4" value={cropdec} onChange={(e) => setCropdec(e.target.value)} />
        </div>
      </div>
      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>SubCrops Recommendation 1</span>
          <input type="text" style={{ width: "300px" }} value={cropsub1} onChange={(e) => setCropsub1(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>SubCrops Recommendation 2</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={cropsub2} onChange={(e) => setCropsub2(e.target.value)} />
        </div>
      </div>
      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>SubCrops Recommendation 3</span>
          <input type="text" style={{ width: "300px" }} value={cropsub3} onChange={(e) => setCropsub3(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>SubCrops Recommendation 4</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={cropsub4} onChange={(e) => setCropsub4(e.target.value)} />
        </div>
      </div>

      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>Varieties 1</span>
          <input type="text" style={{ width: "300px" }} value={cropvar1} onChange={(e) => setCropvar1(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>Varieties 2</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={cropvar2} onChange={(e) => setCropvar2(e.target.value)} />
        </div>
      </div>
      <div className='multiinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft'>Varieties 3</span>
          <input type="text" style={{ width: "300px" }} value={cropvar3} onChange={(e) => setCropvar3(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>Varieties 4</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={cropvar4} onChange={(e) => setCropvar4(e.target.value)} />
        </div>
      </div>
      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Crop Image Url</span>
          <input type="text" style={{ width: "700px" }} value={Imageurl} onChange={(e) => setimage(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Banner Image Url</span>
          <input type="text" style={{ width: "700px" }} value={bannerImageurl} onChange={(e) => setBannerImageurl(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Category</span>
          <select style={{ width: "300px", height: "43px" }} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputPrice'>Price</span>
          <input type="number" style={{ width: "300px", marginLeft: "100px" }} value={price} onChange={(e) => {
             const value = e.target.value;
             const numValue = Number(value);
             if (value === "" || numValue === 0) {
               setErrorMessage1("Value should be greater than 0.")
               setPrice("");
             } 
             else if (numValue > 0 ) {
              setPrice(value);
               setErrorMessage1("")
             }
             }} />
        </div>
        
      </div>
      {errorMessage1 &&(<h6 className="errorMessagePrice">{errorMessage1}</h6>)}
      <span className='textinputCheckbox'>Crop growing states</span>
      <div className='checkbox'>
        <input type="checkbox" checked={isCheckedKerala} onChange={handleCheckboxChangeKerala} />
        <span className='checkboxText'>Kerala</span>
        <input type="checkbox" checked={isCheckedKarnataka} onChange={handleCheckboxChangeKarnataka} />
        <span className='checkboxText'>Karnataka</span>
        <input type="checkbox" checked={isCheckedTamilnadu} onChange={handleCheckboxChangeTamilnadu} />
        <span className='checkboxText'>Tamilnadu</span>
        <input type="checkbox" checked={isCheckedAndrapradesh} onChange={handleCheckboxChangeAndrapradesh} />
        <span className='checkboxText'>Andra Pradesh</span>
      </div>

      



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Organic Fertilizer</span>
          {organicFerilizer.map((organic, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <div className='multiinput'>
                    <div className='textinputwithHeading'>
                      <span className='textinputLeftTimeframe'>Timeframe</span>
                      <input type="text" placeholder='eg: 0-10days' style={{ width: "140px" }} value={organic.name} onChange={(e) => handleOrganicFerilizerChange(index, 'name', e.target.value)} />
                    </div>
                    <div className='textinputwithHeading'>
                      <span className='textinputRightForFertilizer'>Description</span>
                      <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={organic.description} onChange={(e) => handleOrganicFerilizerChange(index, 'description', e.target.value)} />
                    </div>
                  </div>


                </>
                <div className="youtubeButtonadd">
                  {index === organicFerilizer.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddOrganicFerilizer}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== organicFerilizer.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveOrganicFerilizer(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === organicFerilizer.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveOrganicFerilizer(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
     





    
      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Chemical Fertilizer</span>
          {chemicalFerilizer.map((chemical, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <div className='multiinput'>
                    <div className='textinputwithHeading'>
                      <span className='textinputLeftTimeframe'>Timeframe</span>
                      <input type="text" placeholder='eg: 0-10days' style={{ width: "140px" }} value={chemical.name} onChange={(e) => handleChemicalFerilizerChange(index, 'name', e.target.value)} />
                    </div>
                    <div className='textinputwithHeading'>
                      <span className='textinputRightForFertilizer'>Description</span>
                      <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={chemical.description} onChange={(e) => handleChemicalFerilizerChange(index, 'description', e.target.value)} />
                    </div>
                  </div>


                </>
                <div className="youtubeButtonadd">
                  {index === chemicalFerilizer.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddChemicalFerilizer}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== chemicalFerilizer.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveChemicalFerilizer(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === chemicalFerilizer.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveChemicalFerilizer(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Diseases</span>
          {diseases.map((disease, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Disease {index + 1}</span>
                  <div className='multiinput'>
                    <div className='textinputwithHeading'>
                      <span className='textinputLeftTimeframe'>Name</span>
                      <input type="text" style={{ width: "140px" }} value={disease.name} onChange={(e) => handleDiseaseChange(index, 'name', e.target.value)} />
                    </div>
                    <div className='textinputwithHeading'>
                      <span className='textinputRightForFertilizer'>Description</span>
                      <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={disease.description} onChange={(e) => handleDiseaseChange(index, 'description', e.target.value)} />
                    </div>
                  </div>


                </>
                <div className="youtubeButtonadd">
                  {index === diseases.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddDisease}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== diseases.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveDisease(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === diseases.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveDisease(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Harvesting</span>
          {harvesting.map((link, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <input
                    type="text"
                    style={{ width: "700px" }}
                    value={link}
                    onChange={(e) => handleHarvestingChange(index, e.target.value)}
                  />
                </>
                <div className="youtubeButtonadd">
                  {index === harvesting.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddHarvesting}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== harvesting.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveHarvesting(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === harvesting.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveHarvesting(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Seeding</span>
          {seeding.map((link, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <input
                    type="text"
                    style={{ width: "700px" }}
                    value={link}
                    onChange={(e) => handleSeedingChange(index, e.target.value)}
                  />
                </>
                <div className="youtubeButtonadd">
                  {index === seeding.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddSeeding}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== seeding.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveSeeding(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === seeding.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveSeeding(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Soil Preparation</span>
          {soilPreparation.map((link, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <input
                    type="text"
                    style={{ width: "700px" }}
                    value={link}
                    onChange={(e) => handleSoilPreparationChange(index, e.target.value)}
                  />
                </>
                <div className="youtubeButtonadd">
                  {index === soilPreparation.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddSoilPreparation}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== soilPreparation.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveSoilPreparation(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === soilPreparation.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveSoilPreparation(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Water Management</span>
          {waterManagement.map((link, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>Step {index + 1}</span>
                  <input
                    type="text"
                    style={{ width: "700px" }}
                    value={link}
                    onChange={(e) => handleWaterManagementChange(index, e.target.value)}
                  />
                </>
                <div className="youtubeButtonadd">
                  {index === waterManagement.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddWaterManagement}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== waterManagement.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveWaterManagement(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === waterManagement.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveWaterManagement(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Youtube Links</span>
          {youtubeLinks.map((link, index) => (
            <div key={index} className='textinput'>
              <div className='textinputwithHeading'>
                <>
                  <span className='textinputLeftTimeframe1'>YouTube Link {index + 1}</span>
                  <input
                    type="text"
                    style={{ width: "700px" }}
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                </>
                <div className="youtubeButtonadd">
                  {index === youtubeLinks.length - 1 && (
                    <div >
                      <button className='addButton' onClick={handleAddLink}>Add</button>
                    </div>
                  )}
                  {index > 0 && index !== youtubeLinks.length - 1 && (
                    <div >
                      <button className="removeButton1" onClick={() => handleRemoveLink(index)}>Remove</button>
                    </div>
                  )}
                  {index > 0 && index === youtubeLinks.length - 1 && (
                    <div>
                      <button className="removeButton" onClick={() => handleRemoveLink(index)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button className="addButton" onClick={handleAddLink}>Add</button> */}


      <div className='submitbtn' onClick={() => handelchange()}>
        <h4>Submit</h4>

      </div>

    </div>
  )
}

export default Addcrop
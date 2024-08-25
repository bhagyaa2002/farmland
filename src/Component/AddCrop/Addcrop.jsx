import React, { useState } from 'react'
import "./Addcrop.scss"
import TextField from '@mui/material/TextField';
import Nav from '../nav/Nav';
import { useUserAuth } from "../../context/UserAuthContext";
import e from 'cors';

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
  const [timeFrameOrg1, setTimeFrameOrg1] = useState("")
  const [timeFrameOrg2, setTimeFrameOrg2] = useState("")
  const [timeFrameOrg3, setTimeFrameOrg3] = useState("")
  const [timeFrameOrg4, setTimeFrameOrg4] = useState("")
  const [descriptionOrg1, setDescriptionOrg1] = useState("")
  const [descriptionOrg2, setDescriptionOrg2] = useState("")
  const [descriptionOrg3, setDescriptionOrg3] = useState("")
  const [descriptionOrg4, setDescriptionOrg4] = useState("")

  const [timeFrameChe1, setTimeFrameChe1] = useState("")
  const [timeFrameChe2, setTimeFrameChe2] = useState("")
  const [timeFrameChe3, setTimeFrameChe3] = useState("")
  const [timeFrameChe4, setTimeFrameChe4] = useState("")
  const [descriptionChe1, setDescriptionChe1] = useState("")
  const [descriptionChe2, setDescriptionChe2] = useState("")
  const [descriptionChe3, setDescriptionChe3] = useState("")
  const [descriptionChe4, setDescriptionChe4] = useState("")

  const [disease1, setDisease1] = useState("")
  const [diseaseDescription1, setDiseaseDescription1] = useState("")
  const [disease2, setDisease2] = useState("")
  const [diseaseDescription2, setDiseaseDescription2] = useState("")

  const [harvesting1, setHarvesting1] = useState("")
  const [harvesting2, setHarvesting2] = useState("")
  const [harvesting3, setHarvesting3] = useState("")

  const [seeding1, setSeeding1] = useState("")
  const [seeding2, setSeeding2] = useState("")
  const [seeding3, setSeeding3] = useState("")

  const [soilPreparation1, setSoilPreparation1] = useState("")
  const [soilPreparation2, setSoilPreparation2] = useState("")
  const [soilPreparation3, setSoilPreparation3] = useState("")

  const [waterManagement1, setWaterManagement1] = useState("")
  const [waterManagement2, setWaterManagement2] = useState("")
  const [waterManagement3, setWaterManagement3] = useState("")

  const [youtubeLink1, setyoutubeLink1] = useState("")
  const [youtubeLink2, setyoutubeLink2] = useState("")
  const [youtubeLink3, setyoutubeLink3] = useState("")

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
      organicFertilizer: [{ [timeFrameOrg1]: descriptionOrg1 }, { [timeFrameOrg2]: descriptionOrg2 }, { [timeFrameOrg3]: descriptionOrg3 }, { [timeFrameOrg4]: descriptionOrg4 }],
      chemicalFertilizer: [{ [timeFrameChe1]: descriptionChe1 }, { [timeFrameChe2]: descriptionChe2 }, { [timeFrameChe3]: descriptionChe3 }, { [timeFrameChe4]: descriptionChe4 }],
      disease: [{ [disease1]: diseaseDescription1 }, { [disease2]: diseaseDescription2 }],
      harvesting: [harvesting1, harvesting2, harvesting3],
      seeding: [seeding1, seeding2, seeding3],
      soilPreparation: [soilPreparation1, soilPreparation2, soilPreparation3],
      waterManagement: [waterManagement1, waterManagement2, waterManagement3],
      youtubeLinks: [youtubeLink1, youtubeLink2, youtubeLink3],
      you: youtubeLinks


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
          <span className='textinputLeft'>Temprature Required</span>
          <input type="text" style={{ width: "300px" }} value={croptemp} onChange={(e) => setCroptemp(e.target.value)} />
        </div>
        <div className='textinputwithHeading'>
          <span className='textinputRight'>Location</span>
          <input type="text" style={{ width: "300px", marginLeft: "100px" }} value={croploc} onChange={(e) => setCroploc(e.target.value)} />
        </div>
      </div>
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
          <input type="number" style={{ width: "300px", marginLeft: "100px" }} value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      </div>

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

      <div className='textinputwithHeading'>
        <span className='textforFertilizer'>Organic Fertilizer</span>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 1</span>
            <input type="text" placeholder='eg: 0-10days' style={{ width: "140px" }} value={timeFrameOrg1} onChange={(e) => setTimeFrameOrg1(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionOrg1} onChange={(e) => setDescriptionOrg1(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 2</span>
            <input type="text" placeholder='eg: 20-33days' style={{ width: "140px" }} value={timeFrameOrg2} onChange={(e) => setTimeFrameOrg2(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionOrg2} onChange={(e) => setDescriptionOrg2(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 3</span>
            <input type="text" placeholder='eg: 50-60days' style={{ width: "140px" }} value={timeFrameOrg3} onChange={(e) => setTimeFrameOrg3(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionOrg3} onChange={(e) => setDescriptionOrg3(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 4</span>
            <input type="text" placeholder='eg: 65-80days' style={{ width: "140px" }} value={timeFrameOrg4} onChange={(e) => setTimeFrameOrg4(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionOrg4} onChange={(e) => setDescriptionOrg4(e.target.value)} />
          </div>
        </div>
      </div>



      <div className='textinputwithHeading'>
        <span className='textforFertilizer'>Chemical Fertilizer</span>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 1</span>
            <input type="text" placeholder='eg: 0-10days' style={{ width: "140px" }} value={timeFrameChe1} onChange={(e) => setTimeFrameChe1(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionChe1} onChange={(e) => setDescriptionChe1(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 2</span>
            <input type="text" placeholder='eg: 20-33days' style={{ width: "140px" }} value={timeFrameChe2} onChange={(e) => setTimeFrameChe2(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionChe2} onChange={(e) => setDescriptionChe2(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 3</span>
            <input type="text" placeholder='eg: 50-60days' style={{ width: "140px" }} value={timeFrameChe3} onChange={(e) => setTimeFrameChe3(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionChe3} onChange={(e) => setDescriptionChe3(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Time Frame 4</span>
            <input type="text" placeholder='eg: 65-80days' style={{ width: "140px" }} value={timeFrameChe4} onChange={(e) => setTimeFrameChe4(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={descriptionChe4} onChange={(e) => setDescriptionChe4(e.target.value)} />
          </div>
        </div>
      </div>


      <div className='textinputwithHeading'>
        <span className='textforFertilizer'>Disease</span>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Disease Name 1</span>
            <input type="text" style={{ width: "140px" }} value={disease1} onChange={(e) => setDisease1(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={diseaseDescription1} onChange={(e) => setDiseaseDescription1(e.target.value)} />
          </div>
        </div>
        <div className='multiinput'>
          <div className='textinputwithHeading'>
            <span className='textinputLeftTimeframe'>Disease Name 2</span>
            <input type="text" style={{ width: "140px" }} value={disease2} onChange={(e) => setDisease2(e.target.value)} />
          </div>
          <div className='textinputwithHeading'>
            <span className='textinputRightForFertilizer'>Description</span>
            <input type="text" style={{ width: "510px", marginLeft: "50px" }} value={diseaseDescription2} onChange={(e) => setDiseaseDescription2(e.target.value)} />
          </div>
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Harvesting</span>
          <span className='textinputLeftTimeframe'>Steps</span>
          <input type="text" style={{ width: "700px" }} value={harvesting1} onChange={(e) => setHarvesting1(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={harvesting2} onChange={(e) => setHarvesting2(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={harvesting3} onChange={(e) => setHarvesting3(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Seeding</span>
          <span className='textinputLeftTimeframe'>Steps</span>
          <input type="text" style={{ width: "700px" }} value={seeding1} onChange={(e) => setSeeding1(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={seeding2} onChange={(e) => setSeeding2(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={seeding3} onChange={(e) => setSeeding3(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Soil Preparation</span>
          <span className='textinputLeftTimeframe'>Steps</span>
          <input type="text" style={{ width: "700px" }} value={soilPreparation1} onChange={(e) => setSoilPreparation1(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={soilPreparation2} onChange={(e) => setSoilPreparation2(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={soilPreparation3} onChange={(e) => setSoilPreparation3(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Water Management</span>
          <span className='textinputLeftTimeframe'>Steps</span>
          <input type="text" style={{ width: "700px" }} value={waterManagement1} onChange={(e) => setWaterManagement1(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={waterManagement2} onChange={(e) => setWaterManagement2(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={waterManagement3} onChange={(e) => setWaterManagement3(e.target.value)} />
        </div>
      </div>

      <div className='textinput'>
        <div className='textinputwithHeading'>
          <span className='textinputLeft1'>Youtube Links</span>
          <span className='textinputLeftTimeframe'>Links</span>
          <input type="text" style={{ width: "700px" }} value={youtubeLink1} onChange={(e) => setyoutubeLink1(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={youtubeLink2} onChange={(e) => setyoutubeLink2(e.target.value)} />
          <input type="text" style={{ width: "700px", marginTop: "10px" }} value={youtubeLink3} onChange={(e) => setyoutubeLink3(e.target.value)} />
        </div>
      </div>

      {youtubeLinks.map((link, index) => (
        <div key={index} className='textinput'>
          <div className='textinputwithHeading'>
            <>
            <span className='textinputLeft1'>YouTube Link {index + 1}</span>
            <input
              type="text"
              style={{ width: "700px" }}
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
            </>
            {/* <div className="youtubeButtonadd"> */}
              {index > 0 && (
                <button className="removeButton" onClick={() => handleRemoveLink(index)}>Remove</button>
              )}
              {index === youtubeLinks.length - 1 && (
                <button className="addButton" onClick={handleAddLink}>Add</button>
              )}
            {/* </div> */}

          </div>
        </div>
      ))}
      {/* <button className="addButton" onClick={handleAddLink}>Add</button> */}


      <div className='submitbtn' onClick={() => handelchange()}>
        <h4>Submit</h4>

      </div>

    </div>
  )
}

export default Addcrop
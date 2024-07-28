import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import crop_banner_1 from '../../assets/image/NPK.jpg'
import crop_banner_2 from '../../assets/image/pumpkin.avif'
import crop_banner_3 from '../../assets/image/killer.png'
import crop_banner_5 from '../../assets/image/organic.jpg'
import "./Carousel.scss"


const CarouselList = ({type}) => {
  return (
    <Carousel showArrows={false} autoPlay showStatus={false}  showThumbs={false} infiniteLoop>
       
                <div>
                <img src={crop_banner_1} alt="" />
                <div className="insidedivcrop">
                <h1 style={{marginTop:"50px",color:"white", fontSize:"48px",fontWeight:"700",fontStyle:"normal",fontFamily:'Montserrat'}}>Fact Organic</h1>
                <h1 style={{marginTop:"20px",color:"white", fontSize:"48px",fontWeight:"800",fontStyle:"normal",fontFamily:'Montserrat'}}>₹ <span style={{color:"#F9D923"}}>29</span>/ Kg</h1>

                </div>
    
            </div>
    
    
          <div>
       <img src={crop_banner_2} alt="" />
       <div className="insidedivcrop" style={{width:"450px"}}>
       <h1 style={{marginTop:"50px",color:"white", fontSize:"48px",fontWeight:"700",fontStyle:"normal",fontFamily:'Montserrat',marginLeft:"25px"}}>Pumpkin Seed</h1>
       <h1 style={{marginTop:"20px",color:"white", fontSize:"48px",fontWeight:"800",fontStyle:"normal",fontFamily:'Montserrat'}}>₹ <span style={{color:"#F9D923"}}>259</span>/ Kg</h1>

       </div>

   </div>

    <div>
       <img src={crop_banner_3} alt="" />
       <div className="insidedivcrop" style={{width:"450px"}}>
        <h1 style={{marginTop:"50px",color:"white", fontSize:"48px",fontWeight:"700",fontStyle:"normal",fontFamily:'Montserrat',marginLeft:"25px"}}>Animeal</h1>
        <h1 style={{marginTop:"20px",color:"white", fontSize:"48px",fontWeight:"800",fontStyle:"normal",fontFamily:'Montserrat'}}>₹ <span style={{color:"#F9D923"}}>1100</span>/ Bag</h1>
       </div>

   </div>


<div>
<img src={crop_banner_5} alt="" />
<div className="insidedivcrop" style={{width:"400px"}}>
 <h1 style={{marginTop:"50px",color:"white", fontSize:"48px",fontWeight:"700",fontStyle:"normal",fontFamily:'Montserrat',marginLeft:"25px"}}>Pumpkin Seed</h1>
 <h1 style={{marginTop:"20px",color:"white", fontSize:"48px",fontWeight:"800",fontStyle:"normal",fontFamily:'Montserrat'}}>₹ <span style={{color:"#F9D923"}}>319</span>/ Kg</h1>
</div>

</div>



    
    </Carousel>
  )
}

export default CarouselList
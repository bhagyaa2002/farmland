import { Icon } from "@iconify/react";
import { Avatar } from "@mui/material";
import corn from "../../assets/image/corn.png";
import "./Fertilizercardstyle.scss";
import React, { useState } from "react";
import BuyFertilizer from "../BuyFertilizer/BuyFertilizer";

const Fertilizercard = ({ id, data, categori, type }) => {
  const [open, setOpen] = useState(false);

  if (data.categori != categori || data.fertilizertype != type) return null;

  const mrp = data.mrp;
  const offer = data.offerPrice;

  if (data.NoOfItemsAvailable < 1) {
    return (
      <>
        <div className="cardmain"  style={{ opacity: 0.6  ,position: 'relative'}}>
          <div>
          <div className="cardimg">
            <img src={data.url} alt="" style={{}} />
          </div>

          <div className="cardheadding">
            <h1 style={{ height: "50px" }}>{data.name}</h1>
            <h1>{data.quantity}</h1>
          </div>

          <div className="price">
            <Icon icon="bx:rupee" width="20" height="20" color="#0CA136" />
            <h3 style={{ color: "#0CA136", marginLeft: "4px" }}>
              {data.offerPrice}
            </h3>
            <h3>/Item</h3>
            <h3
              style={{
                textDecoration: "line-through",
                marginLeft: "8px",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              ({data.mrp})
            </h3>
            <Icon
              icon="bi:arrow-down"
              width="18"
              height="18"
              color="red"
              style={{ marginLeft: "16px" }}
            />
            <h3 style={{ color: "red", marginLeft: "4px" }}>
              -{Math.round((mrp / offer) * 100 - 100).toFixed(2)}%
            </h3>
          </div>
          <div style={{ position: "absolute", top: "223px", left: "100px", backgroundColor: "#ff0000", color: "white", padding: "8px 16px", borderRadius: "4px" ,opacity:1 }}>
          Out of Stock
        </div>
          
        </div>
        </div>
        
      </>
    );
  }

  return (
    <>
      <div className="cardmain">
        <div className="cardimg">
          <img src={data.url} alt="" />
        </div>

        <div className="cardheadding">
          <h1 style={{ height: "50px" }}>{data.name}</h1>
          <h1>{data.quantity}</h1>
        </div>

        <div className="price">
          <Icon icon="bx:rupee" width="20" height="20" color="#0CA136" />
          <h3 style={{ color: "#0CA136", marginLeft: "4px" }}>
            {data.offerPrice}
          </h3>
          <h3>/Item</h3>
          <h3
            style={{
              textDecoration: "line-through",
              marginLeft: "8px",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            ({data.mrp})
          </h3>
          <Icon
            icon="bi:arrow-down"
            width="18"
            height="18"
            color="red"
            style={{ marginLeft: "16px" }}
          />
          <h3 style={{ color: "red", marginLeft: "4px" }}>
            -{Math.round((mrp / offer) * 100 - 100).toFixed(2)}%
          </h3>
        </div>

        <div className="cardbutton" style={{ marginTop: "30px" }}>
          <div className="btnrightfertilizer" onClick={() => setOpen(true)}>
            <h4>Add To Cart</h4>
          </div>
        </div>
      </div>
      <BuyFertilizer
        id={id}
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
  );
};

export default Fertilizercard;

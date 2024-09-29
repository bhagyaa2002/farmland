import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import './CartProduct.scss'; // Import the SCSS file

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  

  return (
    <div className="cart-product">
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-header">
          <h3 className="product-name">{name}</h3>
          <div
            className="delete-icon"
            
          >
            <AiFillDelete />
          </div>
        </div>
        <p className="product-category">{category}</p>
        <p className="product-price">
          <span className="currency">₹</span>
          <span>{price}</span>
        </p>
        <div className="product-footer">
          <div className="quantity-controls">
            <button
            
              className="quantity-btn"
            >
              <TbMinus />
            </button>
            <p className="quantity">{qty}</p>
            <button
            
              className="quantity-btn"
            >
              <TbPlus />
            </button>
          </div>
          <div className="total-price">
            <p>Total :</p>
            <p>
              <span className="currency">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

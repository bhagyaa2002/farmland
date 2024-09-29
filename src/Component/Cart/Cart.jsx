// import "./Cart.scss"
// import React, { useState, useEffect } from 'react';
// import Nav from "../nav/Nav";
// import Footer from "../Footer/Footer";
// import CartProduct from "../CartProduct/CartProduct";
// import axios from 'axios';
// import { useUserAuth } from "../../context/UserAuthContext";
// const Cart = () => {
//     const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useUserAuth();

//   // Fetch cart data from the API
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const transaction ={
//             "email":user.email
//         }
//         const url = 'http://localhost:8080/fetchCartByUser';
//         const response = await axios.post(url, transaction); // Replace with your API URL
//         const data = response.data.data
//         setCartItems(data); // Assuming the API returns { items: [...] }
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch cart data.');
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.Quantity, 0);

//   if (loading) {
//     return <p>Loading cart...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (<>
//     <Nav/>
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       <div className="cart-content">
//         <div className="cart-items">
//           {cartItems.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cartItems.map(item => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.url} alt={item.cropName} className="cart-item-image" />
//                 <div className="cart-item-details">
//                   <h2>{item.cropName}</h2>
//                   <p>Price: ₹ {item.price}</p>
//                   <p>Quantity: {item.Quantity}</p>
//                 </div>
//                 <div className="cart-item-total">
//                   Total: ₹{(item.price * item.Quantity).toFixed(2)}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {cartItems.length > 0 && (
//           <div className="cart-summary">
//             <h2>Order Summary</h2>
//             <p>Items Total: ${totalPrice.toFixed(2)}</p>
//             <p>Tax: ₹{(totalPrice * 0.1).toFixed(2)} (10%)</p>
//             <p><strong>Total: ₹{(totalPrice + totalPrice * 0.1).toFixed(2)}</strong></p>
//             <button className="checkout-button">Proceed to Checkout</button>
//           </div>
//         )}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
//   };

// export default Cart;



import "./Cart.scss";
import React, { useState, useEffect } from 'react';
import Nav from "../nav/Nav";
import Footer from "../Footer/Footer";
import axios from 'axios';
import { useUserAuth } from "../../context/UserAuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "react-lottie";
import empty from "../../assets/emptycart.json"
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user,getCartItemsLength } = useUserAuth();

  // Fetch cart data from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const transaction = { "email": user.email };
        const url = 'http://localhost:8080/fetchCartByUser';
        const response = await axios.post(url, transaction);
        const data = response.data.data;
        setCartItems(data); // Assuming the API returns { items: [...] }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart data.');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user.email]);

  

  // Update the quantity of an item in the cart
  const updateQuantity = async (id, Quantity,price) => {
    if (Quantity < 1) return; // Prevent quantity from being less than 1
    const Total = Quantity*price;
    try {
      const url = `http://localhost:8080/updateCartById`; // Update with your API endpoint
      await axios.post(url, { id, Quantity,Total });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === id ? { ...item, Quantity: Quantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update quantity.');
    }
  };

  // Delete an item from the cart
  const deleteItem = async (id) => {
    try {
      const url = `http://localhost:8080/deleteCartById`; // Update with your API endpoint
      await axios.post(url,{id});
      await getCartItemsLength(user.email)
      setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item.');
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.Quantity, 0);
  const totalQty = cartItems.reduce((Qty, item) => Qty +  item.Quantity, 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const handelsell = async () => {
    // if(kg>0){
    setIsProcessing(true);
    setErrorMessage('');
    const STRIPE_SECRET_KEY = "pk_test_51OYphVSIebbx1BJCR4C4jNX9wd0oKwi9ThyTG8ufLWzwqrWzzL2VH1L4huRz939976Q0mUUOFlOq9uSPLu7vnP2600J1DoRnHF"
    // Initialize Stripe with your publishable key
    const stripePromise = loadStripe(STRIPE_SECRET_KEY);
    const stripe = await stripePromise;
    const url = 'http://localhost:8080/checkout';
    console.log("line 171",cartItems);
    
    // const transaction = {
    //     id: id,
    //     owner: data.owner,
    //     name: data.name,
    //     offerPrice: data.offerPrice,
    //     quantity: kg,
    //     farmerName: user.user_name, 
    //     email: user.email 
    // }
    const transaction = cartItems;
    const res = await axios.post(url, transaction);

    await stripe.redirectToCheckout({ sessionId: res.data.data })
  
// }
// else {
//     setErrorMessage('Please enter a quantity greater than 0.');
// }

}
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: empty, // the path to your animation data
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};




  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if(cartItems.length === 0){
    return (
        <>
        <Nav />
        {/* <div className="empty-cart">Cart is empty</div> */}
        <Lottie options={defaultOptions} height={400} width={400} />
        <h3 style={{position:"absolute", color:"black", top:"430px",left:"720px"}}>Empty Cart</h3>
        <Footer />
        </>
    )
  }
  if(cartItems.length < 5){
    return (
        <>
          <Nav />
          <div className="cart-page">
            {/* <h1>My Cart</h1> */}
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <div className="cart-image-div">
                      <img src={item.url} alt={item.cropName} className="cart-item-image" />
                      </div>
                      <div className="cart-item-details">
                        <h3 >{item.cropName}</h3>
                        <h4 style={{marginTop:"20px"}}>Price: ₹{item.price}</h4>
                        <div className="quantity-controls" style={{marginTop:"20px"}}>
                          <button onClick={() => updateQuantity(item._id, item.Quantity - 1,item.price)}><RemoveIcon style={{width:"18px",height:"18px"}}/></button>
                          <span style={{marginLeft:"10px", marginRight:"10px"}}>{item.Quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.Quantity + 1,item.price)}><AddIcon style={{width:"18px",height:"18px"}}/></button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        <h3>Total: ₹{(item.price * item.Quantity).toFixed(2)}</h3>
                      </div>
                      <div className="delete-button-cart">
                        
                      <button className="delete-button" onClick={() => deleteItem(item._id)}><DeleteIcon /></button>
                      </div>
                      
                      
                      
                    </div>
                  ))
                )}
              </div>
    
              {cartItems.length > 0 && (
                <div className="cart-summary">
                  <h2 className="checkout-button1">Order Summary</h2>
                  <div className="cart-total-qty">
                  <p style={{width:"370px"}}>Total Quantity</p>
                  <p><strong> {totalQty} </strong></p>
                  </div>
                  {/* <hr style={{color:"#e0e0e0",height:"0.5px"}}/> */}
                  <hr style={{ border: "none", borderTop: "0.5px solid #e0e0e0" }} />
    
                  <div className="cart-total-qty">
                  <p style={{width:"370px"}}>Total</p>
                  <p style={{marginBottom:"10px"}}><strong> ₹{(totalPrice).toFixed(2)}</strong></p>
                  </div>
                  <button className="checkout-button" onClick={()=>handelsell()}>Proceed to Checkout</button>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      );

  }

  return (
    <>
      <Nav />
      <div className="cart-page1">
        {/* <h1>My Cart</h1> */}
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item._id} className="cart-item">
                    <div className="cart-image-div">
                  <img src={item.url} alt={item.cropName} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <h3 >{item.cropName}</h3>
                    <h4 style={{marginTop:"20px"}}>Price: ₹{item.price}</h4>
                    <div className="quantity-controls" style={{marginTop:"20px"}}>
                      <button onClick={() => updateQuantity(item._id, item.Quantity - 1,item.price)}><RemoveIcon style={{width:"18px",height:"18px"}}/></button>
                      <span style={{marginLeft:"10px", marginRight:"10px"}}>{item.Quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.Quantity + 1,item.price)}><AddIcon style={{width:"18px",height:"18px"}}/></button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <h3>Total: ₹{(item.price * item.Quantity).toFixed(2)}</h3>
                  </div>
                  <div className="delete-button-cart">
                    
                  <button className="delete-button" onClick={() => deleteItem(item._id)}><DeleteIcon /></button>
                  </div>
                  
                  
                  
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h2 className="checkout-button1">Order Summary</h2>
              <div className="cart-total-qty">
              <p style={{width:"370px"}}>Total Quantity</p>
              <p><strong> {totalQty} </strong></p>
              </div>
              {/* <hr style={{color:"#e0e0e0",height:"0.5px"}}/> */}
              <hr style={{ border: "none", borderTop: "0.5px solid #e0e0e0" }} />

              <div className="cart-total-qty">
              <p style={{width:"370px"}}>Total</p>
              <p style={{marginBottom:"10px"}}><strong> ₹{(totalPrice).toFixed(2)}</strong></p>
              </div>
              <button className="checkout-button" onClick={()=>handelsell()}>Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

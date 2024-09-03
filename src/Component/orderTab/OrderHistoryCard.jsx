import React, { useEffect, useState } from 'react';
import Footer from "../../Component/Footer/Footer";
import Nav from "../../Component/nav/Nav";
import { useUserAuth } from "../../context/UserAuthContext";
import './OrderHistoryCard.scss';
const OrderHistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const { fetchFertilizerOrderHistoryByUser,user} =useUserAuth();

  useEffect(() => {
    // Fetch orders from an API or some data source
    const fetchOrders = async () => {
      // try {
      //   const response = await fetch('/api/orders'); // Replace with your API endpoint
      //   const data = await response.json();
      //   setOrders(data);
      // } catch (error) {
      //   console.error('Error fetching orders:', error);
      // }
      console.log("line 24", user.email);
      
      const res=await fetchFertilizerOrderHistoryByUser(user.email)
      setOrders(res);
    };

    fetchOrders();
  }, []);

  const formatLocalTime = (utcDate) => {
    const localDate = new Date(utcDate);
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = localDate.getFullYear();
    
    const hours = localDate.getHours() % 12 || 12;
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const ampm = localDate.getHours() >= 12 ? 'PM' : 'AM';
  
    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
    <Nav/>
    
    <div className="order-history">
    {/* <h1>Order History</h1> */}
      {orders.map((order) => (
        <div className="order-card" key="1">
          <div className="order-details">
            <h2 className='order-heading'>{order.cropName}</h2>
            <p className='order-content'>Quantity: {order.Quantity}</p>
            <p className='order-content'>Unit Price: {order.price}</p>
            <p className='order-content'>Total Amount: ₹{order.Total}</p>
            <p className='order-content'>Date: {formatLocalTime(order.createdAt)}</p>
          </div>
          <div className="order-image">
            <img src={order.url} alt={order.cropName} />
          </div>
        </div>


      ))}
      
    </div>
    <Footer/>
    </>
  );
};

export default OrderHistoryCard;

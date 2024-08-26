import React, { useEffect, useState } from 'react';
import './OrderHistoryCard.scss';
import img from "../../assets/check-mark.png"

const OrderHistoryCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from an API or some data source
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders'); // Replace with your API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2 className="order-history__title">Your Order History</h2>
      
        <ul className="order-history__list">
          {/* {orders.map((order) => ( */}
            <li key={1} className="order-history__item">
              <div className="order-history__item-header">
                <h3>Order #1</h3>
                <span className="order-history__item-date">25/3/3024</span>
              </div>
              <div className="order-history__item-details">
                <p><strong>Total:</strong> 300rs</p>
                <p><strong>Status:</strong> completed</p>
                <div className="order-history__item-items">
                  <h4>Items:</h4>
                  <ul>
                  <img src={img} alt="alt imag" className="order-history__item-image" />
                    {/* {order.items.map((item) => ( */}
                      {/* <li key={item.id}>
                        {item.name} (x{item.quantity})
                      </li> */}
                    {/* ))} */}
                  </ul>
                </div>
              </div>
            </li>
          {/* ))} */}
        </ul>
      
    </div>
  );
};

export default OrderHistoryCard;

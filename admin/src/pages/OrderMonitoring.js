import React, { useState } from "react";
import "./OrderMonitoring.scss";

const OrderMonitoring = () => {
  const [orders, setOrders] = useState([
    { id: 1, tokenNo: "001", orderedBy: "John Doe" },
    { id: 2, tokenNo: "002", orderedBy: "Jane Smith" },
    { id: 3, tokenNo: "003", orderedBy: "Alice Brown" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderDetails = [
    {
      orderId: 1,
      items: [
        { sn: 1, itemName: "Burger", quantity: 2, amount: 5 },
        { sn: 2, itemName: "Fries", quantity: 1, amount: 2 },
      ],
    },
    {
      orderId: 2,
      items: [
        { sn: 1, itemName: "Pizza", quantity: 1, amount: 10 },
        { sn: 2, itemName: "Soda", quantity: 1, amount: 2 },
      ],
    },
    {
      orderId: 3,
      items: [
        { sn: 1, itemName: "Pasta", quantity: 1, amount: 8 },
        { sn: 2, itemName: "Salad", quantity: 1, amount: 3 },
      ],
    },
  ];

  const handleView = (id) => {
    const order = orderDetails.find((detail) => detail.orderId === id);
    setSelectedOrder(order);
  };

  const handleRemove = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    if (selectedOrder && selectedOrder.orderId === id) {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="order-monitoring">
      <h1>Order Monitoring</h1>
      <table className="orders-table">
        <thead>
          <tr className="Head">
            <th>Token No</th>
            <th>Ordered By</th>
            {/* <th>Duration</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.tokenNo}</td>
              <td>{order.orderedBy}</td>
              {/* <td>{order.duration}</td> */}
              <td>
                <button onClick={() => handleView(order.id)}>View</button>
                <button onClick={() => handleRemove(order.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <div className="order-details">
          <h2>Order Details</h2>
          <table>
            <thead>
              <tr className="Head">
                <th>SN</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item) => (
                <tr key={item.sn}>
                  <td>{item.sn}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <strong>Total: </strong> $
            {selectedOrder.items.reduce(
              (total, item) => total + item.quantity * item.amount,
              0
            )}
          </div>
          <button>Call</button>
        </div>
      )}
    </div>
  );
};

export default OrderMonitoring;

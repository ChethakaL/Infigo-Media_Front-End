import React, { useState, useEffect } from 'react';
import axios from "axios";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://infigomedia.xyz/backend/api/shop/products/purchased');
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateStatus = async (purchaseId, status) => {
        let nextStatus = '';
        if (status === 'Pending') {
            nextStatus = 'Processing';
        } else if (status === 'Processing') {
            nextStatus = 'Delivering';
        } else {
            nextStatus = 'Done';
        }
        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/shop/purchase/status/update', {
                purchaseId: purchaseId,
                status: nextStatus
            });
            console.log(response.data);
            fetchOrders(); // Fetch orders again to reflect the updated status
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <table className='ui celled structured table'>
                <thead>
                <tr>
                    <th rowSpan={2}>OrderId</th>
                    <th rowSpan={2}>ProductID</th>
                    <th colSpan={3}>Order Details</th>
                    <th colSpan={3}>Customer Details</th>
                    <th rowSpan={2}>Status</th>
                    <th rowSpan={2}>Actions</th>
                </tr>
                <tr>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Qty</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.productId}</td>
                        <td>{order.orderDetails.size}</td>
                        <td>{order.orderDetails.color}</td>
                        <td>{order.orderDetails.quantity}</td>
                        <td>{order.customerDetails?.name || 'No name'}</td>
                        <td>{order.customerDetails?.phoneNumber || 'No phone'}</td>
                        <td>{order.customerDetails?.address || 'No address'}</td>
                        <td>{order.status}</td>
                        <td className='row'>
                            <button onClick={() => handleUpdateStatus(order._id, order.status)} className='ui green button'>{order.status !== 'Delivering' ? 'Next' : 'Done'}</button>
                            <button className='ui red button'>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;

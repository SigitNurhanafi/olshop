import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Button } from "../components/ui/button"


const handleEditOrder = (orderId) => {
    history.push(`/orders/${orderId}/edit`);
};

const Home = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // Mengambil token dari local storage
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/orders', {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`, // Menyertakan token dalam header
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order data');
                }

                const orderData = await response.json();
                setOrderData(orderData.data.orders);
            } catch (error) {
                console.error('Error:', error);
                // Tangani kesalahan
            }
        };

        if (token) {
            fetchOrderData();
        }
    }, [token]);

    const handleEditOrder = (orderId) => {
        props.history.push(`/orders/${orderId}/edit`); // Menggunakan props.history.push()
    };

    if (!token) {
        return <Redirect to="/login" />;
    }
    
    return (
        <div className="container mx-auto">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderData.map((order) => (
                        <TableRow key={order.order_id}>
                            <TableCell className="font-medium">{order.order_id}</TableCell>
                            <TableCell>{order.status.label}</TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell className="text-right">{order.price}</TableCell>
                            <TableCell className="text-right">
                            <Button onClick={() => handleEditOrder(order.order_id)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">
                            {/* Hitung jumlah total dari semua pesanan */}
                            {orderData.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export { Home }

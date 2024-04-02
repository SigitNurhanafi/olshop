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

const ListProduct = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // Mengambil token dari local storage
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/products', {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`, // Menyertakan token dalam header
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order data');
                }

                const product = await response.json();
                setOrderData(product.data.products);
            } catch (error) {
                console.error('Error:', error);
                // Tangani kesalahan
                alert(error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleEditProduct = (orderId) => {
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
                    {orderData.map((product) => (
                        <TableRow key={order.id}>
                            
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="font-medium">{product.price}</TableCell>
                            <TableCell className="font-medium">{product.category}</TableCell>
                            <TableCell className="font-medium">{product.sku}</TableCell>
                            <TableCell className="font-medium">{product.created_at}</TableCell>
                            <TableCell className="text-right">
                            <Button onClick={() => handleEditProduct(order.order_id)}>Edit</Button>
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

export { ListProduct }

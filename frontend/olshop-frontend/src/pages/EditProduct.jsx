import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

const EditProduct = () => {
  const { orderId } = useParams();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [orderData, setOrderData] = useState({
    id: '',
    status: '',
    name: '',
    price: ''
  });

  useEffect(() => {
    const fetchOrderDataById = async (orderId) => {
      try {
          const response = await fetch(`http://127.0.0.1:3000/orders/${orderId}`, {
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
    
          setOrderData(orderData.data.order);
      } catch (error) {
          console.error('Error:', error);
          // Tangani kesalahan
      }
    };
    if (token) {
      fetchOrderDataById(orderId);
    }

  }, [token]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  return (
  <div className="container mx-auto">
  
    <h2>Edit Order</h2>
    <form onSubmit={handleSubmit}>
      {/* <label>
        ID:<br />
        <Input type="text" name="id" value={orderData.id} onChange={handleChange} placeholder="ID" />
      </label><br /> */}
      <label>
        Status:<br />
        {/* <Innpput type="text" name="status" value={orderData.status.label} onChange={handleChange} placeholder="Status" /> */}

        <Select>
          <SelectTrigger >
            <SelectValue placeholder={orderData.status.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem name="status" value="0">pending</SelectItem>
            <SelectItem name="status" value="1">in progress</SelectItem>
            <SelectItem name="status" value="2">done</SelectItem>
          </SelectContent>
        </Select>
      
      </label><br />
      <label>
        Name:<br />
        <Input type="text" name="name" value={orderData.name} onChange={handleChange} placeholder="Name" />
      </label><br />
      <label>
        Price:<br />
        <Input type="text" name="price" value={orderData.price} onChange={handleChange} placeholder="Price" />
      </label><br />
      <Button type="submit">Submit</Button>
    </form>
  </div>
  );
};

export default EditProduct;

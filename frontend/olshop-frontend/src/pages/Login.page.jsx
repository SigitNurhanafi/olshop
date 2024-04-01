import React, { useState } from 'react';
import useStore from '../utils/useStore';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const Login = () => {

  const { setToken } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const responseData = await response.json();
      const { token } = responseData.accesToken;

      console.log(token);

      // Simpan token ke dalam Zustand
      setToken(token);
      setRedirect(true);

    } catch (error) {
      console.error('Error:', error);
      // Tangani kesalahan
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                {...register('email', { required: 'Email is required' })} 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                {...register('password', { required: 'Password is required' })}
                id="password" 
                type="password" 
                required 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export { Login }
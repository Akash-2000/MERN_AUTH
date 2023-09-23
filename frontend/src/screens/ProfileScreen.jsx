import React from 'react'
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form,Row,Col,Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector,useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authslice';


export default function ProfileScreen() {
  

    const [name,setname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [confirmpassword,setconfirmpassword] = useState('')



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useSelector((state)=>state.auth)
    console.log(userInfo)
   const [updateProfile,{isLoading}] = useUpdateUserMutation()


    useEffect(()=>{
      setname(userInfo.name)
      setEmail(userInfo.email)
    },[userInfo.name,userInfo.email])
    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
            toast.error('Passwords do not match');
        }else{
           try {
                const res = await updateProfile({
                    _id:userInfo._id,
                    name,
                    email,
                    password
                }).unwrap()

                dispatch(setCredentials({...res}));
                toast.success('Profile updated')

           } catch (err) {
             toast.error(err?.data?.message||err.error)
           }
        }
    }

    return (


    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
               <Form.Label>Name</Form.Label> 
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setname(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
               <Form.Label>Email Address</Form.Label> 
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='password'>
               <Form.Label>Password</Form.Label> 
                <Form.Control type='password' placeholder='Enter password' onChange={(e)=>setpassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmpassword'>
               <Form.Label>Confirm Password</Form.Label> 
                <Form.Control type='password' placeholder='confirm password' onChange={(e)=>setconfirmpassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            {isLoading && <Loader></Loader>}
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>

            

        </Form>
    </FormContainer>
  )
}

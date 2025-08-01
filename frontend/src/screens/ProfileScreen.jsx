import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
const ProfileScreen = () =>{

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state)=>state.auth)
    const [profile, {isLoading}] = useProfileMutation()

    const dispatch = useDispatch();



    useEffect(()=>{
        if(userInfo){
            setEmail(userInfo.email);
            setName(userInfo.name);
        }
        console.log('Email changed:', email);
    },[userInfo])

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password != confirmPassword){
            toast.error('Passwords do not match ')
        }else{
            try {
                const res  =  await profile({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
           
        }
    }

    return(
        <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={ submitHandler }>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
            onChange={(e)=>setName(e.target.value)} value={name}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
             onChange={(e)=>setPassword(e.target.value)}
             value={password}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              onChange={(e)=>setConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      
      </Col>
    </Row>
    )
}
export default ProfileScreen;
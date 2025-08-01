import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const RegisterScreen = () =>{

    const [name, setName ]  =  useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register,{ isLoading }]  = useRegisterMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e)=>{

        e.preventDefault();
        if(password != confirmPassword){
            
            toast.error('Passwords do not match');
        }else{
              try{
                const res = await register({ name,email,password }).unwrap() 
                dispatch(setCredentials({...res}));
                navigate('/')

              }
              catch(err){
                toast.error(err?.data?.message || err.error)
              }
              
              //onsole.log("ff");
        }
        
    }


    return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
          onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
          onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button  type='submit' variant='primary'>
          Register
        </Button>
        { isLoading && <Loader/>}
       
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={'/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
export default RegisterScreen
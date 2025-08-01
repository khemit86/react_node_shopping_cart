import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link,useNavigate  } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LoginScreen = () =>{

    const [email, setEmail ] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const [login,{ isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const  redirect =  sp.get('redirect') || '/';

    const { userInfo } = useSelector((state)=>state.auth);
   
     useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }  
       
    },[navigate, redirect, userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap() ;
            dispatch(setCredentials({...res}));
            navigate('/')

           
        } catch (err) {
           toast.error(err?.data?.message || err.error)
            
        }
        
    }

    return(
       <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={(e)=>setEmail(e.target.value)}
                
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter password'
                onChange={(e)=>setPassword(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button  type='submit' variant='primary'>
            Sign In
            </Button>
            { isLoading && <Loader/>}
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer?{' '}
            <Link to='/register'>
                Register
            </Link>
            </Col>
        </Row>
        </FormContainer>
    )
}

export default LoginScreen;
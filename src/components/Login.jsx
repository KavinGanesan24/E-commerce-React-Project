import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    let {newUser} = useParams();
    let navigate = useNavigate();

    let handleNavigate = () =>{
        navigate("/")
    }
  return (
    <div>
        Login - {newUser}
        <Button variant="primary" onClick={ handleNavigate }> Move to Home </Button>
        
    </div>
  )
}

export default Login
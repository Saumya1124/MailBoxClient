import { Fragment, useRef, useState } from 'react';
import './SignUp.css';

import { Form , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const SignUp = () => {

    const emailInputRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault()

        const email = emailInputRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if(password === confirmPassword){
            const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm6gdFoamk3tACK3w-qg2xjn9Li4GygzQ',
            {
                method: 'POST',
                body : JSON.stringify({
                    email : email,
                    password : password,
                    confirmPassword : confirmPassword,
                    returnSecureToken : true,
                }),
                headers : {
                    'content-type' : 'application/JSON'
                }
            }
            )
    
            res.then( res => {
    
                if(res.ok){
    
                    res.json().then( data => {
                        console.log('New User created')
                    })
                }
    
                else{
                    res.json().then(err => {
                        console.log(err)
                        alert(err.error.message)
                    })
                }
            })

        }
        else{
            alert('Password did not match.')
        }

        
    }
    return(

        <Fragment>
        <div className='d-flex justify-content-center align-items-center form'>
            <div className='col-lg-3 form1'>
                <div className='d-flex justify-content-center'>
                    <h3>Sign Up</h3>
                </div>

                <br />
                
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  required ref={emailInputRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" required ref={confirmPasswordRef} />
                    </Form.Group>
                    <div className='d-flex justify-content-center '>
                        <button className='btn'>Sign Up</button>
                    </div>
                                            
                    
                </Form>

                <br />

                <div className='d-flex justify-content-center'>
                    <Link to='/login'>Have an account? Login</Link>
                     
                </div>
            </div>
        </div>

    </Fragment>
    )
}

export default SignUp;
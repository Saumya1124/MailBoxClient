import { Fragment, useContext, useRef, useState } from 'react';
import './Login.css';

import { Form , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';


const Login = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLoading , setIsLoading] = useState(false)

    const history = useHistory()

    const dispatch = useDispatch()

    const submitHandler = async(event) => {
        event.preventDefault()

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        setIsLoading(true)

        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm6gdFoamk3tACK3w-qg2xjn9Li4GygzQ' , {
            method : 'POST',
            body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true,
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })

        setIsLoading(false)

        if(res.ok){
            res.json().then( data => {
                console.log('Logged In successfully.' , data)
                dispatch(authActions.logIn({email : data.email , token : data.idToken}))
                history.replace('/postMail')

            })
        }
        else{
            res.json().then( err => {
                console.log('Error' , err)
                alert('Authentication failed!')
            })
        }

        

    }

    return(
        <Fragment>
            <div className='d-flex justify-content-center align-items-center form'>
                <div className='col-lg-3 form1'>
                    <div className='d-flex justify-content-center'>
                        <h3>LogIn</h3>
                    </div>

                    <br />
                    
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  required ref={emailInputRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordInputRef} />
                        </Form.Group>
                        <div className='d-flex justify-content-center '>
                            <Link to='/reset'>Forget Password?</Link>
                        </div>
                        <br />
                        <div className='d-flex justify-content-center '>
                            {!isLoading? <button className='btn'>LogIn</button> : <p>Loading ...</p>}
                        </div>                        
                    </Form>

                    <br />

                    <div className='d-flex justify-content-center'>
                        <Link to='/signUp'>Don't have an account? Sign Up</Link>
                         
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default Login;
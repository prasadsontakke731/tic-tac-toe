import React, { useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css"
function Login() {
    const { loginWithRedirect } = useAuth0();
    const email = useRef()
    const password = useRef()


    return (

        <div className="login-container">
            <form className="login-form" >
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" ref={email} name="email" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" ref={password} name="password" required />
                </div>
                <button className='btn' onClick={() => loginWithRedirect()}>Log In</button>
            </form>

        </div>
    )
}

export default Login
import axios from "axios";
import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            userNameOrEmailAddress: email,
            password: pass,
            rememberMe: true
        }

        try {
            const response = await axios.post("http://localhost/api/account/login",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(JSON.stringify(response?.data))
            
        }catch (err){
            console.log(err)
            if(!err?.response){
                setError('No Server Response');
            } else if(err.response?.status === 400){
                setError('Missing username or password');
            }else if(err.response?.status === 401){
                setError('Unauthorized');
            }else{
                setError('Login Failed')
            }
        }
    }

    return (
        <div className="auth-form-container">
            <h1>FutApp</h1>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email o Usuario</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit"> Log In </button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
import React, { useState } from "react";
import { useFetch } from "./useFetch";
import axios from "axios";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const sendData = {
            userName: username,
            emailAddress: email,
            password: pass,
            appName: username,
            surname: surname,
            phoneNumber:phone,
            name: name
        }

        try {
            const response = await axios.post("http://localhost/api/account/register",
                JSON.stringify(sendData),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(JSON.stringify(response?.data))

        } catch (err) {
            console.log(err?.data)
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
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name" />
                <label htmlFor="surname">Surname</label>
                <input value={surname} onChange={(e) => setSurname(e.target.value)} name="surname" id="surname" placeholder="surname" />
                <label htmlFor="phone">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" id="phone" placeholder="phone number" />
                <label htmlFor="username">User</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="username" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit"> Register </button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')} >Already have an account? Login here.</button>
        </div>
    )
}
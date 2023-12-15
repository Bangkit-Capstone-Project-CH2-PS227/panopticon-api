import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [msg, setMsg] = useState('');

    const history = useHistory();

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            history.push("/dashboard");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <section className="hero has-has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form onSubmit={ Auth } className='box'>
                        <div className='field mt-5'>
                            <p className='has-text-centered'>{msg}</p>
                            <label htmlFor="" className='label'>Email or Username</label>
                            <div className='controls'>
                                <input type="text" className='input' placeholder='Username' value={email} onChange={(e) => setemail(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <label htmlFor="" className='label'>Password</label>
                            <div className='controls'>
                                <input type="password" className='input' placeholder='******' value={password} onChange={(e) => setpassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-5'>
                            <button className="button is-success is-fullwidth">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login

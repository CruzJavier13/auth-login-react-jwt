import React, { useState } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import useForm from '../helpers/useForm'
import { useAuth } from '../auth/AuthProvider'
import APIURL from '../auth/APIURL'
import { AuthResponseError } from '../type/type'

interface initFormState{
    fullname:string
    email: string
    username: string
    password: string
}


const SignUp = (): React.ReactNode => {

    const [errorResponse, setErrorResponse] = useState('')

    const auth = useAuth()
    const goTo = useNavigate(); 

    if(auth.isAuthenticated){
        return <Navigate to='/dashboard' />
    }

    const form : initFormState = {
        fullname:'', 
        email:'', 
        username:'', 
        password: ''
    }

    const {fullname, email, username, password, formState, onInputChange} = useForm(form)

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await fetch(`${APIURL}/signup`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    username,
                    password
                })
            });
            if(response.ok){
                console.log('User created successfully');
                setErrorResponse('');
                goTo('/');
            } else {
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error)
                console.log('Something went wrong')
                return;
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Layout>
      <form className="form" onSubmit={handleSubmit}>
        <img src="" alt="SignUp" />
        {!!errorResponse  && <div className='errorMessage'>{errorResponse}</div>}
        
        <div>
          <label htmlFor="fullname">Full name</label>
          <input 
          type="text" 
          name="fullname" 
          id="fullname"
          value={fullname}
          onChange={onInputChange}
          placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name="email" 
          id="email" 
          value={email}
          onChange={onInputChange}
          placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input 
          type="text" 
          name="username" 
          id="username" 
          value={username}
          onChange={onInputChange}
          placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          name="password" 
          id="password"
          value={password}
          onChange={onInputChange}
          placeholder="Enter your password"
          />
        </div>
        <button type='submit' /* onClick={} */>login</button>
      </form>
    </Layout>
  )
}

export default SignUp
import React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import useForm from "../helpers/useForm"
import  {useAuth}  from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import APIURL from "../auth/APIURL"
import type { AuthResponse, AuthResponseError } from "../type/type"


interface initFormState{
  username: string
  password: string
}

const Login = () => {

  const [errorResponse, setErrorResponse] = useState('')

  const auth = useAuth();
  const goTo = useNavigate(); 


    if(auth.isAuthenticated){
        return <Navigate to='/dashboard' />
    }

  const form : initFormState = {
    username:'', 
    password: ''
  }

  const {username, password, formState, onInputChange} = useForm(form)

  const onHandleSumbit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState)
    try{
      const response = await fetch(`${APIURL}/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
      });
      if(response.ok){
        console.log('Loggin successfully');
        
        setErrorResponse('');
        const json = (await response.json()) as AuthResponse
        if(json.body.accessToken && json.body.refreshToken){
          auth.saveUser(json);
          goTo('/dashboard');
        }

      } else {
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        console.log('Something went wrong');
        return;
      }

    } catch(error){
      console.log(error)
    }
  }
  return (
    <Layout>
      <form className="form" onSubmit={onHandleSumbit}>
        <img src="" alt="Login" />
        {!!errorResponse  && <div className='errorMessage'>{errorResponse}</div>}
        

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
        <button type="submit">login</button>
      </form>
    </Layout>
  )
}

export default Login
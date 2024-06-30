import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import classes from './signin.module.css'
// import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[showMsg,setShowMsg]=useState(false);
  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault();
    if(email === '' || password === ''){
      setEmptyFields(true)
      setTimeout(() => {
       setEmptyFields(false)
      }, 2500)
   }
    try {
      const options = {
        "Content-Type": "application/json",
      }

      const data = await request('/auth/login', "POST", options, { email, password })

      dispatch(login(data))
      navigate("/")
    } catch (error) {
      console.log(error.message)
      setShowMsg(true)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.error(error)
    }
  }
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2>Sign-In</h2>
          <form action="" onSubmit={handleLogin}>
            <input type="text" name="email" id="" placeholder='Email' onChange={(e)=>{setEmail(e.target.value); setShowMsg(false)}}/>
            <input type="password" name="password" id="" placeholder='Password' onChange={(e)=>{setPassword(e.target.value); setShowMsg(false)}} />
            <small style={showMsg?{display:'block'}:{display:'none'}}>Wrong Credentials !!!</small>
            <Link to='/forgotPassword'><p>Forgot Password?</p></Link>
            <button type="submit">Sign In</button>
            <p>Dont Have an Account <Link to='/signup'>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn

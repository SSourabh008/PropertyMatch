import React from 'react'
import { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classes from './signup.module.css'
import { register } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
const SignUp = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    // how to check if ONLY ONE of the values of an object is empty
    if (Object.values(state).some((v) => v === '')) {
      setEmptyFields(true)
      setTimeout(() => {
        setEmptyFields(false)
      }, 2500)
    }
    try {
      let filename = null
      if (photo) {
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append('filename', filename)
        formData.append('image', photo)

        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          body: formData
        })
      } else {
        setEmptyFields(true)
        setTimeout(() => {
          setEmptyFields(false)
        }, 2500)
        return
      }

      const headers = {
        "Content-Type": "application/json",
      }

      const data = await request(`/auth/register`, "POST", headers, { ...state, profileImg: filename })
      dispatch(register(data))
      
      navigate("/")
    } catch (error) {
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='Username......' onChange={handleState} />
            <input type="email" name='email' placeholder='Email...' onChange={handleState} />
            <label htmlFor="photo">Upload Photo <AiOutlineFileImage /></label>
            <input type="file" id='photo' style={{ display: 'none' }} onChange={(e) => { setPhoto(e.target.files[0]) }} />
            <input type="password" name='password' placeholder='Password' onChange={handleState} />
            <button type="submit">Register</button>
            <p>Already Have an account? <Link to='/signin'>Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

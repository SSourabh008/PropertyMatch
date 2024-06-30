import React, { useState } from 'react'
import classes from './ForgotPassword.module.css';
import { request } from '../../util/fetchAPI';
import {useSelector} from 'react-redux';
import {useParams,Link,useNavigate} from 'react-router-dom';
const ForgotPassword = () => {
const[newPass,setNewPass]=useState("");
const [email, setEmail] = useState("")
const [password, setPassword] = useState('');
// const { token, user } = useSelector((state) => state.auth);
// const {id}=useParams();
const handleForgot=async(e)=>{
    e.preventDefault();
    if(newPass===password){
        console.log("Hii iam in this function");
     }
     try {
        const options = {
            "Content-Type": "application/json",
          }
          console.log("Request about to send");
          console.log(email,password);
          const data = await request('/auth/forgotPassword', "PUT", options, {email, password });
          console.log("Request sent"+data);
     } catch (error) {
        console.error(error.message);
     }

}

  return (
    <>
        <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2>Forgot Password</h2>
          <form action="" onSubmit={handleForgot}>
            <input type="text" name="email" id="" placeholder='Email' onChange={(e)=>{setEmail(e.target.value);}}/>
            <input type="text" name="newpassword" id="" placeholder='Enetr new Password' onChange={(e)=>{setNewPass(e.target.value)}}/>
            <input type="password" name="password" id="" placeholder='Confirm it' onChange={(e)=>{setPassword(e.target.value)}} />
            {/* <small style={showMsg?{display:'block'}:{display:'none'}}>Wrong Credentials !!!</small> */}
            {/* <Link to='/forgotPassword'><p>Forgot Password?</p></Link> */}
            <button type="submit">Set new password</button>
            {/* <p>Dont Have an Account <Link to='/signup'>Sign Up</Link></p> */}
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
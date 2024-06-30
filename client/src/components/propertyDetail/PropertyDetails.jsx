import React, { useEffect } from 'react'
import classes from'./propDetail.module.css'
import {useSelector} from 'react-redux';
import{useState} from 'react';
import {useParams,Link,useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import {estate} from '../../assets/estate.jpg'; 
import { request } from '../../util/fetchAPI'
import {FaBed,FaSquareFull} from 'react-icons/fa'
import person from "../../assets/yacht1.jpg";

const PropertyDetails = () => {
  
  const { token, user } = useSelector((state) => state.auth)
  const [propertyDetail,setPropertyDetails]=useState(null);
  const[showForm,setShowForm]=useState(false);
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const {id}=useParams();
  const formRef=useRef();
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        console.log("You are in propertoes details page")
        const data=await request(`/property/find/${id}`,`GET`);
        console.log(data);
        setPropertyDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  },[id])
  const handleCloseForm = () => {
    setShowForm(false)
    setDesc('')
  }
  const handleDelete= async()=>{
    try {
      await request(`/property/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt="" />
          </div>
          <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
            {user?._id === propertyDetail?.currentOwner?._id && (
              <div className={classes.controls}>
                <Link to={`/editProperty/${id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </div>)
            }
          </h3>
          <div className={classes.details}>
          <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>City: <span>{`${propertyDetail?.state}`}</span></div>
          </div>
          <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: Rs. </span>{`${propertyDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner: {propertyDetail?.currentOwner?.profileImg
                  ? (
                    <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} />
                  ) : (
                    <img src={person} className={classes.owner} />)
                }</span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon} /></span>
              <span>{propertyDetail?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default PropertyDetails

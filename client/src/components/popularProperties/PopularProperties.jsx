import React from 'react'
import  classes from'./popularprop.module.css';
import { Link } from 'react-router-dom'
import img1 from '../../assets/realestatebeach.jpg';
import img2 from '../../assets/realestatecountryside.jpg';
import {useState,useEffect} from 'react';
import { request } from '../../util/fetchAPI';
// import img3 from '../../assets/realestatebeach.jpg';
import RentProperties from '../RentProperties/RentProperties';

const PopularProperties = () => {
  // const [rentProperties, setRentProperties] = useState(0)
  // const [purchaseProperties, setPurchaseProperties] = useState(0)
  const[numProperties,setNumProperties]=useState({});
    useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')
         console.log(data);
        setNumProperties(data)
        
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchPropertiesNumber()
  }, [])
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.titles}>
            <h5>Diffrent type of properties</h5>
            <h2>Best type of properties for you.</h2>
          </div>
          <div className={classes.properties}>
              <Link to='rent' className={classes.property}>
                <img src={img1} alt="" />
                <div className={classes.quantity}>{numProperties?.rent} Properties</div>
                <h5>Rent Properties</h5>
              </Link>
              <Link to='purchase' className={classes.property}>
                <img src={img2} alt="" />
                <div className={classes.quantity}>{numProperties?.purchase} Properties</div>
                <h5>Purchaseing Properties</h5>
              </Link>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties

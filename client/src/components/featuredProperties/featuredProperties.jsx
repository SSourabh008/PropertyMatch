import {React,useState,useEffect} from 'react'
import classes from './featuredProperties.module.css'
import { request } from '../../util/fetchAPI';
import {Link} from 'react-router-dom'
import img from '../../assets/estate.jpg';
import person from '../../assets/person.jpg';
import {FaBed,FaSquareFull} from 'react-icons/fa'
const FeaturedProperties = () => {
  const[featuredProperties,setFeaturedProperties]=useState([]);
  useEffect(()=>{
    const fetchFeatured=async()=>{
      try {
        const data=await request('/property/find/featured','GET');
        setFeaturedProperties(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFeatured()
  },[])
  console.log(featuredProperties);
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.titles}>
            <h5>Properties you may like</h5>
            <h2>Our Featured Properties</h2>
          </div>
          <div className={classes.featuredProperties}>
              {featuredProperties?.map((property)=>(
                <div  key={property._id} className={classes.featuredProperty}>
                  <Link to={`/propertyDetails/${property._id}`} className={classes.imgContainer}>
                    <img src={property.img?`http://localhost:5000/images/${property.img}`:img} alt="" />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.price}>Rs. {property?.price}</span>
                      <img src={person} alt="" className={classes.owner}/>
                    </div>
                    <div className={classes.moreDetail}>
                        <span>{property?.beds} <FaBed className={classes.icon}/></span>
                        <span>{property?.sqmeters} Square Meters<FaSquareFull className={classes.icon}/></span>
                      </div>
                      <div className={classes.desc}>
                        {property?.desc}
                      </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties

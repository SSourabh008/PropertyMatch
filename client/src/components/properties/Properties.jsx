
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import{FaBed,FaSquareFull} from 'react-icons/fa'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './properties.module.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import person from '../../assets/person.jpg'
import { request } from '../../util/fetchAPI'
import PropertyCard from '../propertyCard/PropertyCard'

const Properties = () => {
  const[allProperties,setAllProperties]=useState([]);
  const[filteredProperties,setFilteredProperties]=useState([]);
  const [state,setState]=useState(null);
  const query=(useLocation().search).slice(1);
  const arrQuery=query.split("&");
  const navigate=useNavigate();

  console.log(useLocation().search)
  //fetch all properties
  useEffect(()=>{
    const fetchAllProperties=async()=>{
      const data=await request('/property/getAll','GET');
      setAllProperties(data);
    }
    fetchAllProperties()
  },[])

  //parsing query property
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const filteredProperties = allProperties.filter((property) => {
      console.log(options)
      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const state = property.state;
     
      console.log(property.type,options.type);
      console.log(state,options.state);
      console.log(property.price,minPrice);
      if (
        property.type === options.type
        && state === options.state
        && property.price >= minPrice && property.price <= maxPrice
      ) {
        console.log(property);
        return property
        
      }
    })

    const queryStr = `type=${options.type}&state=${options.state}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties( filteredProperties)
  }

 
  return (
    <div>
      
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="rent">Rent</option>
            <option value="purchase">Purchase</option>
            
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
                <option disabled>Select Price Range</option>
                <option value="0">0-100,000</option>
                <option value="1">100,000-10,00,000</option>
                <option value="2">10,00,000-50,00,000</option>
                <option value="3">50,00,000-10,00,0000</option>
                <option value="4">10,00,0000-10,00,00000</option>
          </select>
          {/* <select value={state?.continent} name="continent" onChange={handleState}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select> */}
          <input type="text" name="state" placeholder='City' onChange={handleState} value={state?.state} className={classes.entState}/>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredProperties?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <div key={property._id} className={classes.property}>
                    <Link className={classes.imgContainer} to={`/propertyDetails/${property._id}`}>
                      <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                      </Link>
                      <div className={classes.details}>
                        <div className={classes.priceAndOwner}>
                          <span className={classes.price}>Rs {property.price}</span>
                          <img src={person} alt="" className={classes.owner}/>
                        </div>
                        <div className={classes.moreDetails}>
                          <span>{property.beds} <FaBed className={classes.icon} /></span>
                          <span>{property.sqmeters} sq. meters <FaSquareFull className={classes.icon} /></span>
                        </div>
                        <div className={classes.desc}>
                          {property.desc}
                        </div>
                      </div>
                   
                </div>
              ))}
            </div>
          </> : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
      </div>
    </div>
  )
      
    </div>
  )
}

export default Properties

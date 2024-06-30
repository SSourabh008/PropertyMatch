import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("rent")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()
  const[st,setSt]=useState("0");
  const handleSearch = () => {
    // navigating to properties
    console.log(type+" "+st+" "+priceRange);
    navigate(`/properties?type=${type}&state=${st}&priceRange=${priceRange}`)
  }

  return (
    <div>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2>Let me find your dream place right now.</h2>
            <h5>Search the best selection of luxury real estate</h5>
            <div className={classes.options}>
              <select name="" id="" onChange={(e)=>{setType(e.target.value)}}>
                <option disabled>Select Type</option>
                <option value="rent">Rent</option>
                <option value="purchase">Purchase</option>
              </select>
              <select name="" id="" onChange={(e)=>{setPriceRange(e.target.value)}}>
                <option disabled>Select Price Range</option>
                <option value="0">0-100,000</option>
                <option value="1">100,000-10,00,000</option>
                <option value="2">10,00,000-50,00,000</option>
                <option value="3">50,00,000-10,00,0000</option>
                <option value="4">10,00,0000-10,00,00000</option>
              </select>
              <input type="text" name="state" placeholder='City' onChange={(e)=>{setSt(e.target.value)} } className={classes.entState}/>
              <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch}/>
            </div>
          </div> 
        </div>
    </div>
  )
}

export default Hero

import React from 'react'
import classes from './footer.module.css';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className={classes.wrapper}>
          <div className={classes.col}>
            <h2>About the App</h2>
          </div>
          <div className={classes.col}>
            <h2>Contacts</h2>
            <span>Phone: +91 8431 617736</span>
          </div>
          <div className={classes.col}>
           <h2>Location</h2>
           <span>Country: India</span>
           <span>Current Location: Belgaum</span>
          </div>
        </div>
        <div className={classes.copyRight}>
        <span >&copy; 2023 Sourabh Banoshi | All Right Reserved</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer

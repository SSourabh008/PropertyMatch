import React, { useState } from 'react'
import classes from './navbar.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose, AiOutlineFileImage,AiFillMessage } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import { useEffect } from 'react'

const Navbar = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setState(prev => {
      return {...prev, state: 'karnataka', type: 'rent'}
    })
  }, [])

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListProperty = async (e) => {
    e.preventDefault();
    console.log(state);
    let filename = null
    console.log(photo);
    if (photo) { 
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append('filename', filename)
      formData.append('image', photo)

      await request("/upload/image", 'POST', {}, formData, true)//{}->options
      console.log("Photo uploaded")
      
    }else {
      return
    }


    try {
      

      const options = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }

      const data = await request("/property", 'POST', options, { ...state, img: filename })
      console.log(data)
      
      setShowForm(false)
      // navigate(`/propertyDetail/${data._id}`)
    } catch (error) {
      // 
      console.log(error);
    }
  }


  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to='/' onClick={scrollToTop} className={classes.left}>
          Property Match.com <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li onClick={scrollToTop} className={classes.listItem}>
          <Link to='/' onClick={scrollToTop} className={classes.left}>
          Home <BsHouseDoor />
        </Link>
          </li>
          <li className={classes.listItem}>
            <Link to='about'>
            About
            </Link>
          </li>
          <li className={classes.listItem}>
            Featured
          </li>
          <li className={classes.listItem}>
            Contacts
          </li>
        </ul>
        <div className={classes.right}>
          {!user ?
            <>
              <Link to='/signup'>Sign up</Link>
              <Link to='/signin'>Sign in</Link>
            </>
            :
            <>
              <Link to='join'><AiFillMessage/></Link>
              
              <span className={classes.username} onClick={() => setShowModal(prev => !prev)}>Hello {user.username}!</span>
              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose onClick={() => setShowModal(prev => !prev)} className={classes.userModalClose} />
                  <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                  <Link  to={`/my-profile`} onClick={() => setShowModal(prev => !prev)} className={classes.myProfile}>My Profile</Link>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                </div>
              )}
            </>
          }
        </div>
      </div>
      {
        // desktop screen
        !showMobileNav && showForm &&
        <div className={classes.listPropertyForm} onClick={handleCloseForm}>
          <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>List Property</h2>
            <form onSubmit={handleListProperty}>
              <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
              <select value={state?.type} required name='type' onChange={handleState}>
                 <option disabled>Select Type</option>
                 <option value='rent'>Rent</option>
                 <option value='purchase'>Purchase</option>
              </select>
              {/* <input value={state?.type} type="text" placeholder='Rent or Purchase' name="type" onChange={handleState} /> */}
              <input value={state?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
              <input value={state?.state} type="text" placeholder='City' name="state" onChange={handleState} />
              <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
              <input value={state?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
              <input value={state?.beds} type="number" placeholder='Beds' name="beds" step={1} min={1} onChange={handleState} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                <input
                  type="file"
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button>List property</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
      


      {/* error */}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </div>
  )
}

export default Navbar
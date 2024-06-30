import {React} from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import PopularProperties from './components/popularProperties/PopularProperties';
import FeaturedProperties from './components/featuredProperties/featuredProperties';
import Newsletter from './components/newsletter/Newsletter';
import Hero from './components/hero/Hero';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import Properties from './components/properties/Properties';
import PropertyDetails from './components/propertyDetail/PropertyDetails';
import Message from './components/Message/Message';
import EditProperty from './components/editProperty/EditProperty';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import MyProfile from './components/myProfile/MyProfile';
import RentProperties from './components/RentProperties/RentProperties';
import PurchaseProperties from './components/PurchaseProperties/PurchaseProperties';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

function App() {
  return (
   <>
        <Routes>
              <Route path='/'  element={
                <>
                  <Navbar />
                  <Hero/>
                  <PopularProperties/>
                  <FeaturedProperties/>
                  
                  <Footer/>
                </>
              }/>
              
              <Route path='/properties'  element={
                <>
                  <Navbar />
                  <Properties/>
                  <Footer/>
                </>
              }/>
              <Route path='/propertyDetails/:id'  element={
                <>
                   <Navbar />
                  <PropertyDetails/>
                  <Footer/>
                </>
              }/>
              <Route path='/my-profile' element={
            <>
              <Navbar />
              <MyProfile />
              <Footer />
            </>
        } />
              <Route path='/signup'  element={<SignUp/>}/>
              <Route path='/signin'  element={<SignIn/>}/>
              <Route path='/join' element={<Join/>}/>
              <Route path='/chat' element={<Chat/>}/>
              <Route path='/rent' element={<RentProperties/>}/>
              <Route path='/about' element={<Footer/>}/>
              <Route path='/editProperty/:id' element={<EditProperty/>}/>
              <Route path='/forgotPassword' element={<ForgotPassword/>}/>
              <Route path='/purchase' element={<PurchaseProperties/>}/>
        </Routes>      
   </>
  );
}

export default App;

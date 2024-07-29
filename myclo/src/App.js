import React from 'react';
import './tailwind.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"; 
import NavbarComponent from './components/NavBar/NavbarComponent';
import Landing from './components/Landing/Landing';
import FooterComponent from './components/Footer/FooterComponent';
import WelcomeComponent from './components/Welcome/WelcomeComponent';
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Contact from './components/Footer/Contact';
import AboutComponent from './components/Content/About';
import Mission from './components/Content/Mission';
import Vision from './components/Content/Vision';


function App() {
  return (
    <>
    <Router>    

<NavbarComponent />   


<Routes>
<Route path="/" element={ <WelcomeComponent/>} />
<Route path="/profile" element={<Registration />} />
<Route path="/login" element={ <Login /> } />
<Route path="/contact" element={ <Contact /> } />
<Route path="/about" element={ <AboutComponent /> } />
<Route path="/mission" element={<Mission />} /> {/* Add route for Learn More Page */}
<Route path="/vision" element={<Vision />} /> {/* Add route for Learn More Page */}





</Routes>
<FooterComponent/>
</Router>


    </>

    

    
    
  );
}

export default App;

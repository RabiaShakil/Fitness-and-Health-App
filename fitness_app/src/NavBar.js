import { Menu , Button } from 'antd';
import { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AboutUs } from './AboutUs';
import { HomePage } from './HomePage.js'
import { SleepTracking } from './SleepTracking';
import { SuggestedBlogs } from './SuggestedBlogs';
import WaterTracking from './WaterTracking';
import { SuggestedMeals } from './SuggestedMeals';
import { SuggestedWorkoutPlans } from './SuggestedWorkoutPlans';
import { AdminOptionsPage } from './AdminOptionsPage';
import { Login } from './Login.js';
import {Personal_Info} from './Personal_Info';
import Videos from './Videos';
import {DietPlan} from'./DietPlan.js';
import { SignUp } from './SignUp';
import ProgressReport from './ProgressReportTrack';
import Nutritionist from './Nutritionist.js';
import{ HealthyRecipe} from './HealthyRecipie';
import {SymptomsCheckerPage} from './SymptomsCheckerPage';
import axios from 'axios';


export function NavBar(props) {
  const { theme } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for auth state on page load
    const authState = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('isAdmin');
    setIsLoggedIn(authState === 'true');
    setIsAdmin(userType==='true');
  }, []);

  const handleAdmin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', 'true');
    setIsLoggedIn(true);
    setIsAdmin(true);
  };
  const handleLogin = () => {
    // Update localStorage and state when user logs in
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    console.log("handlelogin trigger");
  };

const handleLogout = async () => {
  try {
    // Send POST request to server endpoint for logging out
    await axios.post('http://localhost:5000/api/logout');

    // Update localStorage and state when user logs out
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    localStorage.setItem('isAdmin', 'false');
    setIsAdmin(false);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Router>
      
        {isLoggedIn && isAdmin &&(
           <Routes>
            <Route path ="/" element={<AdminOptionsPage logout={handleLogout}/>}/>
            </Routes>)}
        {isLoggedIn && !isAdmin &&(
        <>
        
          <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{display:"flex"}}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
          
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link to="/about">About</Link>
          </Menu.Item>
         
          <Menu.Item>
          <Button onClick={theme.handleClick}>
              Change Theme to {theme.isDarkMode ? "Light" : "Dark"}
            </Button>
          </Menu.Item>

          <Menu.Item style={{ marginLeft: "auto" }}>
          <Button onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
        <Routes>     
        <Route path ="/symptoms-checker" element={<SymptomsCheckerPage/>}/>
          <Route path ="/view-healthy-recipes" element={<HealthyRecipe/>}/>
          <Route path ="/view-nutrionists" element={<Nutritionist/>}/>
          <Route path ="/workout-plan" element={<SuggestedWorkoutPlans/>}/>
          <Route path ="/view-progress" element={<ProgressReport/>}/>
          <Route path ="/view-profile" element={<Personal_Info/>}/>
          <Route path ="/nutrition-plan" element={<DietPlan/>}/>
          <Route path ="/suggested-meals" element={<SuggestedMeals/>}/>
          <Route path ="/water-tracking" element={<WaterTracking/>}/>
          <Route path="/view-blogs" element={<SuggestedBlogs />}/>
          <Route path="/sleep-tracking" element={<SleepTracking />}/>
          <Route path="/watch-videos" element={<Videos />}/>
          <Route path="/about"  element = {<AboutUs/>}>
          </Route>
          <Route path="/contact">
            {/* Add your Contact page component here */}
          </Route>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/signup" element = {<HomePage/>}/>
        </Routes></>)}



      {!isLoggedIn && (
         <Routes>
          <Route path ="/" element={<Login onLogin={{handleLogin , handleAdmin}}></Login>}/>
          <Route path="/signup" element={<SignUp onSignup={handleLogin}></SignUp>}/>
         </Routes>
            

        )}

    </Router>
  );
}
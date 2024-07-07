import { ConfigProvider, theme } from 'antd';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { NavBar } from './NavBar.js'
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutUs } from './AboutUs';
import { HomePage } from './HomePage';
import { SleepTracking } from './SleepTracking';
import { SuggestedBlogs } from './SuggestedBlogs';

const darkOrLight= false;

export default function App (){
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };
  const handleClick = () => {
   setIsDarkMode((previousValue) => !previousValue);
  };
  const { Header, Content } = Layout;
  const { Title, Paragraph } = Typography;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  
  
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return(
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#1890ff",
    },
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}
    
  >
    <div style={{backgroundColor: isDarkMode ? "black": "white"}}>
    <Card style={{  width: "fit-content", height:"fit-content" }}>
    <NavBar log={{isLoggedIn, setIsLoggedIn}}theme={{ isDarkMode, handleClick }}></NavBar>
   </Card>
   </div>
   
  </ConfigProvider>
  
);
} 

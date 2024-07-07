import { Button, ConfigProvider,DatePicker , Breadcrumb, theme } from 'antd';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { HeartOutlined, BarChartOutlined, CalendarOutlined, MedicineBoxOutlined, PlayCircleOutlined, } from '@ant-design/icons';

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook from React Router
import { Sidebar } from './Sidebar.js';


export function HomePage (){
  const navigate = useNavigate(); // Initialize the useHistory hook

  const { Header, Content } = Layout;
  const { Title, Paragraph } = Typography;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleProgressReport = () => {
    navigate('/view-progress'); 
  };
  const handleAnalyzeDataClick = () => {
    navigate('/sleep-tracking'); // Navigate to the SleepTracking page when the card is clicked
  };
  const handleViewMoreBlogs = () => {
    navigate('/view-blogs'); 
  };
  
  const handleWaterTrackingClick=()=>{
    navigate('/water-tracking'); 
  }
  const handleNutritionPlanClick=()=>{
    navigate('/nutrition-plan'); 
  }

  const handleSuggestedMeals=()=>{
    navigate('/suggested-meals'); 
  }
  const handleWorkoutplanClick=()=>{
    navigate('/workout-plan'); 
  } 

  const handleViewVideos=()=>{
    navigate('/watch-videos');
  }
  const handleClick = () => {
   setIsDarkMode((previousValue) => !previousValue);
  };
  
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return(

    <Card style={{ width: "fit-content", height:"fit-content" }}>
      <div style={{ display: 'flex', flexDirection:'row' }}>
        <Sidebar></Sidebar>
        <div style={{ margin:"20px", paddingLeft:"50px"  }}>
        <Content style={{ padding: '50px' }}>
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable onClick={handleProgressReport}>
                <HeartOutlined style={{ fontSize: '64px' , color:'#1890ff' }} />
                <Title level={3}>Track your progress</Title>
                <Paragraph>
                  Record your workouts and track your progress over time with our simple and intuitive interface.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable onClick={handleAnalyzeDataClick}>
                <BarChartOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                <Title level={3}>Analyze your Sleep Quality</Title>
                <Paragraph>
                  Get insights into your sleep and see how well are you sleeping over time.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable onClick={handleWorkoutplanClick}>
                <CalendarOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                <Title level={3}>Plan your workouts</Title>
                <Paragraph>
                  Schedule your workouts and stay on track with our built-in calendar and reminder system.
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col xs={24} sm={12} lg={8}>
            <Card hoverable onClick={handleNutritionPlanClick}>
            <i class="fas fa-utensils"style={{ fontSize: '64px', color: '#1890ff' }} ></i>
              <Title level={3}>Nutrition plan</Title>
              <Paragraph>
                Create and follow a personalized nutrition plan to meet your fitness goals.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
          <Card hoverable onClick={handleWaterTrackingClick}>
          <i class="fas fa-tint" style={{ fontSize: '64px', color: '#1890ff' }}  />
            <Title level={3}>Water tracking</Title>
            <Paragraph>
              Monitor your daily water intake and stay hydrated with our easy-to-use water tracking feature.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable onClick={handleViewVideos}>
            <PlayCircleOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
            <Title level={3}>Videos</Title>
            <Paragraph>
              Watch fitness training videos here. 
            </Paragraph>
          </Card>
        </Col>
        <Card>
        <Title level={2} style={{ marginTop: '50px' }}>Recommended Blogs</Title>
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="blog1" src="https://img.freepik.com/free-vector/holistic-medicine-abstract-concept-vector-illustration-alternative-natural-medicine-holistic-mental-therapy-whole-body-treatment-health-practice-disease-integrative-doctor-abstract-metaphor_335657-1696.jpg?w=2000" style={{ height: '200px', objectFit: 'cover' }} />}>
            <Title level={3}>FitnessBlender</Title>
            <Paragraph>
              HASfit stands for Heart And Soul fitness because we believe everyone deserves to be fit.
            </Paragraph>
            <Button type="primary" onClick={() => window.location.href = "https://www.fitnessblender.com/articles"}>Visit Blog</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="blog2" src="https://i.pinimg.com/736x/17/1d/3a/171d3af76098f4844094b8951d96c047.jpg" style={{ height: '200px', objectFit: 'cover' }} />}>
            <Title level={3}>Tone It Up</Title>
            <Paragraph>
            The Benefits of Mindful Eating can help you become develop a healthier relationship with food.
            </Paragraph>
            <Button type="primary" onClick={() => window.location.href = "https://www.healthline.com/nutrition/mindful-eating-guide"}>Visit Blog</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="blog3" src="https://i.pinimg.com/564x/0c/c7/67/0cc767db28c09cece26017ec036d68e5.jpg" style={{ height: '200px', objectFit: 'cover' }} />}>
            <Title level={3}>Ace Fitness</Title>
            <Paragraph>
              Helping you lose weight, get stronger, live better. We help desk jockeys, nerds, and average Joes level up their lives.
            </Paragraph>
            <Button type="primary"onClick={() => window.location.href = "https://www.acefitness.org/resources/everyone/blog/"}>Visit Blog</Button>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Button type="primary" size="large" onClick={handleViewMoreBlogs}>View More</Button>
      </div>
        </Card>
        <Card>
        <Title level={2} style={{ marginTop: '50px' }}>Suggested Meals</Title>
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="breakfast" src="https://cdn.dribbble.com/users/1522528/screenshots/6123013/adac_socialmedia_march2018-v3.gif" style={{ objectFit: 'cover' }} />}>
            <Title level={3}>Breakfast</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="lunch" src="https://cdn.dribbble.com/users/255091/screenshots/11203805/media/8984c304e48254d24f0d2d9c3df1745c.gif" style={{ objectFit: 'cover' }} />}>
            <Title level={3}>Lunch</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable cover={<img alt="dinner" src="https://i.pinimg.com/originals/15/db/8c/15db8c4de083536fe5193fd395042243.gif" style={{objectFit: 'cover' }} />}>
            <Title level={3}>Dinner</Title>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Button type="primary" size="large" onClick={handleSuggestedMeals}>View Suggested Meals</Button>
      </div>
        </Card>
        </Row>
      </Content>
      </div>
      </div>
      </Card>
      );
    }
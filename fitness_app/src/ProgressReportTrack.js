import React, { useState, useEffect } from "react";
import { Tabs, Progress , Space } from "antd";
import axios from "axios";
const { TabPane } = Tabs;

const ProgressTrackingPage = () => {
const [waterIntake, setWaterIntake] = useState(0);
const [sleepQuality, setSleepQuality] = useState([]);
const [sleepHours, setSleepHours] = useState();
const [caloriesIntake, setCaloriesIntake] = useState(0);
const [caloriesBurnt, setCaloriesBurnt] = useState(0);
const totalSleepHours = 8 * 7; 

const colors = ['#FFA500', '#1890FF', '#52c41a', '#FF69B4', '#FFD700', '#7B68EE', '#00CED1'];
const days = ['Record 1', 'Record 2', 'Record 3', 'Record 4', 'Record 5', 'Record 6', 'Record 7'];

 // assuming you have an array of sleep quality values for each day
const sleepQualityValues = [80, 75, 85, 90, 70, 60, 95];
const data = [30, 50, 70, 80, 60, 90, 100];

const [waterData, setWaterData] = useState([]);
const [sleepData, setSleepData] = useState([]);
    const fetchWaterTrackingData = async ()=> {
    try {
      // make an HTTP GET request to your server-side endpoint
      const response = await axios.get('http://localhost:5000/api/waterTracking');
  
      // filter the response data to only include records from the past 7 days
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
      const filteredData = response.data.filter(record =>
        new Date(record.date) >= sevenDaysAgo && new Date(record.date) <= today);
      // return the filtered data
      return filteredData;
    } catch (error) {
      console.error(error);
    }
  }
// define a function to fetch the sleep tracking data for the past 7 days
    const fetchSleepTrackingData= async() =>{
    try {
      // make an HTTP GET request to your server-side endpoint
      const response = await axios.get('http://localhost:5000/api/sleepTracking');
  
      // filter the response data to only include records from the past 7 days
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
      const filteredData = response.data.filter(record =>
        new Date(record.createdAt) >= sevenDaysAgo && new Date(record.createdAt) <= today);

      // return the filtered data
      return filteredData;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function fetchWaterData() {
      const data = await fetchWaterTrackingData();
      setWaterData(data.map(record => record.consumed));
    }
    fetchWaterData();
  }, [/* dependencies for fetching water data */]);
  
  useEffect(() => {
    async function fetchSleepData() {
      const data = await fetchSleepTrackingData();
      setSleepQuality(data.map(record => record.quality));
      const sleepHours = data.map(record => record.hoursOfSleep);
      const totalSleepHours = sleepHours.reduce((acc, curr) => acc + curr, 0);
      setSleepHours(totalSleepHours);
    }
    fetchSleepData();
  }, [/* dependencies for fetching sleep data */]);
  
  const [workoutTracking, setWorkoutTracking] = useState([]);

  useEffect(() => {
    const fetchWorkoutTracking = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/workoutTracking`);
        setWorkoutTracking(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching workoutTracking records:', error);
      }
    };

    fetchWorkoutTracking();
  }, []);
// calculate the average sleep quality for the past 7 days
const avgSleepQuality = (sleepQuality.slice(-7).reduce((a, b) => a + b, 0) / 7).toFixed(2);



  const handleWaterIntakeChange = (value) => {
    setWaterIntake(value);
  };

  const handleSleepQualityChange = (value) => {
    setSleepQuality(value);
  };

  const handleSleepHoursChange = (value) => {
    setSleepHours(value);
  };

  const handleCaloriesIntakeChange = (value) => {
    setCaloriesIntake(value);
  };

  const handleCaloriesBurntChange = (value) => {
    setCaloriesBurnt(value);
  };

  return (
    <div style={{ minWidth :"93vw" , height:"fit-content", minHeight:"100vh", padding: "24px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Water Intake" key="1">
          <h2>Water Intake past 7 records </h2>
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center ", alignItems:"center"}}>
            {waterData.map((value, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 10 }}><b>{days[index]}</b></div>
                <Progress
                    percent={(value / 96) * 100}
                    strokeColor={colors[index]}
                    showInfo={false}
                    style={{ width: 800 , margin:30 }}
                    strokeWidth={20}
            
                />
                </div>

            ))}
            </div>
        </TabPane>
        <TabPane tab="Sleep Quality" key="2">
        <div style={{  display:"flex", flexDirection:"column", justifyContent:"center ", alignItems:"center"}}>
            <div style={{ width: '50vw', display:"flex", flexDirection:"column", justifyContent:"center ", alignItems:"center"}}>
            <h2>Sleep Hours past week</h2>
            <Progress
            percent={(sleepHours / totalSleepHours) * 100}
            format={() => `${sleepHours} / ${totalSleepHours} hours`}
            status="active"
            strokeColor={{
                from: '#108ee9',
                to: '#87d068',
            }}
            />
            <Progress
                type="circle"
                percent={(sleepHours / totalSleepHours) * 100}
                format={() => `${sleepHours} / ${totalSleepHours} hrs`}
                width={200}
                strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
                }}
            />
            </div>
  
          <div style={{ width: '50vw', display:"flex", flexDirection:"column", justifyContent:"center ", alignItems:"center"}}>
          <h2>Sleep Quality past week</h2>
            <Progress
            percent={avgSleepQuality}
            format={() => `${avgSleepQuality}%`}
            status="active"
            strokeColor={{
                from: '#108ee9',
                to: '#87d068',
            }}
            />

          <Progress
                type="circle"
                percent={avgSleepQuality}
                format={() => `${avgSleepQuality}%`}
                width={200}
                strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
                }}
            />
          </div>
        </div>
        </TabPane>
    
        <TabPane tab="Exercise Tracking" key="3">
        <div>
          <h2>Workout Tracking List</h2>
          {workoutTracking.map((record,index) => (
            <div key={record.goal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', padding: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ marginRight: '24px' }}>
                  <Progress type="dashboard" percent={(record.daysCompleted / 5) * 100} width={200} strokeColor={colors[index]} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '8px' }}>{record.goal}</h3>
                  <p style={{ fontSize: '14px', color: '#888' }}>Total Days: 5</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Days Completed: {record.daysCompleted}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabPane>


        </Tabs>
      </div>
    );
  };
  
  export default ProgressTrackingPage;
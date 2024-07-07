import React, { useState } from 'react';
import { Layout, Input, Button,  message, Progress } from 'antd';
import axios from 'axios';

const { Content } = Layout;

const WaterTracking = () => {
  const [goal, setGoal] = useState(96); // ounces
  const [consumed, setConsumed] = useState(0); // ounces

  const handleChange = (value) => {
    setConsumed(value);
  };
  const handleReset = () => {
    setConsumed(0);
  };

  
  
  const handleReminderClick = () => {
    fetch('http://localhost:5000/api/send-reminder-email', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          console.log('Reminder email sent successfully!');
        
        } else {
          console.error('Failed to send reminder email.');
         
        }
      })
      .catch(error => {
        console.error('Error sending reminder email:', error);
        // Handle the error or display a message to the user
      });
  };

  const handleSubmit = (value) => {
    //some logic 
    // Get all water tracking records for a user
    axios.get('http://localhost:5000/api/get-water-tracking')
   .then(response => {
    const waterTrackingArray = response.data;
  
    // Create a new water tracking record for today's date
    axios.post('http://localhost:5000/api/add-water-record', { consumed })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });

  })
  .catch(error => {
    console.log(error);
  });

  

    setConsumed(0);
    
    
  };
  const handleAdd = () => {
    if(consumed===96){
      message.success("Good job you have achieved your goal of 96 oz!");
    }
    setConsumed(consumed + 8);
   
  };
 

  return (
    <Layout>
      <Content style={{ padding: '50px',minWidth: '96vw', minHeight: '100vh', maxHeight:"fit-content" }}>
        <h1>Water Tracker</h1>
        <div style={{width: '90vw', height: '400px', display: 'flex', justifyContent: 'center', alignItems:"center"}}>
          <Progress
            type="circle"
            percent={(consumed / goal) * 100}
            format={() => `${consumed} oz`}
            width={300}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',  margin:"20px" }}>
          <Input
            type="number"
            placeholder="Add amount consumed (oz)"
            value={consumed}
            onChange={(e) => handleChange(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button type="primary" onClick={handleAdd}>
            Add 8 oz
          </Button>
          <Button onClick={handleReset}>
            Reset
          </Button>
          
        </div>
       <div style={{display: 'flex', flexDirection:"column",justifyContent: 'center',alignItems:"center" }}>
       <h2>Submit at the end of the day </h2>
       <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <br></br>
          <Button type="primary" onClick={handleReminderClick}>
            Give Reminder
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default WaterTracking ;
import { useState } from 'react';
import { Row, Col, Card, Typography, Input, DatePicker, TimePicker, Slider, Button, Progress , Space, message , Form} from 'antd';
import axios from 'axios';
const { Title } = Typography;
const { RangePicker } = DatePicker;


export function SleepTracking() {
  const [sleepQuality, setSleepQuality] = useState(50); // Initialize the state variable with a default value of 50
  const [hoursOfSleep, setHoursOfSleep] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [goal, setGoal] = useState(8); //8hrs of sleep
  const [form] = Form.useForm();

  const handleHoursOfSleepChange = (e) => {
    setHoursOfSleep(e.target.value);
  };


  function handleTimeChange(value) {
    setSelectedTime(value);
  }

  const timePicker = (
    <TimePicker
      size="large"
      value={selectedTime}
      onChange={handleTimeChange}
    />
  );

  function handleButtonClick() {
    console.log('Selected Start Time:', selectedTime);
  }

  const handleSubmit = () => {
   console.log("here at handle submit");
     // Make an axios post request to send the sleep data to the server
      axios.post('http://localhost:5000/api/add-sleep-record', {
        hoursOfSleep: hoursOfSleep,
        quality: sleepQuality,
        startTime: selectedTime.format('hh:mm A')
      })
      .then(function (response) {
        console.log('Sleep data stored on server:', response.data);
        message.success('Sleep data successfully submitted for the day !')
      })
      .catch(function (error) {
        console.log('Error storing sleep data on server:', error);
      });
  };

  const handleSleepQualityChange = (value) => {
    setSleepQuality(value);
  }

  return (
    <div style={{width :"96vw" , height:"100vh" }}>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Sleep Tracking</Title>
      </Col>
      <Col xs={24} sm={12}>
        <Card title="Enter Sleep Data" >
          <Form form={form}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5} style={{marginBottom: '8px'}}>Hours of Sleep</Title>
                <Input size="large" placeholder="Enter hours of sleep" value={hoursOfSleep} onChange={handleHoursOfSleepChange} />
              </Col>

              <Col span={24}>
                <Title level={5} style={{marginBottom: '8px'}}>Today's Sleep Start Time</Title>
                {timePicker}
                {selectedTime && <div>Selected Time: {selectedTime.format('hh:mm A')}</div>}
              </Col>
              <Col span={24}>
                <Title level={5} style={{marginBottom: '8px'}}>Today's Sleep Quality</Title>
                <Slider value={sleepQuality} onChange={handleSleepQualityChange} defaultValue={50} />
              </Col>
              <Col span={24}>
                <Button type="primary" htmlType="submit" size="large" style={{marginBottom: '8px'}} onClick={handleSubmit}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col xs={24} sm={12}>
        <Card title="Sleep Data Visualization" >
          <Space direction="vertical" style={{textAlign: 'center'}}>
            <Title level={5} style={{marginBottom: '8px', marginTop: '24px'}}>Hours of Sleep Progress (goal 8hrs) </Title>
            <Progress
            type="circle"
            percent={(hoursOfSleep / goal) * 100}
            format={() => `${hoursOfSleep} hrs`}
            strokeWidth={12} 
          />
            <Title level={5} style={{marginBottom: '8px'}}>Sleep Quality Progress</Title>
            <Progress type="circle" percent={sleepQuality} strokeWidth={12} strokeColor="#1890ff" />
        </Space>
        </Card>
    </Col>
    </Row>
    </div>
    )
}
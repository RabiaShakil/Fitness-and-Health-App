import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Layout, Form, Input, InputNumber, Select, Button, message, Modal } from 'antd';
import './Personal_Info.css';

const { Content } = Layout;
const { Option } = Select;


export function Personal_Info(){
  const activityData = [  { label: 'Walked 1 mile', points: 10 },{ label: 'Did Cardiac Wrokout', points: 30 },  { label: 'Ran 1 mile', points: 20 },  { label: 'Biked 5 miles', points: 30 },  { label: 'Swam 20 laps', points: 40 },];
  const [userData, setUserData] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    disease: 'None',
    points: 0,
  });

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState(false);
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/login-info`,  { withCredentials: true });
      console.log("useEffect "+response.data.user);
      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleActivity = (activity) => {
    var points = activity.points;
    console.log(points);
    var updatedPoints=userData.points +points;
    console.log("update points " + updatedPoints);
    axios.post('http://localhost:5000/updateUserPoints', { points: updatedPoints })
    .then(response => {
      console.log(response.data);
      setUserData({
        ...userData,
        points: updatedPoints
      });
      message.success('Activity recorded successfully');
    })
    .catch(error => {
      console.error(error);
      message.error('Failed to record activity');
    });
  };


  const onFinish = async (values) => {
    try {
      const updatedUserData = {
        weight: values.weight,
        height: values.height,
        age: values.age,
        gender: values.gender,
        disease: values.disease,
        points: userData.points,
      };
  
      const response = await axios.put('http://localhost:5000/api/user/profile', updatedUserData);
      setUserData(updatedUserData);
      setVisible(false);
      // handle success response here
    } catch (error) {
      // handle error here
    }
  };
  

  const showModal = () => {
    setVisible(true);
    setIsEditable(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsEditable(false);
  };

  return (
    <Layout>
       <div className='container'> 
        <div className="logo" >
        <h2>PERSONAL INFO</h2><br></br>
        </div>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <div className="user-info">
            <div className="user-data">
              <div className="personal-info">
                <div className="image-container">
                  <img src="info.gif" alt="User Profile" style={{borderRadius:"95%"}}/>
                </div>
                <div className="info-container">
                  <div className="info-item">
                    <p>Weight: </p>
                    <span>{userData.weight} kg</span>
                  </div>
                  <div className="info-item">
                    <p>Height: </p>
                    <span>{userData.height} cm</span>
                  </div>
                  <div className="info-item">
                    <p>Age: </p>
                    <span>{userData.age} years</span>
                  </div>
                  <div className="info-item">
                    <p>Gender: </p>
                    <span>{userData.gender}</span>
                  </div>
                  <div className="info-item">
                    <p>Disease: </p>
                    <span>{userData.disease}</span>
                  </div>
                  <br></br><br></br>
                  <Button className='editbtn' type="primary" onClick={showModal}>
                    Edit Personal Info
                </Button>
                </div>
              </div>
   
              
            </div>
           
            <Modal
              title="Edit Personal Info"
              visible={visible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form}
                name="user-data"
                initialValues={{
                  weight: userData.weight,
                  height: userData.height,
                  age: userData.age,
                  gender: userData.gender,
                  disease: userData.disease,
                  medication: userData.medication,
                }}
                onFinish={onFinish}
              >
            <Form.Item
              label="Weight"
              name="weight"
              rules={[
                {
                  required: true,
                  message: "Please input your weight!",
                },
              ]}
            >
              <InputNumber min={1} max={999} />
            </Form.Item>
            <Form.Item
              label="Height"
              name="height"
              rules={[
                {
                  required: true,
                  message: "Please input your height!",
                },
              ]}
            >
              <InputNumber min={1} max={999} />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please input your age!",
                },
              ]}
            >
              <InputNumber min={1} max={120} />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select your gender!",
                },
              ]}
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Disease" name="disease">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="user-activity">
        <h2>Activity Tracker:</h2>
        <div className="activity-list">
          {activityData.map((activity) => (
            <div className="activity-item" key={activity.label}>
              <p>{activity.label}</p>
              <p>points : {activity.points}</p>
              <Button type="primary" onClick={() => handleActivity(activity)}>
                Add
              </Button>
            </div>
          ))}
        </div>
        <div className="total-points">
          <br></br>
          <p>Total Points: {userData.points}</p>
        </div>
      </div>
    </div>
  </Content>
  </div>
  </Layout>

);
};

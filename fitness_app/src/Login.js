import React, { useState } from "react";
import axios from 'axios';
import { Form, Input, Button, Checkbox, Typography , Row, Col, Card} from "antd";
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

export function Login(props) {
  const { onLogin } = props;
  const navigate = useNavigate(); // Initialize the useHistory hook
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignup =()=>{
    navigate('/signup');
  }
  
  const onFinish = async (values) => {
    var found = false;
    var admin = false;
  
    // Perform login logic here
  
    // Perform form validation
    if (!values.email || !values.password) {

      alert("Please fill all fields."+"username = " +values.email+ values.password);
      return;
    }
  
    // Make HTTP request to authenticate user
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: values.email,
        password: values.password,
      });
  
      // Handle successful authentication
      console.log("user login " + response);
      if (response.data.success) {
        if (response.data.isAdmin) {
          found = true;
          admin = true;
        } else {
          found = true;
        }
      } else {
        alert("This user does not exist.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in.");
    }
  
    if (found) {
      if (admin) {
        console.log("Admin logged in");
        onLogin.handleAdmin();
      } else {
        console.log("User logged in" );
        onLogin.handleLogin();
      }
    }
  };
  

  return (
    <Card style={{ minWidth: "96vw", minHeight: "100vh", maxHeight: "fit-content", maxWidth: "fit-content" }}>
       <Row gutter={[32, 32]} justify="center" align="middle">
       <Col>
        <img src="FitnessApps.gif" height="600px" width="500px" alt="fitness"></img>
      </Col>

      <Col>
        <Title style={{ textAlign: "center" }}>FITNESS AND HEALTH APP</Title>

        <Form form={form} onFinish={onFinish}>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
          labelCol={{ span: 6 }} // set the span for the label column
          wrapperCol={{ span: 18 }} // set the span for the wrapper column
        >
          <Input placeholder="Username" />
        </Form.Item>

          <Form.Item 
          label ="Password" 
          name="password" 
          rules={[{ required: true, message: 'Please input your password!' }]}
          labelCol={{ span: 6 }} 
          wrapperCol={{ span: 18 }}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item 
          labelCol={{ span: 6 }} 
          wrapperCol={{ span: 18 }}
          justify="center" align="middle"
          >
            
          <Button type="primary" htmlType='submit'>
            Login
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={handleSignup}>
              Sign Up
            </Button>
             
          </Form.Item>
         
        </Form>
      </Col>
       </Row>
    </Card>
  );
}

export default Login;
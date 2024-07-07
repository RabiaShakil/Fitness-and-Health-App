import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

export function SignUp(props) {
  const { onSignup } = props;
  const [error, setError] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
 
  const handleFinish = (values) => {
    console.log("handleFinish called with values: ", values);
    setSignupClicked(true);
    // Perform validation on fields
    if (!values.email || !values.password || !values.gender || !values.height || !values.weight || !values.age || !values.gender) {
      setError('Please enter all the fields');
      return;
    }
    // Make a request to the server using Axios
    axios.post('http://localhost:5000/api/signup', values)
      .then(response => {
        // Update the state with the received data
        console.log(response.data);
        onSignup();
      
       })
      .catch(error => {
        setError(error.response.data.message);
        console.log("error"+error.response.data.message);
      });
  };

  return (
    <div style={{ minWidth: "96vw", minHeight: "100vh", maxHeight: "fit-content", maxWidth: "fit-content" }}>
      <div className='container'>
        <h1>Signup</h1>
        <br />
        <div className='form-container'>
          <Form onFinish={handleFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: 'Please input your age!' }]}
            >
              <Input type="number" placeholder="Age" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Height(in inches)"
              name="height"
              rules={[{ required: true, message: 'Please input your height!' }]}
            >
              <Input type="number" placeholder="Height" />
            </Form.Item>

            <Form.Item
              label="Weight (in kg)"
              name="weight"
              rules={[{ required: true, message: 'Please input your weight!' }]}
            >
              <Input type="number" placeholder="Weight" />
            </Form.Item>

            <Form.Item
              label="Disease (if any)"
              name="disease"
            >
              <Input placeholder="Disease" />
            </Form.Item>

            <Form.Item
              label="Allergic to food (if any)"
              name="food"
            >
              <Input placeholder="Allergic to food" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>

            <Form.Item>
              {error && <div className="error">{error}</div>}
            </Form.Item>
          </Form>
        </div>
        <div className='img-container'>
          <img src='Signup.gif' alt="Signup" />
        </div>
      </div>
    </div>
  )
}
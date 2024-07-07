import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input,Row , Col  , message} from "antd";
import { FaStar } from "react-icons/fa";

const weeklyDietPlans = {
  cardiac: [
    ["Monday", "Oatmeal", "Greek Yogurt", "Grilled Chicken Salad", "Apple", "Grilled Fish"],
    ["Tuesday", "Egg White Omelette", "Fruit Smoothie", "Grilled Fish", "Almonds", "Quinoa Salad"],
    ["Wednesday", "Whole Wheat Toast", "Cottage Cheese", "Chicken and Vegetable Stir Fry", "Orange", "Baked Chicken"],
    ["Thursday", "Greek Yogurt", "Fruit Salad", "Grilled Salmon", "Carrots", "Grilled Chicken Breast"],
    ["Friday", "Omelette with Vegetables", "Green Smoothie", "Grilled Chicken Salad", "Celery Sticks", "Grilled Fish"],
    ["Saturday", "Whole Wheat Pancakes", "Cottage Cheese", "Tuna Salad", "Grapefruit", "Baked Chicken"],
    ["Sunday", "Egg White Omelette", "Greek Yogurt", "Grilled Chicken Breast", "Apple", "Grilled Fish"],
  ],
  gastritis: [
    ["Monday", "Oatmeal", "Banana", "Rice with Boiled Chicken", "Papaya", "Grilled Fish"],
    ["Tuesday", "Egg White Omelette", "Cucumber Slices", "Lentil Soup", "Almonds", "Boiled Vegetables"],
    ["Wednesday", "Whole Wheat Toast", "Cottage Cheese", "Grilled Chicken Breast", "Orange", "Baked Fish"],
    ["Thursday", "Greek Yogurt", "Fruit Salad", "Grilled Fish", "Carrots", "Steamed Vegetables"],
    ["Friday", "Omelette with Vegetables", "Green Smoothie", "Tuna Salad", "Celery Sticks", "Grilled Chicken Breast"],
    ["Saturday", "Whole Wheat Pancakes", "Cottage Cheese", "Chicken and Vegetable Stir Fry", "Grapefruit", "Baked Fish"],
    ["Sunday", "Egg White Omelette", "Greek Yogurt", "Grilled Fish", "Apple", "Grilled Chicken Breast"],
  ],
  weightLoss: [
    ["Monday", "Oatmeal", "Banana", "Grilled Chicken Salad", "Carrots", "Grilled Fish"],
    ["Tuesday", "Egg White Omelette", "Green Smoothie", "Grilled Fish", "Almonds", "Quinoa Salad"],
    ["Wednesday", "Whole Wheat Toast", "Cottage Cheese", "Chicken and Vegetable Stir Fry", "Grapefruit", "Baked Chicken"],
    ["Thursday", "Greek Yogurt", "Fruit Salad", "Grilled Chicken Breast", "Celery Sticks", "Grilled Fish"],
    ["Friday", "Omelette with Vegetables", "Apple", "Grilled Chicken Salad", "Orange", "Grilled Fish"],
    ["Saturday", "Whole Wheat Pancakes", "Cottage Cheese", "Tuna Salad", "Carrots", "Baked Chicken"],
    ["Sunday", "Egg White Omette", "Greek Yogurt", "Grilled Fish", "Apple", "Grilled Chicken Breast"],
  ],
  diabetes: [
    ["Monday", "Oatmeal with Nuts", "Green Smoothie", "Lentil Soup", "Almonds", "Grilled Fish"],
    ["Tuesday", "Egg White Omelette", "Fruit Salad", "Grilled Chicken Breast", "Celery Sticks", "Steamed Vegetables"],
    ["Wednesday", "Whole Wheat Toast", "Cottage Cheese", "Grilled Fish", "Orange", "Baked Chicken"],
    ["Thursday", "Greek Yogurt", "Carrots", "Tuna Salad", "Papaya", "Grilled Chicken Breast"],
    ["Friday", "Omelette with Vegetables", "Apple", "Grilled Fish", "Carrots", "Boiled Vegetables"],
    ["Saturday", "Whole Wheat Pancakes", "Cottage Cheese", "Grilled Chicken Salad", "Grapefruit", "Baked Fish"],
    ["Sunday", "Egg White Omelette", "Greek Yogurt", "Brown Rice with Boiled Chicken", "Apple", "Grilled Fish"],
  ],
  muscleGain: [
    ["Monday", "Oatmeal with Nuts", "Greek Yogurt", "Grilled Chicken Breast", "Almonds", "Baked Fish"],
    ["Tuesday", "Egg White Omelette", "Fruit Smoothie", "Grilled Fish", "Celery Sticks", "Quinoa Salad"],
    ["Wednesday", "Whole Wheat Toast", "Cottage Cheese", "Grilled Chicken Breast", "Grapefruit", "Baked Chicken"],
    ["Thursday", "Greek Yogurt", "Carrots", "Tuna Salad", "Papaya", "Grilled Fish"],
    ["Friday", "Omelette with Vegetables", "Apple", "Grilled Chicken Salad", "Orange", "Steak"],
    ["Saturday", "Whole Wheat Pancakes", "Cottage Cheese", "Grilled Chicken Breast", "Almonds", "Baked Fish"],
    ["Sunday", "Egg White Omelette", "Greek Yogurt", "Grilled Fish", "Carrots", "Steak"],
  ],
};



export function DietPlan() {
  const [dietPlan, setDietPlan] = useState("cardiac");
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [form] = Form.useForm(); // Create a form instance
  const [currentDietPlan, setCurrentDietPlan] = useState(null);
  const [dietplanDataSource, setDietplanDataSource] = useState([]);

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-diet-plans');
        const data = response.data;
        setDietplanDataSource(data);
      } catch (error) {
        console.error('Error fetching diet plans:', error);
      }
    };

    fetchDietPlans();
  }, []);
  const columns = [
    { title: "", dataIndex: 0, key: 0 },
    { title: "Breakfast", dataIndex: 1, key: 1 },
    { title: "Snack 1", dataIndex: 2, key: 2 },
    { title: "Lunch", dataIndex: 3, key: 3 },
    { title: "Snack 2", dataIndex: 4, key: 4 },
    { title: "Dinner", dataIndex: 5, key: 5 },
  ];

  const data = weeklyDietPlans[dietPlan];

  const handlePlanChange = (plan) => {
    setDietPlan(plan);
  };

  const handleReviewClick = () => {
    setModalVisible(true);
    setRating(0); // Reset the rating
    form.resetFields(); // Clear the form field value
  };

  const handleReviewSubmit = (values) => {
    console.log("Review submitted:", values);
    // Handle the review submission here
    console.log(values); // replace with your desired behavior
    const payload = {
      ...values,
      rating:rating,
      dietPlanName: currentDietPlan.name,
      dietPlan: currentDietPlan._id
    };
    console.log(payload);
    
      // make axios call to submit feedback
      axios.post('http://localhost:5000/api/submit-review', payload)
        .then(response => {
          message.success('Review submitted successfully');
          
        })
        .catch(error => {
          console.log('Error submitting review: ', error);
          setModalVisible(false);
        });
    setModalVisible(false);
  };

  return (
    <div style={{width :"96vw" , height:"fit-content", minHeight:"100vh" }}>
      <div>
        <div className="logo">
          <h2>DIET PLAN</h2>
        </div>
        <br></br>
      </div>
      <br></br>
  
      <div>
      <Row gutter={[16, 16]}>
        {dietplanDataSource.map(plan => (
          <Col key={plan._id} xs={24} md={8}>
            <div style={{ padding: '16px', border: '1px solid #e8e8e8' }}>
              <h2>{plan.name}</h2>
              <Button type="primary" onClick={() => setCurrentDietPlan(plan)}>
                View Diet Plan
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>

    {currentDietPlan && (
  <>
    <h2>{currentDietPlan.name}</h2>
    <Table dataSource={Object.entries(currentDietPlan).filter(([key, value]) => key !== "_id" && key !== "name" && key !== "__v").map(([day, meals]) => ({day: day.charAt(0).toUpperCase() + day.slice(1), ...meals}))} pagination={false}>
      <Table.Column title="Day" dataIndex="day" key="day" />
      <Table.Column title="Breakfast" dataIndex="breakfast" key="breakfast" />
      <Table.Column title="Snack 1" dataIndex="snack1" key="snack1" />
      <Table.Column title="Lunch" dataIndex="lunch" key="lunch" />
      <Table.Column title="Snack 2" dataIndex="snack2" key="snack2" />
      <Table.Column title="Dinner" dataIndex="dinner" key="dinner" />
    </Table>
  </>
)}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button type="primary" onClick={handleReviewClick}>
          <i className="fa fa-thumbs-up" aria-hidden="true" color="white" size="15"></i>
          &nbsp;&nbsp;&nbsp;&nbsp;Give Review
        </Button>
      </div>
     
      <Modal
        title="Diet Plan Review"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Form form={form} onFinish={handleReviewSubmit}>
          <Form.Item
            label="Your review"
            name="review"
          >
            <Input.TextArea name="comment" placeholder="Enter your review here" />
          </Form.Item>

          <Form.Item>
          <label> Your Rating:&nbsp;&nbsp; &nbsp;</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                color={rating >= star ? "#1890ff" : "#c0c0c0"}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
        </div>
      </Modal>
      
    </div>
  );
};
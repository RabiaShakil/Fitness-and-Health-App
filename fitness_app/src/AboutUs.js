import { Typography, Button, Space, Divider } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './AboutUs.css';

const { Title, Paragraph } = Typography;

export function AboutUs() {
  return (
    <div className="container">
      <div style={{ minWidth: '50vw', minHeight: '100vh', maxHeight:"fit-content"}}>
      <Title>About Our Fitness App</Title>
      <Paragraph>
        Our fitness app is designed to help you achieve your fitness goals by providing personalized workout plans and tracking your progress.
      </Paragraph>
      <Paragraph>
        With our app, you can easily create a workout plan that fits your schedule and preferences. You can also track your workouts, set goals, and see your progress over time.
      </Paragraph>
      <Paragraph>
        Our app also provides a variety of workout routines and exercises, from strength training to cardio, to help you reach your fitness goals. Whether you're a beginner or an experienced athlete,
         our app has something for you.
      </Paragraph>
      <Paragraph>
        Download our app today and start your fitness journey!
      </Paragraph>
    
        <Title level={3} className="contact-title">Contact Us</Title>
        <Paragraph className="contact-paragraph">
          If you have any questions or feedback, please feel free to reach out to us.
        </Paragraph>
        <Space size="middle" className="contact-buttons">
          <Button icon={<MailOutlined />} type="primary" className="contact-button email-button">
            Email
          </Button>
          <Button icon={<PhoneOutlined />} type="primary" className="contact-button phone-button">
            Call
          </Button>
        </Space>
      </div>
    </div>
  );
}
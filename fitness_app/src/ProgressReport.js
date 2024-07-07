import React from 'react';
import { Card, Typography, Statistic, Row, Col, Progress } from 'antd';
import { LineChartOutlined, FireOutlined, ClockCircleOutlined, TrophyOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProgressReport = ({ activityData }) => {
  // Dummy data for testing purposes
  const totalDuration = 320;
  const averageDuration = 53.33;
  const totalCaloriesBurned = 1200;
  const longestDuration = 90;
  const shortestDuration = 15;
  const totalDistanceCovered = 5.25;

  // Calculate progress percentage
  const progressPercentage = (totalDuration / (24 * 60)) * 100; // Assuming a day has 24 hours

  return (
   <div style={{ padding: '50px',minWidth: '90vw', minHeight: '100vh', maxHeight:"fit-content" }}>
    <Card title={<Title level={3}>Progress Report</Title>} style={{ textAlign: 'center' ,width: '100%',backgroundColor: '#1890ff', }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Total Activity Duration"
            value={totalDuration}
            suffix="minutes"
            prefix={<ClockCircleOutlined />}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Average Activity Duration"
            value={averageDuration.toFixed(2)}
            suffix="minutes"
            prefix={<LineChartOutlined />}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Total Calories Burned"
            value={totalCaloriesBurned}
            suffix="calories"
            prefix={<FireOutlined />}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Longest Activity Duration"
            value={longestDuration}
            suffix="minutes"
            prefix={<TrophyOutlined />}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Shortest Activity Duration"
            value={shortestDuration}
            suffix="minutes"
            prefix={<LineChartOutlined />}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Statistic
            title="Total Distance Covered"
            value={totalDistanceCovered}
            suffix="miles"
            prefix={<LineChartOutlined />}
          />
        </Col>
      </Row>
      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 >&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            Progress Percentage : {progressPercentage.toFixed(2)}%</h2>
          
        </div>
       
      </div>
    </Card>
    </div>
  );
};

export default ProgressReport;

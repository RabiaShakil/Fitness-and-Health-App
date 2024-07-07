import React, { useState } from 'react';
import axios from 'axios';
import { Card, Typography, List, Divider, Select , Progress , Button, message} from 'antd';

const { Title } = Typography;
const { Option } = Select;


export function SuggestedWorkoutPlans() {
  const [selectedGoal, setSelectedGoal] = useState('Weight Loss');
  const [completedDays, setCompletedDays] = useState(0);
  const workoutPlanData = [
    {
      goal: 'Weight Loss',
      days: [
        {
          day: 'Day 1 - Cardio',
          exercises: [
            { name: 'Running', duration: '30 minutes' },
            { name: 'Jumping Jacks', duration: '3 sets of 20 reps' },
            { name: 'Cycling', duration: '20 minutes' },
          ],
        },
        {
          day: 'Day 2 - Strength Training',
          exercises: [
            { name: 'Squats', sets: 3, reps: 12 },
            { name: 'Push-ups', sets: 3, reps: 10 },
            { name: 'Plank', duration: '3 sets of 30 seconds' },
          ],
        },
        {
          day: 'Day 3 - HIIT',
          exercises: [
            { name: 'Burpees', sets: 4, reps: 10 },
            { name: 'Mountain Climbers', duration: '3 sets of 30 seconds' },
            { name: 'Jumping Lunges', sets: 3, reps: 12 },
          ],
        },
        {
          day: 'Day 4 - Upper Body',
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 10 },
            { name: 'Dumbbell Rows', sets: 3, reps: 12 },
            { name: 'Tricep Dips', sets: 3, reps: 10 },
          ],
        },
        {
          day: 'Day 5 - Lower Body',
          exercises: [
            { name: 'Lunges', sets: 3, reps: 10 },
            { name: 'Deadlifts', sets: 4, reps: 8 },
            { name: 'Calf Raises', sets: 3, reps: 12 },
          ],
        },
      ],
    },
    {
        goal: 'Muscle Gain',
        days: [
          {
            day: 'Day 1 - Chest and Triceps',
            exercises: [
              { name: 'Bench Press', sets: 4, reps: 8 },
              { name: 'Tricep Dips', sets: 3, reps: 10 },
              { name: 'Chest Flyes', sets: 3, reps: 12 },
            ],
          },
          {
            day: 'Day 2 - Back and Biceps',
            exercises: [
              { name: 'Deadlifts', sets: 4, reps: 8 },
              { name: 'Pull-ups', sets: 3, reps: 'AMRAP' },
              { name: 'Barbell Curls', sets: 3, reps: 10 },
            ],
          },
          {
            day: 'Day 3 - Legs',
            exercises: [
              { name: 'Squats', sets: 4, reps: 8 },
              { name: 'Leg Press', sets: 3, reps: 10 },
              { name: 'Romanian Deadlifts', sets: 3, reps: 12 },
            ],
          },
          {
            day: 'Day 4 - Shoulders',
            exercises: [
              { name: 'Overhead Press', sets: 4, reps: 8 },
              { name: 'Side Lateral Raises', sets: 3, reps: 10 },
              { name: 'Front Raises', sets: 3, reps: 12 },
            ],
          },
          {
            day: 'Day 5 - Full Body',
            exercises: [
              { name: 'Squats', sets: 4, reps: 8 },
              { name: 'Bench Press', sets: 4, reps: 8 },
              { name: 'Pull-ups', sets: 3, reps: 'AMRAP' },
              { name: 'Barbell Rows', sets: 3, reps: 10 },
              { name: 'Overhead Press', sets: 4, reps: 8 },
              { name: 'Hammer Curls', sets: 3, reps: 10 },
              { name: 'Tricep Dips', sets: 3, reps: 10 },
              { name: 'Russian Twists', sets: 3, reps: 12 },
            ],
          },
        ],
      },
      {
        goal: 'Toning',
        days: [
          {
            day: 'Day 1 - Full Body',
            exercises: [
              { name: 'Squats', sets: 3, reps: 12 },
              { name: 'Lunges', sets: 3, reps: 10 },
              { name: 'Push-ups', sets: 3, reps: 10 },
              { name: 'Plank', duration: '3 sets of 30 seconds' },
            ],
          },
          {
            day: 'Day 2 - Arms and Shoulders',
            exercises: [
              { name: 'Dumbbell Shoulder Press', sets: 3, reps: 10 },
              { name: 'Bicep Curls', sets: 3, reps: 12 },
              { name: 'Tricep Kickbacks', sets: 3, reps: 10 },
            ],
          },
          {
            day: 'Day 3 - Legs and Glutes',
            exercises: [
              { name: 'Sumo Squats', sets: 3, reps: 12 },
              { name: 'Hip Thrusts', sets: 3, reps: 10 },
              { name: 'Walking Lunges', sets: 3, reps: '20 steps' },
            ],
          },
          {
            day: 'Day 4 - Core',
            exercises: [
              { name: 'Russian Twists', sets: 3, reps: 12 },
              { name: 'Plank Jacks', sets: 3, reps: 10 },
              { name: 'Mountain Climbers', sets: 3, reps: '20 reps' },
            ],
          },
          {
            day: 'Day 5 - Upper Body',
            exercises: [
              { name: 'Push-ups', sets: 3, reps: 10 },
              { name: 'Renegade Rows', sets: 3, reps: 10 },
              { name: 'Tricep Dips', sets: 3, reps: 12 },
            ],
          },
          // Add more days as needed
        ],
      },
    ]      
         
  

  const handleGoalChange = (value) => {
    setSelectedGoal(value);
    setCompletedDays(0);
  };

  const handleIncreaseProgress = () => {
    setCompletedDays((prevCompletedDays) => prevCompletedDays + 1);
    saveProgress(selectedGoal, completedDays + 1);
  };

  const handleDecreaseProgress = () => {
    if (completedDays > 0) {
      setCompletedDays((prevCompletedDays) => prevCompletedDays - 1);
      saveProgress(selectedGoal, completedDays - 1);
    }
  };

  const saveProgress = async (goal, daysCompleted) => {
    try {
      const response = await axios.post('http://localhost:5000/api/workout/progress', {
        goal,
        daysCompleted,
      });
      message.success('Progress saved successfully:');
    } catch (error) {
      message.error('Error saving progress:');
    }
  };

  const filteredWorkoutPlan = workoutPlanData.find((goal) => goal.goal === selectedGoal);

  return (
    <div style={{ width: '96vw', height: 'fit-content', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Title level={2}>Workout Plan</Title>

      <Select value={selectedGoal} style={{ width: 120 }} onChange={handleGoalChange}>
        <Option value="Weight Loss">Weight Loss</Option>
        <Option value="Muscle Gain">Muscle Gain</Option>
        <Option value="Toning">Toning</Option>
      </Select>

      {filteredWorkoutPlan && (
        <div style={{ width: '50vw', height: 'fit-content', minHeight: '100vh' }}>
          <Title level={3}>{filteredWorkoutPlan.goal}</Title>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{width :"600px" }}>
              <Progress percent={(completedDays / filteredWorkoutPlan.days.length) * 100} />
            </div>
            <div>
              <Button onClick={handleDecreaseProgress} disabled={completedDays === 0}>-</Button>
              <Button onClick={handleIncreaseProgress} disabled={completedDays === filteredWorkoutPlan.days.length}>+</Button>
            </div>
          </div>

          {filteredWorkoutPlan.days.map((day, index) => (
            <div key={index}>
              <Card title={day.day}>
                <List
                  dataSource={day.exercises}
                  renderItem={(exercise) => (
                    <List.Item>
                      <List.Item.Meta
                        title={exercise.name}
                        description={
                          exercise.sets
                            ? `Sets: ${exercise.sets}, Reps: ${exercise.reps}`
                            : `Duration: ${exercise.duration}`
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
              {index !== day.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      )}
   </div>
  );
};
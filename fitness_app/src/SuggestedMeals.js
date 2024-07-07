import React, { useState } from 'react';
import { InputNumber, Button, List, Select, Modal } from 'antd';
import axios from 'axios';

const { Option } = Select;

export function SuggestedMeals() {
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [mealType, setMealType] = useState('breakfast');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleMinCaloriesChange = (value) => {
    setMinCalories(value);
  };

  const handleMaxCaloriesChange = (value) => {
    setMaxCalories(value);
  };

  const handleMealTypeChange = (value) => {
    setMealType(value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=910968da&app_key=10e0ced5296b33badae66e72cd27ca61&mealType=${mealType}`
      );
      const meals = response.data.hits.map((hit) => ({
        name: hit.recipe.label,
        calories: Math.round(hit.recipe.calories),
        imageUrl: hit.recipe.image,
        ingredients: hit.recipe.ingredients,
        recipeUrl: hit.recipe.url,
      })).filter((meal) => meal.calories >= minCalories && meal.calories <= maxCalories);
      setMeals(meals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleModalClose = () => {
    setSelectedMeal(null);
  };

  return (
    <div style={{minWidth: '96vw', minHeight: '100vh', maxHeight:"fit-content"}}>
      <h2>Suggested Meals</h2>
      <div>
        <InputNumber
          placeholder="Minimum Calories"
          min={0}
          max={10000}
          step={1}
          value={minCalories}
          onChange={handleMinCaloriesChange}
        />
        &nbsp;&ndash;&nbsp;
        <InputNumber
          placeholder="Maximum Calories"
          min={0}
          max={10000}
          step={1}
          value={maxCalories}
          onChange={handleMaxCaloriesChange}
        />
        &nbsp;
        <Select defaultValue="breakfast" style={{ width: 120 }} onChange={handleMealTypeChange}>
          <Option value="breakfast">Breakfast</Option>
          <Option value="lunch">Lunch</Option>
          <Option value="dinner">Dinner</Option>
        </Select>
        &nbsp;
        <Button type="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={meals}
          renderItem={(meal) => (
            <List.Item onClick={() => handleMealClick(meal)}>
              <div style={{ textAlign: 'center' }}>
                <img src={meal.imageUrl} alt={meal.name} />
                <p>{meal.name}</p>
                <p>{meal.calories} Calories</p>
              </div>
            </List.Item>
          )}
        />
      </div>
        <Modal
        visible={selectedMeal !== null}
        title={selectedMeal?.name}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="recipe" type="primary" href={selectedMeal?.recipeUrl} target="_blank">
            Recipe
          </Button>,
        ]}
      >
        <div>
          <img src={selectedMeal?.imageUrl} alt={selectedMeal?.name} style={{ width: '100%' }} />
          <h3>Ingredients:</h3>
          <ul>
            {selectedMeal?.ingredients.map((ingredient) => (
              <li key={ingredient.text}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}    
       
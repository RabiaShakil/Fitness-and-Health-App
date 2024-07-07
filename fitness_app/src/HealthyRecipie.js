import React from 'react';
import { Card, Row, Col } from 'antd';
import './HealthyRecipie.css'

const RecipeCard = ({ title, ingredients, instructions }) => {
  return (
    <Card title={title}>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </Card>
  );
};

export function HealthyRecipe () {
  const recipes = [
    {
      title: 'Avocado Salad',
      ingredients: ['1 ripe avocado', '1/2 red onion', '1 tomato', 'Lemon juice', 'Salt and pepper to taste'],
      instructions: [
        'Cut the avocado in half and remove the pit.',
        'Scoop out the avocado flesh and dice it into small pieces.',
        'Chop the red onion and tomato.',
        'In a bowl, mix the avocado, red onion, and tomato.',
        'Add lemon juice, salt, and pepper to taste.',
        'Serve and enjoy!'
      ]
    },
    {
      title: 'Grilled Chicken with Vegetables',
      ingredients: ['4 boneless skinless chicken breasts', 'Assorted vegetables (e.g., bell peppers, zucchini, mushrooms)', 'Olive oil', 'Salt and pepper to taste'],
      instructions: [
        'Preheat the grill to medium-high heat.',
        'Season the chicken breasts with salt and pepper.',
        'Brush the vegetables with olive oil.',
        'Grill the chicken and vegetables for about 4-6 minutes per side, or until the chicken is cooked through and the vegetables are tender.',
        'Serve the grilled chicken and vegetables together.',
        'Enjoy!'
      ]
    },
    {
      title: 'Grilled Lemon Herb Chicken',
      ingredients: [
        '4 boneless, skinless chicken breasts',
        '1/4 cup fresh lemon juice',
        '1/4 cup extra-virgin olive oil',
        '2 cloves garlic, minced',
        '1 tablespoon chopped fresh basil',
        '1 tablespoon chopped fresh parsley',
        '1 teaspoon chopped fresh thyme',
        'Salt and pepper to taste'
      ],
      instructions: [
        'In a small bowl, whisk together the lemon juice, olive oil, minced garlic, basil, parsley, thyme, salt, and pepper to make the marinade.',
        'Place the chicken breasts in a shallow dish and pour the marinade over them, turning to coat. Let the chicken marinate in the refrigerator for at least 30 minutes, or overnight for best results.',
        'Preheat a grill or stovetop grill pan over medium-high heat.',
        'Remove the chicken from the marinade and grill for 6-8 minutes per side, or until cooked through and no longer pink in the center.',
        'Let the chicken rest for a few minutes before slicing and serving.'
      ]
    },
    {
      title: 'Greek Salad',
      ingredients: [
        '1 small head of lettuce',
        '1 cucumber, sliced',
        '1 red onion, thinly sliced',
        '1 bell pepper, diced',
        '1 cup cherry tomatoes, halved',
        '1/2 cup kalamata olives',
        '1/2 cup crumbled feta cheese',
        '2 tablespoons red wine vinegar',
        '1/4 cup extra-virgin olive oil',
        '1 teaspoon dried oregano',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Wash and chop the lettuce, cucumber, red onion, bell pepper, and cherry tomatoes.',
        'In a large bowl, combine the chopped vegetables with the kalamata olives and crumbled feta cheese.',
        'In a small bowl, whisk together the red wine vinegar, olive oil, dried oregano, salt, and pepper to make the dressing.',
        'Pour the dressing over the salad and toss to coat. Serve chilled.',
      ],
    },
  ];

  return (
    <div className="healthy-recipes-page">
      <h1 style={{textAlign : "center"}}>Healthy Recipes</h1>
      <Row gutter={16}>
        {recipes.map((recipe, index) => (
         <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
            <RecipeCard
              title={recipe.title}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

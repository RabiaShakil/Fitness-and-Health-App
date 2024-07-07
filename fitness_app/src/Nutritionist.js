import React, { useState, useEffect } from 'react';
import { List, Avatar, Input, Select } from 'antd';
import axios from 'axios';
//import './Nutritionist.css'; // Import custom CSS styles

const { Search } = Input;
const { Option } = Select;

const Nutritionist = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState(null);


  useEffect(() => {
    const fetchNutritionists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/nutritionists');
        const data = response.data;
        console.log(data); // Log the retrieved data to check if it's correct
        setNutritionists(data);
        setFilterValue(data);

      } catch (error) {
        console.error('Error fetching nutritionists:', error);
      }
    };
    

    fetchNutritionists();
  }, []);

 
  const sortNutritionists = (order) => {
    const sortedNutritionists = [...nutritionists].sort((a, b) => {
      if (order === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setNutritionists(sortedNutritionists);
    setSortOrder(order);
  };

  const searchNutritionists = (value) => {
    setSearchValue(value);
  };

  const filterNutritionists = (value) => {
    setFilterValue(value);
  };

  const renderItem = (nutritionist) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://picsum.photos/50/50" alt={nutritionist.name} />}
        title={<a href={`/${nutritionist.name}`}>{nutritionist.name}</a>}
        description={`Rating: ${nutritionist.rating}, Specialties: ${nutritionist.specialties.join(', ')}`}
      />
    </List.Item>
  );

  const filteredNutritionists = nutritionists.filter((nutritionist) => {
    const nameMatch = nutritionist.name.toLowerCase().includes(searchValue.toLowerCase());
    const specialtyMatch = nutritionist.specialties.join(', ').toLowerCase().includes(searchValue.toLowerCase());
    const filterMatch = filterValue === 'all' || nutritionist.specialties.includes(filterValue);
    return (nameMatch || specialtyMatch) && filterMatch;
  });

 return (
  <div style={{ minWidth: "97vw", minHeight: "100vh" }}>
    <div style={{ padding: "20px", backgroundColor: "black" }}>
      <h1 style={{ color: "#fff", backgroundColor: "#1e90ff", textAlign: "center", height: "45px", paddingTop: "5px" }}>BEST NUTRITIONISTS</h1>
    </div>

    
    <br /><br />
    <div style={{ justifyContent:"center", display:'flex' , flexDirection:"row" , alignItems:"center"}}>
    <label >Sort by rating :</label>
    <Select
      style={{ marginLeft: "20px", backgroundColor: "#000", color: "#222", border: "1px solid #222", borderRadius: "4px", width: "150px", marginRight: "50px" }}
      placeholder="Sort by rating"
      size="large"
      onChange={(value) => sortNutritionists(value)}
    >
      <Option value="asc">Lowest to highest</Option>
      <Option value="desc">Highest to lowest</Option>
    </Select>
    </div>
    

    <br /><br />
    <List
      itemLayout="horizontal"
      dataSource={nutritionists}
      renderItem={renderItem}
      style={{ color: "#fff", marginBottom: "30px", width: "950px", marginLeft: "150px", border: "3px solid #1e90ff", borderRadius: "8px" }}
    />
  </div>
);

};

export default Nutritionist;

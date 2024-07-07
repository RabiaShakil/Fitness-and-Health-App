import React, { useEffect, useState } from 'react';
import { AutoComplete, Card, List, Typography,Input} from 'antd';
import axios from 'axios';

export function SymptomsCheckerPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [recentlySearched, setRecentlySearched] = useState([]);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/symptoms');
      setSymptoms(response.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const handleSearch = (value) => {
    setSelectedSymptom(value);
    const selectedSymptomObject = symptoms.find((symptom) => symptom.name === value);
    if (selectedSymptomObject) {
      setDiagnosis(selectedSymptomObject.diagnosis);
    } else {
      setDiagnosis('');
    }

    // Maintain a list of recently searched symptoms
    if (!recentlySearched.includes(value)) {
      const updatedRecentlySearched = [value, ...recentlySearched].slice(0, 8);
      setRecentlySearched(updatedRecentlySearched);
    }
  };

  const handleInputChange = (value) => {
    const filteredOptions = symptoms
      .filter((symptom) => symptom.name.toLowerCase().includes(value.toLowerCase()))
      .map((symptom) => ({ value: symptom.name }));

    setSearchOptions(filteredOptions);
  };

  const handleRecentlySearchedClick = (symptom) => {
    setSelectedSymptom(symptom);
    const selectedSymptomObject = symptoms.find((s) => s.name === symptom);
    if (selectedSymptomObject) {
      setDiagnosis(selectedSymptomObject.diagnosis);
    } else {
      setDiagnosis('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minWidth:"97vw", minHeight:"100vh"}}>
      <div style={{ width: '70vw' }}>
        <Typography.Title level={2} style={{ textAlign: 'center', margin: '24px 0' }}>Symptom Checker</Typography.Title>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
          <AutoComplete
            placeholder="Search for a symptom"
            style={{ width: '100%' }}
            options={searchOptions}
            onSelect={handleSearch}
            onSearch={handleInputChange}
          >
            <Input/>
          </AutoComplete>
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '70%' }}>
            {selectedSymptom && (
              <>
                <Card title="Symptom you searched :" style={{ marginTop: 16 }}>
                  {selectedSymptom}
                </Card>
                <Card title="Diagnosis" style={{ marginTop: 16 }}>
                  {diagnosis}
                </Card>
              </>
            )}
          </div>
  
          <div style={{ width: '30%' }}>
          <Card title="Recently Searched Symptoms" style={{ marginTop: 16,  color: '#fff' }}>
            <List
              style={{  color: '#fff', borderRadius: '15px' }}
              dataSource={recentlySearched}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer', alignItems: 'center', display: 'flex', justifyContent: 'center',  borderRadius:"10px" ,padding:"8px"}}
                  onClick={() => handleRecentlySearchedClick(item)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0074D9'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#001F3F'}
                >
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </div>



        </div>
      </div>
    </div>
  );
};
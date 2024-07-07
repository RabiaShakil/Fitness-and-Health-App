import { Layout, Menu, Breadcrumb, Table, Popconfirm, Button, message} from 'antd';
import { Modal, Form, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormItem from 'antd/es/form/FormItem';

const { Content } = Layout;

const data = [
  {
    key: '1',
    name: 'Beginner Workout Plan',
    description: 'A workout plan for beginners',
    level: 'Beginner',
  },
  {
    key: '2',
    name: 'Intermediate Workout Plan',
    description: 'A workout plan for intermediate users',
    level: 'Intermediate',
  },
  {
    key: '3',
    name: 'Advanced Workout Plan',
    description: 'A workout plan for advanced users',
    level: 'Advanced',
  },
];


export function AdminOptionsPage(props) {

  const { logout } = props;
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const [userDataSource, setUserDataSource] = useState([]);
  const [dietplanDataSource, setDietplanDataSource] = useState([]);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const [form] = Form.useForm();
  const [symptomForm] = Form.useForm();
  const [symptoms, setSymptoms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddSymptomForm = () => {
    setIsModalVisible(true);
  };

  const handleCancelSymptomForm = () => {
    setIsModalVisible(false);
  };

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

  const handleAddSymptom = async () => {
   
    try {
      const values = await symptomForm.validateFields();
      const { name, diagnosis } = values;
      await axios.post('http://localhost:5000/api/symptoms', { name, diagnosis });
      message.success('Symptom added successfully');
      form.resetFields();
      fetchSymptoms();
    } catch (error) {
      console.error('Error adding symptom:', error);
      message.error('Failed to add symptom');
    }
  };

  const handleDeleteSymptom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/symptoms/${id}`);
      message.success('Symptom deleted successfully');
      fetchSymptoms();
    } catch (error) {
      console.error('Error deleting symptom:', error);
      message.error('Failed to delete symptom');
    }
  };

  const symptomsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" danger onClick={() => handleDeleteSymptom(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleAddDietPlan = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const submitMealPlan = (formData) => {
    axios.post('http://localhost:5000/api/add-diet-plan', formData)
      .then(response => {
        console.log('Meal plan submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting meal plan:', error);
      });
  }
   

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const data = response.data;
      console.log("data"+data);
      setUserDataSource(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDietPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-diet-plans');
      const data = response.data;
      console.log("data"+data);
      setDietplanDataSource(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  useEffect(() => {
    if (selectedMenuKey === '2') {
      fetchUsers();
    }
    if (selectedMenuKey === '3') {
      fetchDietPlans();
    }
  }, [selectedMenuKey]);
  
  const handleLogout=()=>
  {
    logout();
  }
  const handleMenuClick = (event) => {
    setSelectedMenuKey(event.key);
  };

  const handleDelete = (key) => {
    // TODO: Implement delete functionality
    setDataSource((prevDataSource) => prevDataSource.filter((item) => item.key !== key));
  };

  const handleDeleteDietplan =async (name) => {
    // TODO: Implement delete functionality
    // Delete user from backend API
    await fetch(`http://localhost:5000/api/delete-diet-plan/${name}`, {
      method: 'DELETE',
    });
    setDietplanDataSource((prevDataSource) => prevDataSource.filter((item) => item.name !== name));
  };


  const handleDeleteUser = async (email) => {
    try {
      // Encode email parameter
      const encodedEmail = encodeURIComponent(email);
      
      // Delete user from backend API
      await fetch(`http://localhost:5000/api/users/${encodedEmail}`, {
        method: 'DELETE',
      });
  
      // Remove user from userDataSource state
      setUserDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item.email !== email)
      );
    } catch (error) {
      console.error(`Error deleting user with email ${email}:`, error);
    }
  };
  

  const handleAdd = () => {
    // TODO: Implement add functionality
  };

  const userColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Disease',
      dataIndex: 'disease',
      key: 'disease',
    },
    {
      title: 'Food',
      dataIndex: 'food',
      key: 'food',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(record.email)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
  
  const dietColumns= [
    {
      title: 'Diet Plan',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this diet plan?"
          onConfirm={() => handleDeleteDietplan(record.name)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this workout plan?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const handleSubmit = (values) => {
    console.log("here at handlsubmit");

    console.log("values " +values);
    console.log(values.diet + " meal plan for the week:");
    console.log("Monday: " + values.MondayBreakfast + ", " + values.MondaySnack1 + ", " + values.MondayLunch + ", " + values.MondaySnack2 + ", " + values.MondayDinner);
    console.log("Tuesday: " + values.TuesdayBreakfast + ", " + values.TuesdaySnack1 + ", " + values.TuesdayLunch + ", " + values.TuesdaySnack2 + ", " + values.TuesdayDinner);
    console.log("Wednesday: " + values.WednesdayBreakfast + ", " + values.WednesdaySnack1 + ", " + values.WednesdayLunch + ", " + values.WednesdaySnack2 + ", " + values.WednesdayDinner);
    console.log("Thursday: " + values.ThursdayBreakfast + ", " + values.ThursdaySnack1 + ", " + values.ThursdayLunch + ", " + values.ThursdaySnack2 + ", " + values.ThursdayDinner);
    console.log("Friday: " + values.FridayBreakfast + ", " + values.FridaySnack1 + ", " + values.FridayLunch + ", " + values.FridaySnack2 + ", " + values.FridayDinner);
    console.log("Saturday: " + values.SaturdayBreakfast + ", " + values.SaturdaySnack1 + ", " + values.SaturdayLunch + ", " + values.SaturdaySnack2 + ", " + values.SaturdayDinner);
    console.log("Sunday: " + values.SundayBreakfast + ", " + values.SundaySnack1 + ", " + values.SundayLunch + ", " + values.SundaySnack2 + ", " + values.SundayDinner);
    
      const formData = {
        Name: values.diet,
        Monday: {
          breakfast: values.MondayBreakfast,
          snack1: values.MondaySnack1,
          lunch: values.MondayLunch,
          snack2: values.MondaySnack2,
          dinner: values.MondayDinner
        },
        Tuesday: {
          breakfast: values.TuesdayBreakfast,
          snack1: values.TuesdaySnack1,
          lunch: values.TuesdayLunch,
          snack2: values.TuesdaySnack2,
          dinner: values.TuesdayDinner
        },
        Wednesday: {
          breakfast: values.WednesdayBreakfast,
          snack1: values.WednesdaySnack1,
          lunch: values.WednesdayLunch,
          snack2: values.WednesdaySnack2,
          dinner: values.WednesdayDinner
        },
        Thursday: {
          breakfast: values.ThursdayBreakfast,
          snack1: values.ThursdaySnack1,
          lunch: values.ThursdayLunch,
          snack2: values.ThursdaySnack2,
          dinner: values.ThursdayDinner
        },
        Friday: {
          breakfast: values.FridayBreakfast,
          snack1: values.FridaySnack1,
          lunch: values.FridayLunch,
          snack2: values.FridaySnack2,
          dinner: values.FridayDinner
        },
        Saturday: {
          breakfast: values.SaturdayBreakfast,
          snack1: values.SaturdaySnack1,
          lunch: values.SaturdayLunch,
          snack2: values.SaturdaySnack2,
          dinner: values.SaturdayDinner
        },
        Sunday: {
          breakfast: values.SundayBreakfast,
          snack1: values.SundaySnack1,
          lunch: values.SundayLunch,
          snack2: values.SundaySnack2,
          dinner: values.SundayDinner
        }
      };
      console.log(formData);
      
      submitMealPlan(formData);


};
  return (
    <Layout style={{minWidth: '100vw', minHeight: '100vh', maxHeight:"fit-content" , maxWidth:'fit-content'}}>
      <Layout className="site-layout">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedMenuKey}</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Button onClick={handleLogout}>
            Logout
          </Button >
        </div>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedMenuKey]}
              onClick={handleMenuClick}
            >
              <Menu.Item key="1">Symptoms Checker</Menu.Item>
              <Menu.Item key="2">Users</Menu.Item>
              <Menu.Item key="3">DietPlan</Menu.Item>
            </Menu>
            {selectedMenuKey === '1' && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSymptomForm}>
                    Add Symptom
                  </Button>
                </div>
                <Table dataSource={symptoms} columns={symptomsColumns} rowKey="_id" />
                <Modal
                title="Add Symptom"
                visible={isModalVisible}
                onCancel={handleCancelSymptomForm}
                footer={null}
              >
                <Form layout="vertical" form={symptomForm}>
                  {/* Form fields for symptom name and diagnosis */}
                  <Form.Item
                  label="Name"
                  name="name"
                  initialValue=""
                  rules={[{ required: true, message: 'Please enter the symptom name' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Diagnosis"
                  name="diagnosis"
                  initialValue=""
                  rules={[{ required: true, message: 'Please enter the diagnosis' }]}
                >
                  <Input />
                </Form.Item>

                  <Button type="primary" onClick={handleAddSymptom}>
                    Add
                  </Button>
                </Form>
              </Modal>
              </>
            )}

            {selectedMenuKey === '2' && (
              <>
              <div style={{ marginBottom: 16 }}>
              
              </div>
              <Table dataSource={userDataSource} columns={userColumns} /></>
            )}
            {selectedMenuKey === '3' && (
            <>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDietPlan}>
                    Add Diet Plan
               </Button>

            </div>
            <Table dataSource={dietplanDataSource} columns={dietColumns} /></>
            )}
          </div>
          <Modal
                title="Enter Meal Plan"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
              <Form form={form} layout="vertical"   onFinish={handleSubmit} name="add_diet_plan">
                <Form.Item label="Enter diet name " name="diet" >
                <Input placeholder="Diet Name"  />
                </Form.Item>
                <div>Monday</div>
                  
                <Form.Item name="MondayBreakfast" ><Input placeholder="Breakfast" name="Monday[0]" /></Form.Item>
                <Form.Item name="MondaySnack1" ><Input placeholder="Snack1" name="Monday[1]" /></Form.Item>
                <Form.Item name="MondayLunch" ><Input placeholder="Lunch" name="Monday[2]" /></Form.Item>
                <Form.Item name="MondaySnack2" ><Input placeholder="Snack2" name="Monday[3]" /></Form.Item>
                <Form.Item name="MondayDinner" ><Input placeholder="Dinner" name="Monday[4]" /></Form.Item>
  
                  
                <div>Tuesday</div>
                <Form.Item name="TuesdayBreakfast"><Input placeholder="Breakfast" name="Tuesday[0]" /></Form.Item>
                <Form.Item name="TuesdaySnack1"><Input placeholder="Snack1" name="Tuesday[1]" /></Form.Item>
                <Form.Item name="TuesdayLunch"><Input placeholder="Lunch" name="Tuesday[2]" /></Form.Item>
                <Form.Item name="TuesdaySnack2"><Input placeholder="Snack2" name="Tuesday[3]" /></Form.Item>
                <Form.Item name="TuesdayDinner"><Input placeholder="Dinner" name="Tuesday[4]" /></Form.Item>

      
                <div>Wednesday</div>
                <Form.Item name="WednesdayBreakfast" ><Input placeholder="Breakfast" name="Wednesday[0]" /></Form.Item>
                <Form.Item name="WednesdaySnack1" ><Input placeholder="Snack1" name="Wednesday[1]" /></Form.Item>
                <Form.Item name="WednesdayLunch" ><Input placeholder="Lunch" name="Wednesday[2]" /></Form.Item>
                <Form.Item name="WednesdaySnack2" ><Input placeholder="Snack2" name="Wednesday[3]" /></Form.Item>
                <Form.Item name="WednesdayDinner" ><Input placeholder="Dinner" name="Wednesday[4]" /></Form.Item>

               
                <div>Thursday</div>
                <Form.Item name="ThursdayBreakfast" ><Input placeholder="Breakfast" name="Thursday[0]" /></Form.Item>
                <Form.Item name="ThursdaySnack1" ><Input placeholder="Snack1" name="Thursday[1]" /></Form.Item>
                <Form.Item name="ThursdayLunch" ><Input placeholder="Lunch" name="Thursday[2]" /></Form.Item>
                <Form.Item name="ThursdaySnack2" ><Input placeholder="Snack2" name="Thursday[3]" /></Form.Item>
                <Form.Item name="ThursdayDinner" ><Input placeholder="Dinner" name="Thursday[4]" /></Form.Item>

                 
                 <div>Friday</div>
                 <Form.Item name="FridayBreakfast" ><Input placeholder="Breakfast" name="Friday[0]" /></Form.Item>
                  <Form.Item name="FridaySnack1" ><Input placeholder="Snack1" name="Friday[1]" /></Form.Item>
                  <Form.Item name="FridayLunch" ><Input placeholder="Lunch" name="Friday[2]" /></Form.Item>
                  <Form.Item name="FridaySnack2" ><Input placeholder="Snack2" name="Friday[3]" /></Form.Item>
                  <Form.Item name="FridayDinner" ><Input placeholder="Dinner" name="Friday[4]" /></Form.Item>

                 
                 <div>Saturday</div>
                 <Form.Item name="SaturdayBreakfast" ><Input placeholder="Breakfast" name="Saturday[0]" /></Form.Item>
                <Form.Item name="SaturdaySnack1" ><Input placeholder="Snack1" name="Saturday[1]" /></Form.Item>
                <Form.Item name="SaturdayLunch" ><Input placeholder="Lunch" name="Saturday[2]" /></Form.Item>
                <Form.Item name="SaturdaySnack2" ><Input placeholder="Snack2" name="Saturday[3]" /></Form.Item>
                <Form.Item name="SaturdayDinner" ><Input placeholder="Dinner" name="Saturday[4]" /></Form.Item>

                  

                  <div>Sunday</div>
                  <Form.Item name="SundayBreakfast" ><Input placeholder="Breakfast" name="Sunday[0]" /></Form.Item>
                  <Form.Item name="SundaySnack1" ><Input placeholder="Snack1" name="Sunday[1]" /></Form.Item>
                  <Form.Item name="SundayLunch" ><Input placeholder="Lunch" name="Sunday[2]" /></Form.Item>
                  <Form.Item name="SundaySnack2" ><Input placeholder="Snack2" name="Sunday[3]" /></Form.Item>
                  <Form.Item name="SundayDinner" ><Input placeholder="Dinner" name="Sunday[4]" /></Form.Item>

                 
                <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
              </Form>
              </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
export function Content(){
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);
   
    const handleClick = () => {
     setIsDarkMode((previousValue) => !previousValue);
    };
    
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
      console.log('onChange:', value);
      setCurrent(value);
    };
  
    return(
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#8bbb11",
      },
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
  
      <Card style={{ width: "100vw", height:"100vh" }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <NavBar/>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClick}>
            Change Theme to {isDarkMode ? "Light" : "Dark"}
          </Button>
          </div>
        </div>
  
        <Breadcrumb items={[{ title: 'home' },{title:'app'}]} />;
    
    <>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            description: 'This is a description.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            description: 'This is a description.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            description: 'This is a description.',
          },
        ]}
      />
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />
     
    </>
    <DatePicker placeholder="select date" />
  
     </Card>
     
    </ConfigProvider>
    );
  
  }
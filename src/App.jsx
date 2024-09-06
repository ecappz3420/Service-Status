import React, { useEffect, useState } from 'react';
import Navbar from '../src/Navbar';
import Table from './Table';

const App = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const config = {
        appName: "service-status",
        reportName: "All_Services"
      }
      try {
        await ZOHO.CREATOR.init();
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecords();
  }, []);


  return (
    <>
      <div className="container-fluid bg-light-blue pt-2 p-0 vh-100 overflow-y-auto">
        <Navbar />
        <div className='body-container'>
          <Table services={services}/>
        </div>
      </div>
    </>
  );
}

export default App;

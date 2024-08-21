import React, { useEffect, useState } from 'react';
import Navbar from '../src/Navbar';
import Table from './Table';

const App = () => {
  const [allSource, setAllSource] = useState([]);
  console.log(allSource);

  useEffect(()=>{
    const fetchRecords = async ()=> {
      const config = {
        appName: "service-status",
        reportName: "All_Sources"
      }
      await ZOHO.CREATOR.init();
      const response = await ZOHO.CREATOR.API.getAllRecords(config);
      const data = response.data.map(resp => resp.Source);
      setAllSource(data);
    }
    fetchRecords();
  },[])

  return (
    <>
      <div className="container-fluid bg-light-blue vh-100 pt-2">
        <Navbar />
        <div className='body-container'>
        {allSource.map(source => (
          <Table source={source} key={source} />
        ))}
        </div>
      </div>
    </>
  );
}

export default App;

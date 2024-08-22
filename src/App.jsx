import React, { useEffect, useState } from 'react';
import Navbar from '../src/Navbar';
import Table from './Table';

const App = () => {

  const [allSource, setAllSource] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const config = {
        appName: "service-status",
        reportName: "All_Sources"
      }
      await ZOHO.CREATOR.init();
      try {
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        const data = response.data;
        setAllSource(data);
      }
      catch (err) {
      }
    }
    fetchRecords();
  }, [])

  useEffect(() => {



    const fetchRecords = async () => {
      let newSources = [];
      for (let source of allSource) {
        const config = {
          appName: "service-status",
          reportName: "All_Services",
          criteria: `Source == ${source.ID}`
        }
        try {
          await ZOHO.CREATOR.init();
          const rec_count = await ZOHO.CREATOR.API.getRecordCount(config);
          const count = rec_count.result.records_count;
          if (count > 0) {
            newSources.push(source);
          }

        } catch (error) {

        }
      }
      setSources(newSources);
    }
    fetchRecords();

  }, [allSource])

  return (
    <>
      <div className="container-fluid bg-light-blue pt-2 p-0 vh-100 overflow-y-auto">
        <Navbar />
        <div className='body-container'>
          {sources.map((source, index) => (
            <Table source={source.Source} source_id={source.ID} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

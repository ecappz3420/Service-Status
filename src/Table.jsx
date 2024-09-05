import React, {useState, useEffect} from 'react'
import Switch from './Switch';

const Table = (props) => {
    const [allSource, setAllSource] = useState([]);
    useEffect(() => {
        const fetchRecords = async () => {
          const config = {
            appName: "service-status",
            reportName: "All_Sources",
            criteria: `Status == "Active"`
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

  return (
    <table className='table table-reponsive text-center w-100 align-middle'>
        <thead>
            <tr>
                <th className='bg-blue text-white'>Source</th>
                {
                    props.services.map((record, index)=> (
                        <th className='bg-blue text-white' key={index}>{record.Service}</th>
                    ) )
                }
            </tr>
        </thead>
        <tbody>
            {
                allSource ? (
                    allSource.map((record,index)=> (
                        <tr key={index}>
                            <td className='fw-bold text-start'>{record.Source}</td>
                            {
                                props.services.map((service, i) => (
                                  <td className='text-center' key={i}>
                                    <Switch service_id={service.ID}
                                    source_id={record.ID}
                                    source={record.Source}
                                    service={service.Service}
                                  /></td>  
                                ))
                            }
                        </tr>
                    ))
                )
                :
                (
                    <tr>
                        <td>No Data to Show</td>
                    </tr>
                )
            }
        </tbody>
    </table>
  )
}

export default Table
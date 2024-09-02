import React, { useEffect, useState } from 'react'
import Switch from './Switch'
import PropTypes from 'prop-types'

const Table = ({ source, source_id }) => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const config = {
                appName: "service-status",
                reportName: "All_Services",
                criteria: `Source == ${source_id} && Status == "Active"`
            }
            await ZOHO.CREATOR.init();
            try {
                const response = await ZOHO.CREATOR.API.getAllRecords(config);
                setServices(response.data);
            }
            catch (err) {
            }
        }
        fetchRecords();
    }, [])
    const emptyCells = 5 - services.length;

    return (
        <>
            <div className="container-fluid mt-1 w-100 p-0 overflow-x-auto">
                <table className='table text-center align-middle w-100'>
                    <thead>
                        <tr>
                            <th className='bg-blue text-white'>Source</th>
                            {
                                services.map((service, index) => (
                                    <th className='bg-blue text-white' key={index}>{service.Service}</th>
                                ))
                            }
                             {Array.from({ length: emptyCells }, (_, index) => (
                            <th key={`empty-${index}`} className=' bg-blue text-white'></th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='table-header fw-bold'>{source}</td>
                            {
                                services.map((service, index) => (
                                    <td key={index}>
                                        <Switch source={source} source_id={source_id} service_id={service.ID} service={service.Service} />
                                    </td>
                                ))
                            }
                           
                        {Array.from({ length: emptyCells }, (_, index) => (
                            <td key={`empty-${index}`} className='mw-200'></td>
                        ))}
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

Table.propTypes = {
    source: PropTypes.string.isRequired,
    source_id: PropTypes.string.isRequired
}

export default Table

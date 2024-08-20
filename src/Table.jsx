import React from 'react'
import Switch from './Switch'
import PropTypes from 'prop-types'

const Table = ({ source }) => {

    return (
        <>
            <div className="container-fluid mt-3">
                <table className='table table-reponsive text-center align-middle'>
                    <thead>
                        <tr>
                            <th className='bg-blue text-white'>Source</th>
                            <th className='bg-blue text-white'>Service 1</th>
                            <th className='bg-blue text-white'>Service 2</th>
                            <th className='bg-blue text-white'>Service 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{source}</td>
                            <td>
                                <Switch />
                            </td>
                            <td>
                                <Switch />
                            </td>
                            <td>
                                <Switch />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

Table.propTypes = {
    source: PropTypes.string.isRequired,
}

export default Table

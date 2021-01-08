import React from 'react';
import './LocationManagement.scss';


const LocationManagement = () => {
 
const [management, setmanagement] =React.useState(false)

const renderHeader = () => {
    let headerElement = ['name', 'building', 'floor', 'room','delete','edit']

    return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}


const renderBody = () => {
    return management && management.map(({name, building, floor,room}) => {
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{building}</td>
                <td>{floor}</td>
                <td>{room}</td>
                <td className='delete'>
                    <button className='button'>Delete</button>
                </td>

            </tr>
        )
    })
}

return (
    <>
        <h1 id='title'>Location Management</h1>
        <table id='management'>
            <thead className="body">
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody className="body">
                {renderBody()}
            </tbody>
        </table>
    </>
)
}

export default LocationManagement;

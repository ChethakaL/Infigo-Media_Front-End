import React from 'react'

function Manage() {
    return (
        <div>
            <table className='ui celled structured table'>
                <thead>
                    <tr>
                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}>Name</th>
                        <th colSpan={3}>Stock </th>
                    </tr>
                <tr>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Qty</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Alpha Team</td>
                    <td>Project 1</td>
                    <td>M</td>
                    <td>Red</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Manage

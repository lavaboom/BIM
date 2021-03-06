/*

Following a team meeting, you were asked to create a table to display
building data from a newly written endpoint (see backend /buildings/all route)

Just as you are about to go home, the team leader adds:
'I want to be able to filter data by company name'

You have the freedom to solve the problem in any way you want.

(OPTIONAL) Use the MaterialUI table: https://mui.com/material-ui/react-table/
We are currently using this table in our product.
However, use of this library is optional in this assignment.

*/

// YOUR CODE BELOW
// ----------------------------------------------------------------------------
// React related
import React, { useState, useEffect } from 'react'
// 3rd party libraries
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
// styles
import './Solution.scss';
import offline from './styles/assets/offline.svg'

const Solution = () => {

    // use env variable if available else default to localhost
    const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:9000/buildings/all'

    // local states
    const [buildings, setBuildings] = useState([]);
    // for filtering
    const [buildingsOriginal, setBuildingsOriginal] = useState([]);

    // fetch buildings on page load once
    useEffect(() => {
        axios.get(apiURL)
        .then(response => {
            setBuildings(response.data);
            setBuildingsOriginal(response.data);
        })
        .catch(apiError => { console.log(apiError) });
    }, [])

    // functionality for the search input
    const search = (e) => {
        let value = e.target.value.toLowerCase();
        // start searching if input > 2
        if (value.length > 2) {
            const result = buildingsOriginal.filter(item => {
                let searchData = item.company.toLowerCase();
                return searchData.indexOf(value) > -1
            })
            setBuildings(result);
        } else {
            setBuildings(buildingsOriginal);
        }
    }

    /* -------------------------------------------------------------------------
    render
    ------------------------------------------------------------------------- */
    return (
        buildings.length === 0 ? 
        // UI for when there's no building to display
        <div className='no-data'>
            <img className='no-data__img' src={ offline } alt='Server offline' />
            <p className='no-data__content'>Looks like server is offline</p>
        </div>
        : 
        (<div>
            {/* headers area */}
            <div className='table-functionalities'>
                <h1 className='table-functionalities__title'>All Buildings</h1>
                <div className='table-functionalities__wrapper'>
                    <input className='table-functionalities__search' onChange={ search } type='text' placeholder='Search...' />
                </div>
            </div>
            {/* table area */}
            <div className='table'>
                <div className='table__header'>
                    <h4 className='table__header-item table__header-item--warehouse'>COMPANY</h4>
                    <h4 className='table__header-item table__header-item--address'>ADDRESS</h4>
                </div>
                {/* table rows */}
                { buildings.map(item => (
                    // each row of the table
                    <div key={ uuidv4() } className='table__row'>
                        {/* company name */}
                        <div className='table__cell table__cell--company-name'>
                            <div className='table__label'>COMPANY</div>
                            <div>{ item.company }</div>
                        </div>
                        {/* building address */}
                        <div className='table__cell table__cell--address'>
                            <div className='table__label'>ADDRESS</div>
                            <div>{ item.address }, { item.city }, { item.state }</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
    )
}

export default Solution;

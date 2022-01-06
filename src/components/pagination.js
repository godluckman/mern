import React from 'react';

const Pagination = ({dataPerPage, totalData, paginate}) => {
    const pageNumbers = []
    for (let i = 1; i<= Math.ceil(totalData/dataPerPage); i++){
        pageNumbers.push(i)

    }
    return (
            <ul className='pagination'>
                {
                    pageNumbers.map(number => (
                        <li className="waves-effect" key={number}><a href="#" onClick={()=> paginate(number)}>{number}</a></li>
                    ))
                }
            </ul>
    );
};

export default Pagination;
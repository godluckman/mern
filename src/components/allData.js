import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from "./pagination";

const AllData = () => {
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(6);
    const lastDataIndex = currentPage * dataPerPage;
    const firstDataIndex = lastDataIndex  - dataPerPage;
    const currentData = items.slice(firstDataIndex, lastDataIndex);

    const deleteHandler = async (event, id) => {
        event.stopPropagation();
        await fetch(`http://localhost:3000/app/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id})

        }).then(()=>{setItems(items.filter(item => item.id !== id))})
    }

    const directHandler = async (key) => {
        navigate(`/${key}`)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    const nextPage = () => {
        if(currentPage< items.length/dataPerPage){
        setCurrentPage(prev => prev + 1);
        }
    }
    const prevPage = () => {
        if (currentPage > 1){
            setCurrentPage(prev => prev - 1);
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/app/get")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (<div className="progress">
                    <div className="indeterminate"/>;
                </div>)
    } else {
        return (
            <div className="row">
                {currentData.map(item => (
                    <div className="col s12 m6" key={item.id} onClick={()=>directHandler(item.name)}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text" >
                                <span className="card-title">{item.name} (Type: {item.drugType}) <i className="Tiny material-icons right" onClick={(event) => deleteHandler(event, item.id)}>clear</i></span>
                                <p>{item.descriptionText}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <a href="#"><i className="material-icons" onClick={prevPage}>chevron_left</i></a>
                <Pagination
                    dataPerPage={dataPerPage}
                    totalData={items.length}
                    paginate={paginate}
                    />
                <a href="#"><i className="material-icons" onClick={nextPage}>chevron_right</i></a>
            </div>
        );
    }
}

export default AllData;
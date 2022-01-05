import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const AllData = () => {
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
                {items.map(item => (
                    <div className="col s12 m6" key={item.id} onClick={()=>directHandler(item.name)}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text" >
                                <span className="card-title">{item.name} (Type: {item.drugType}) <i className="Tiny material-icons right" onClick={(event) => deleteHandler(event, item.id)}>clear</i></span>
                                <p>{item.descriptionText}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default AllData;
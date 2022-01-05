import React, {useEffect} from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Details = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let navigate = useNavigate();
    let loc = window.location.pathname.substr(1)

    const backHandler = () => {
        navigate('/get')
    }

    useEffect(async () => {
        await fetch(`http://localhost:3000/app/${loc}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name: loc})

        })
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
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title"> <i className="tiny material-icons left" onClick={backHandler}>arrow_back</i>{items.name} (Type: {items.drugType})</span>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                    <p>{items.descriptionText}</p>
                </div>
            </div>
        )
    }
};

export default Details;
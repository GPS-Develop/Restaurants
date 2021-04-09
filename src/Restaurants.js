import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import Restaurant from './Restaurant';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Next } from 'react-bootstrap/esm/PageItem';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Pagination from "react-js-pagination";

const perPage = 10;

function Restaurants(props){
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    function previousPage(){
        if(page > 1){
            setPage(page - 1);
        }
    }
    function nextPage(){
            setPage(page + 1);
    }

        useEffect(() => {
            setLoading(true);
        fetch(`https://peaceful-refuge-41766.herokuapp.com/api/restaurants/?page=${page}&perPage=${perPage}`)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            setLoading(false);
            setRestaurants(myJson);
            console.log(myJson);
            console.log(page);

        })
        }, [page]);
        if(!loading){
            return (
                <>
                <Card style={{backgroundColor:'grey'}}>
            <Card.Body>
                <Card.Title>Restaurant List</Card.Title>
                <Card.Text>
                    Full list of restaurants. Optionally sorted by borough
                </Card.Text>
            </Card.Body>
        </Card>
        <br/>
                    <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Borough</th>
                        <th>Cuisine</th>
                    </tr>
                        {
                            restaurants.map(prod=>(
                                <tr onClick={()=>{ history.push(`/restaurant/${prod._id}`)}} key={prod._id}>
                                    <td>{prod.name}</td>
                                    <td>{prod.address.building} {prod.address.street}</td>
                                    <td>{prod.borough}</td>
                                    <td>{prod.cuisine}</td>
                                    </tr>
                            ))
                        }
                    </thead>
                    </Table>
                    <button onClick={previousPage}>Prev</button>  
                    <span>{page}</span>  
                    <button onClick={nextPage}>Next</button>    

                </>
            )
        }else{
            return null; 
        }
}

export default Restaurants;
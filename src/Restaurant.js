import React, {useState, useEffect} from 'react';
import { Button, Card, CardDeck } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function Restaurant(props){
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    fetch(`https://peaceful-refuge-41766.herokuapp.com/api/restaurants/${props.id}`)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        setLoading(false);
        setRestaurant(myJson);

    })
    }, [props.id]);

    if (!loading) {
        if (restaurant) {
            return (
                
                <>
                    <Card style={{backgroundColor:'grey'}}>
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>
                                {restaurant.address.building} {restaurant.address.street}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                    </MapContainer>
                    <CardDeck>
                        <Card style={{backgroundColor:'grey'}}>
                            <Card.Body>
                                <Card.Title>
                                    {restaurant.grades[0].grade}
                                </Card.Title>
                                <Card.Text>
                                    Completed: {new Date(restaurant.grades[0].date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={{backgroundColor:'grey'}}>
                            <Card.Body>
                                <Card.Title>
                                    {restaurant.grades[1].grade}
                                </Card.Title>
                                <Card.Text>
                                    Completed: {new Date(restaurant.grades[1].date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={{backgroundColor:'grey'}}>
                            <Card.Body>
                                <Card.Title>
                                    {restaurant.grades[2].grade}
                                </Card.Title>
                                <Card.Text>
                                    Completed: {new Date(restaurant.grades[2].date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={{backgroundColor:'grey'}}>
                            <Card.Body>
                                <Card.Title>
                                    {restaurant.grades[3].grade}
                                </Card.Title>
                                <Card.Text>
                                    Completed: {new Date(restaurant.grades[3].date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </>
            );
        } else {
            return (
                <>
                    <h3>restaurant {props.id}</h3>
                    <p>Not Found...</p>
                </>
            );
        }

    } else {
        return null; 
    }
}

export default Restaurant;
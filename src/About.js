import React from 'react';
import {Card} from "react-bootstrap";

function About(){
    return (
        <Card style={{backgroundColor:'grey'}}>
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    I am a developer
                </Card.Text>
            </Card.Body>
        </Card>
    )}

export default About;
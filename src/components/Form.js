import React, { Component } from 'react';
import '../App.css';
import {Form, Col, Row} from 'react-bootstrap';

class FormComp extends Component {
    render() {
        return (
            <div className="App-form">
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue="email@example.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default FormComp;

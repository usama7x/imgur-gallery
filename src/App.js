import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Gallery from './containers/gallery/gallery';
import './App.css'

class App extends Component {

  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <Gallery/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Col>
          <Row className="bg-dark text-white p-3">
            Bootstrap is installed !
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;

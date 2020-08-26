import React from "react";
import './styles.scss'
import { Container, Col, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Col>
          <Row className="bg-dark text-primary p-3">
            Bootstrap is installed !
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;

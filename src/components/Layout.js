import React from "react";
import { Container } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DecksContextProvider from "contexts/DecksContext";

const Layout = ({ children }) => {
  return (
    <Container className="mt-4">
      <DndProvider backend={HTML5Backend}>
        <DecksContextProvider>
          {children}
        </DecksContextProvider>
      </DndProvider>
    </Container>
  );
};

export default Layout;

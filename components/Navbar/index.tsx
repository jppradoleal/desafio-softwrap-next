import React from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";

import Navbar from "./styles/NavbarStyled";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="px-5">
        <Nav className="mr-auto">
          <Link href="/home" passHref>
            <Nav.Link>
              Visualizar
            </Nav.Link>
          </Link>
          <Link href="/cadastro" passHref>
            <Nav.Link>Novo Cadastro</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;

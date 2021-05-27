import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import styled from "styled-components";
import nookies from "nookies";
import firebaseClient from "../../../utils/firebaseClient";
import firebase from "firebase";
import Router from 'next/router';

const CustomNavbar = () => {
  firebaseClient();
  return (
    <NavBarStyled bg="dark" variant="dark">
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
          <Nav.Link onClick={async ()=> {
            await firebase.auth().signOut();
            Router.reload();
          }}>Sign out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </NavBarStyled>
  );
};

const NavBarStyled = styled(Navbar)`

    a {
        border-radius: 10px;
        padding: 5px 15px;
       
        &:hover {
            background-color: #111827;
        }
        
        &:nth-child(2) {
            margin-left: 16px;
        }
    }
`;

export default CustomNavbar;

import React, { useState, FormEvent } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Link from "next/link";
import {
  Container,
  Form,
  Row,
  Button,
  Col,
  ButtonGroup,
  Toast,
} from "react-bootstrap";

import firebaseClient from "../utils/firebaseClient";
import { useAuth } from "../utils/auth";
import IndexStyle from "../styles/components/styles/indexStyle";

export default function Home() {
  firebaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "/home";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "/home";
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <IndexStyle>
      <Toast show={error.length > 0} delay={5000} autohide onClose={() => setError("")}>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
      <Container>
        <Form>
          <Form.Group className="mt-2">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Control id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <div className="form-footer mt-2">
            <div>
              <Button variant="secondary" onClick={handleForgotPassword}>
                Forgot password
              </Button>
            </div>
            <div>
              <ButtonGroup>
                <Button variant="primary" onClick={handleSignUp}>
                  Sign up
                </Button>
                <Button variant="success" onClick={handleSignIn}>
                  Log in
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Form>
      </Container>
    </IndexStyle>
  );
}

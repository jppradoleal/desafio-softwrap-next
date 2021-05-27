import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import CadastroStyled from './styles/CadastroStyled';

const Cadastro = () => {
    return (
        <CadastroStyled>
            <Navbar />
            <Header title="Novo Cadastro"/>
            <div className="body mt-5 px-5">
            {/* <Alert variant="danger" className="position-absolute">
                Erro no campo x
            </Alert> */}
            <Row>
                <Col>
                    <h3>Informações Pessoais</h3>
                    <p>Adicione aqui as informações da nova pessoa</p>
                </Col>
                <Col>
                    <Form>
                        <Row>
                            <Col md={{span: 8}}>
                            <Form.Group>
                                <Form.Label>
                                    Nome
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Label>
                                    Idade
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                            <Form.Group>
                                <Form.Label>
                                    Estado Civil
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Label>
                                    CPF
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={{span: 8}}>
                            <Form.Group>
                                <Form.Label>
                                    Cidade
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Label>
                                    Estado
                                </Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Button className="mt-3">Cadastrar</Button>
                    </Form>
                </Col>
            </Row>
        </div>
        </CadastroStyled>
    );
}

export default Cadastro;
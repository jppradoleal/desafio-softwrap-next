import React, { FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Col, Form, Row } from "react-bootstrap";
import nookies from "nookies";
import firebase from "firebase/app";
import Header from "../../styles/components/Header";
import Navbar from "../../styles/components/Navbar";
import firebaseClient from "../../utils/firebaseClient";
import { verifyIdToken } from "../../utils/firebaseAdmin";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

interface IEstado {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

interface ICidade {
  nome: string;
}

interface IProps {
  ufs: IEstado[];
  session: {
    email: string;
    uid: string;
  };
}

const Cadastro = ({ ufs, session }: IProps) => {
  firebaseClient();

  let estadosCivis = ["Solteiro", "Casado", "Viúvo"];

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [estadoCivil, setEstadoCivil] = useState(estadosCivis[0]);
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState<ICidade[]>([]);
  const [estado, setEstado] = useState(ufs[0].sigla);
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(null);
  const [validated, setValidated] = useState(false);

  const router = useRouter();


  const loadEdit = async (id: string | string[]) => {
    await firebase
      .firestore()
      .collection("cadastros")
      .doc("" + id)
      .get()
      .then((data) => {
        let docData = data.data();
        setNome(docData["nome"]);
        setCpf(docData["cpf"]);
        setEstado(docData["estado"]);
        setEstadoCivil(docData["estadoCivil"]);
        setIdade(docData["idade"]);
        setId(id);
        getCidades();
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const query = router.query;
    if (query?.id) {
      loadEdit(query.id);
    }
  }, []);

  const getCidades = async () => {
    let uf: IEstado = ufs.filter((val: IEstado) => val.nome == estado)[0];
    if (uf) {
      await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.sigla}/municipios`
      )
        .then((response) => response.json())
        .then((data) => {
          setCidades(data);
        })
        .catch((err) => setErrors(err));
    }
  }

  useEffect(() => {
    getCidades();
  }, [estado]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setValidated(false);

    if(e.currentTarget.checkValidity() === false) {
      setValidated(true);
      return false;
    }

    const newPerson = {
      nome,
      idade,
      estadoCivil,
      cpf,
      cidade,
      estado,
    };

    if (id != null) {
      await firebase.firestore().collection("cadastros").doc(id).update(newPerson);
    } else {
      await firebase.firestore().collection("cadastros").add(newPerson);
    }
    reset();
  };

  const reset = () => {
    setCidade("");
    setEstado("");
    setCpf("");
    setErrors(null);
    setEstadoCivil("");
    setIdade(0);
    setNome("");
  };

  if (!session) {
    return <p className="lead">Loading...</p>;
  }

  return (
    <CadastroStyled>
      <Navbar />
      <Header title="Novo Cadastro" />
      <div className="body mt-5 px-5">
        <Row>
          <Col>
            <h3>Informações Pessoais</h3>
            <p>Adicione aqui as informações da nova pessoa</p>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <Row>
                <Col md={{ span: 8 }}>
                  <Form.Group controlId="validation-0">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={nome}
                      required
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira seu nome.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validation-1">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                      type="number"
                      value={idade}
                      required
                      min={1}
                      onChange={(e) => setIdade(parseInt(e.target.value))}
                    />

                    <Form.Control.Feedback type="invalid">
                      Insira sua idade
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="validation-2">
                    <Form.Label>Estado Civil</Form.Label>
                    <select
                      className="form-select"
                      value={estadoCivil}
                      required
                      onChange={(e) => {
                        setEstadoCivil(e.target.value);
                      }}
                    >
                      {estadosCivis.map((val, index) => (
                        <option value={val} key={`estado-civil-${index}`}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validation-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      type="text"
                      value={cpf}
                      pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                      minLength={12}
                      maxLength={15}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira seu CPF
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={{ span: 8 }}>
                  <Form.Group controlId="validation-4">
                    <Form.Label>Estado</Form.Label>
                    <select
                      className="form-select"
                      value={estado}
                      required
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      {ufs.map((val, index) => (
                        <option value={val.nome} key={`estado-key-${index}`}>
                          {val.nome}
                        </option>
                      ))}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Selecione seu estado
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validation-5">
                    <Form.Label>Cidade</Form.Label>
                    <select
                      className="form-select"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      required
                      aria-readonly={cidades.length <= 0}
                    >
                      {cidades.map((val, index) => (
                        <option value={val.nome} key={`cidade-key-${index}`}>
                          {val.nome}
                        </option>
                      ))}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Selecione sua cidade
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button className="mt-3" type="submit">
                {id ? "Atualizar" : "Cadastrar"}
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </CadastroStyled>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  let session = {};
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    session = { email, uid };
  } catch (err) {
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return { props: [] };
  }

  const ufs = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  let ufsFiltered = ufs.sort((a, b) => a.nome.localeCompare(b.nome));
  return {
    props: {
      session,
      ufs: JSON.parse(JSON.stringify(ufsFiltered)),
    },
  };
}
export default Cadastro;

const CadastroStyled = styled.div`
  .body {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    form {
      background-color: white;
      border-radius: 16px;
      padding: 16px;

      .btn {
        float: right;
        margin-right: 24px;
      }
    }

    .alert {
      bottom: 0px;
      right: 32px;
    }

    .row {
      width: 100%;
    }
  }
`;

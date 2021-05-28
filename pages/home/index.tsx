import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NextPageContext } from "next";
import nookies from "nookies";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import firebase from "firebase";
import firebaseClient from "../../utils/firebaseClient";
import Header from "../../styles/components/Header";
import Navbar from "../../styles/components/Navbar";
import { verifyIdToken } from "../../utils/firebaseAdmin";
import Link from "next/link";

const Home = ({ session }) => {
  firebaseClient();
  const limit = 2;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);

  let query = firebase.firestore().collection("cadastros").orderBy("cpf");

  const nextPage = async (last) => {
    console.log(last);
    await query
      .startAfter(last["cpf"])
      .limit(limit)
      .get()
      .then((receivedData) => {
        console.log()
        setData(receivedData.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPage(page + 1);
      });
  };

  const prevPage = async (first) => {
    console.log(first);
    await query
      .endBefore(first["cpf"])
      .limitToLast(limit)
      .get()
      .then((receivedData) => {
        setData(receivedData.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPage(page - 1);
      });
  };

  useEffect(() => {
    (async function () {
      await firebase
        .firestore()
        .collection("cadastros")
        .get()
        .then((data) => setSize(data.size));
      await firebase
        .firestore()
        .collection("cadastros")
        .limit(limit)
        .get()
        .then((receivedData) => {
          setData(
            receivedData.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
    })();
  }, []);

  if (session) {
    return (
      <HomeStyle>
        <Navbar />
        <Header title="Visualizar Cadastros" />
        <div className="body mt-5">
          <Table borderless striped hover>
            <thead>
              <tr>
                <th>NOME</th>
                <th>IDADE</th>
                <th>ESTADO CIVIL</th>
                <th>CPF</th>
                <th>CIDADE</th>
                <th>ESTADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc, index) => (
                <tr key={`doc-key-${index}`}>
                  <td>{doc.nome}</td>
                  <td>{doc.idade}</td>
                  <td>{doc.estadoCivil}</td>
                  <td>{doc.cpf}</td>
                  <td>{doc.cidade}</td>
                  <td>{doc.estado}</td>
                  <td>
                    <Link
                      href={{ pathname: "/cadastro", query: { id: doc.id } }}
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex-div">
            <p>Mostrando {(page+1)*limit-limit+1} até {(page+1)*limit <= size ? (page+1)*limit : size} de {size} resultados</p>
            <ButtonGroup>
              <Button
                variant="light"
                disabled={page === 0}
                onClick={() => {
                  prevPage(data[0]);
                }}
              >
                Anterior
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  nextPage(data[data.length - 1]);
                }}
                disabled={(page+1)*limit >= size}
              >
                Próximo
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </HomeStyle>
    );
  } else {
    return <p className="lead">Loading...</p>;
  }
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        session: `Email: ${email}; UID: ${uid}`,
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return { props: [] };
  }
}

const HomeStyle = styled.div`
  height: 100vh;
  width: 100vw;
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0px 0px 16px -6px black;
    border-radius: 10px;
    width: 70%;
    padding: 5px 16px;
    table {
      color: #6b7280;
    }

    .flex-div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: 8px auto;
      p {
        line-height: 100%;
        margin: 0;
      }

      button {
        border: 1px solid #d1d5db;
      }
    }
  }
`;

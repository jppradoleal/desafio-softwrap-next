import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import HomeStyle from "./styles/HomeStyle";

const Home = () => {
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
          <tbody></tbody>
        </Table>
        <div className="flex-div">
          <p>Mostrando 1 até 6 de 20 resultados</p>
          <ButtonGroup>
            <Button variant="light">Anterior</Button>
            <Button variant="light">Próximo</Button>
          </ButtonGroup>
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;

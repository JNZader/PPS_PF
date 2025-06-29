import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { Title } from "../atomos/Title";
import { EditarEmpresa } from "../organismos/formularios/EditarEmpresa";
export function EmpresaTemplate() {
  const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header">
        <Header stateConfig={{ state, setState: () => setState(!state) }} />
      </header>
      <section className="area1">
        <Title>Mi empresa</Title>
      </section>
      <section className="main">
        <EditarEmpresa />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "main" auto;
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
  }
`;
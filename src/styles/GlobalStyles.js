import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 700;
    transition: all 300ms;
  }
  button:hover {
      filter: brightness(85%);
    }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }
  ul {
    list-style: none;
  }

`;

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
  }

  .aluno-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

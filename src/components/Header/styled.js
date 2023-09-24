import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #fff;
    margin: 0 10px 0;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    color: #fff;
  }
`;

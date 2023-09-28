import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  input {
    height: 30px;
    font-size: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
export const CreateAccount = styled(Link)`
  display: flex;
  color: ${colors.primaryColor};
  font-weight: 700;
  justify-content: center;
  margin-top: 20px;
`;

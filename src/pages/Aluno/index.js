import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes, { number } from 'prop-types';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres.');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }
  };
  return (
    <Container>
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Seu sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" />
        </label>
        <label htmlFor="idade">
          Idade
          <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Sua idade" />
        </label>
        <label htmlFor="altura">
          Altura
          <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Sua Altura" />
        </label>
        <label htmlFor="peso">
          Peso
          <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Seu peso" />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Criar Aluno'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

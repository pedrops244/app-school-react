import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setIdade(data.idade);
        setEmail(data.email);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.status.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }
    getData();
  }, [id]);
  const handleSubmit = async (e) => {
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
    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade precisa ser um número inteiro.');
    }
    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso inválido.');
    }
    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura inválida.');
    }
    if (formErrors) return;

    try {
      setIsLoading(true);
      // Editando aluno
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno editado com sucesso!');
      } else {
        // Criando aluno
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno criado com sucesso!');
        history.push('/');
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido.');
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>
      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}

          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
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

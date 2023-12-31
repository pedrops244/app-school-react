import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaUserCircle, FaEdit, FaWindowClose, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import history from '../../services/history';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);
  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const iconCheck = e.currentTarget.nextSibling;
    iconCheck.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', []);
      if (status === 401) {
        toast.error('Você precisa fazer login!');
        history.push('/login');
      } else {
        toast.error('Ocorreu um erro ao excluir o aluno.');
      }
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <div className="aluno-header">
        <h1>Alunos</h1>
        <NovoAluno to="/aluno/">
          <FaUserPlus size={30} />
        </NovoAluno>
      </div>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="fotos" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaCheck
              color="green"
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}

import { read, exclude, create, edit } from './httpService';

export async function apiGetAlunos() {
  const alunos = await read('/aluno/listarTodos');
  return alunos;
}

export async function apiDeleteAluno(id) {
  await exclude(`/aluno/${id}`);
}

export async function apiCreateAluno(aluno) {
  const newAluno = create('/aluno/cadastrar', {
    aluno
  });

  return newAluno;
}

export async function apiUpdateAluno(aluno) {
  const updatedAluno = edit(`/aluno/atualizar`, {
    aluno
  });

  return updatedAluno;
}

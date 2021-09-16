import { read, excludeAluno, createAluno, updateAluno, createImgPerfil, updateImgPerfil } from './httpService';

export async function apiGetAlunos() {
  const alunos = await read('/aluno/listarTodos');
  return alunos;
}

export async function apiDeleteAluno(id) {
  const response = await excludeAluno(`/aluno/excluir/${id}`);
  return response;
}

export async function apiCreateAluno(alunoDTO) {
  const response = createAluno('/aluno/cadastrar', alunoDTO);
  return response;
}

export async function apiCreateImgPerfil(imagem) {
  const response = createImgPerfil('/aluno/uploadImg', imagem);
  return response;
}

export async function apiUpdateImgPerfil(imagem, idAluno) {
  const response = updateImgPerfil(`/aluno/updateImg/${idAluno}`, imagem);
  return response;
}

export async function apiUpdateAluno(aluno) {
  const response = updateAluno(`/aluno/editar`, aluno);
  return response;
}

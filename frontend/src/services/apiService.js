import { read, excludeAluno, createAluno, updateAluno, createImgPerfil, updateImgPerfil } from './httpService';

export async function apiGetAlunos() {
  const alunos = await read('/aluno/listarTodos');
  return alunos;
}

export async function apiDeleteAluno(id) {
  await excludeAluno(`/aluno/${id}`);
}

export async function apiCreateAluno(alunoDTO) {
  const response = createAluno('/aluno/cadastrar', alunoDTO);
  return response;
}

export async function apiCreateImgPerfil(imagem) {
  let response = createImgPerfil('/aluno/uploadImg', imagem);
  return response;
}

export async function apiUpdateImgPerfil(imagem, idAluno) {
  let response = updateImgPerfil(`/aluno/updateImg/${idAluno}`, imagem);
  return response;
}

export async function apiUpdateAluno(aluno) {
  let response = updateAluno(`/aluno/editar`, aluno);

  return response;
}

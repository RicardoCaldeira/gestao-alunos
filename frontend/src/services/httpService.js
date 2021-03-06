import axios from 'axios';

const BASE_URL = 'http://localhost:8080'
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:8080'
  //   : 'https://...';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function excludeAluno(url) {
  await axiosInstance.delete(url);
}

export async function createAluno(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function createImgPerfil(url, imagem) {
  let formData = new FormData();
  formData.append("file", imagem);
  const { data } = await axiosInstance.post(url, formData);
  return data;
}

export async function updateImgPerfil(url, imagem) {
  let formData = new FormData();
  formData.append("file", imagem);
  const { data } = await axiosInstance.put(url, formData);
  return data;
}

export async function updateAluno(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}

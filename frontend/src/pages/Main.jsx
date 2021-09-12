import { useEffect, useState } from "react";
import Alunos from "../components/Alunos";

import {
    apiCreateAluno,
    apiDeleteAluno,
    apiGetAlunos,
    apiUpdateAluno,
  } from '../services/apiService';

export default function Main() {

    const [alunos, setAlunos] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getAlunos() {
          try {
            const backEndAlunos = await apiGetAlunos();
            setAlunos(backEndAlunos);
    
            setTimeout(() => {
              setLoading(false);
            }, 500);
          } catch (error) {
            setError(error.message);
          }
        }
    
        getAlunos();
      }, []);

    return (
        <div>
            <Alunos alunos={alunos}></Alunos>
        </div>
    )
}

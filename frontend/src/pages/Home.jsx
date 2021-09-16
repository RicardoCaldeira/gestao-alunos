import { useEffect, useState } from "react";
import Alunos from "../components/Alunos";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Main from "../components/Main";
import Button from '../components/Button';
import AlunoForm from "../components/AlunoForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

import {
  apiCreateAluno,
  apiCreateImgPerfil,
  apiDeleteAluno,
  apiGetAlunos,
  apiUpdateAluno,
  apiUpdateImgPerfil,
} from "../services/apiService";

export default function Home() {
  const [alunos, setAlunos] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [createMode, setCreateMode] = useState(true);
  const [selectedAluno, setSelectedAluno] = useState(null);

  useEffect(() => {
    async function getAlunos() {
      try {
        const backEndAlunos = await apiGetAlunos();
        setAlunos(backEndAlunos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }

    getAlunos();
  }, []);

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewAluno() {
    setCreateMode(true);
    setSelectedAluno(null);
  }

  async function handleDeleteAluno(alunoId) {
    try {
      const response = await apiDeleteAluno(alunoId);
      const backEndAlunos = await apiGetAlunos();
      setAlunos(backEndAlunos);
      toast.success(response);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditAluno(aluno) {
    setCreateMode(false);
    setSelectedAluno(aluno);
    setSelectedTab(1);
  }

  async function handlePersist(alunoDTO, imagem) {

    if (createMode) {
      try {
        const response = await apiCreateAluno(alunoDTO);
        if (response === "Aluno cadastrado com sucesso") {
          await apiCreateImgPerfil(imagem);
          setError('');
          toast.success(response);
          const backEndAlunos = await apiGetAlunos();
          setAlunos(backEndAlunos);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const response = await apiUpdateAluno(alunoDTO);
        if (response === "Dados do aluno atualizados com sucesso") {
          if (imagem !== null) {
            await apiUpdateImgPerfil(imagem, alunoDTO.Id);
            setError('');
          }
          toast.success(response);
          const backEndAlunos = await apiGetAlunos();
          setAlunos(backEndAlunos);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    window.location.reload();
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
          </TabList>

          <TabPanel>
            <div className={"p-4 m-2 flex flex-col items-center justify-center"}>
              {alunos.length === 0 ? <h2>Acessa a aba de Cadastro para cadastrar novos alunos</h2> : ''}
              <Alunos
                alunos={alunos}
                onDelete={handleDeleteAluno}
                onEdit={handleEditAluno}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="my-4">
                <Button onButtonClick={handleNewAluno}>
                  Novo Aluno
                </Button>
            </div>
            <AlunoForm
              createMode={createMode}
              aluno={selectedAluno}
              onPersist={handlePersist}
            />
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Main>{mainJsx}</Main>
    </>
  );
}

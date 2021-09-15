import { useEffect, useState } from "react";
import Alunos from "../components/Alunos";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Main from "../components/Main";
import Button from '../components/Button';
import AlunoForm from "../components/AlunoForm";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

import {
  apiCreateAluno,
  apiDeleteAluno,
  apiGetAlunos,
  apiUpdateAluno,
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
      // Back End
      //await apiDeleteFlashCard(cardId);

      // Front End
      // setAllCards(allCards.filter(card => card.id !== cardId));

      // setError('');
      // toast.success('Card excluído com sucesso!');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditAluno(aluno) {
    setCreateMode(false);
    setSelectedAluno(aluno);
    setSelectedTab(1);
  }

  async function handlePersist(imagem) {
    let formData = new FormData();
    formData.append("file", imagem);

    let response = await fetch('http://localhost:8080/aluno/uploadImg', {
      method: "POST",
      body: formData
    });

    if(response.status === 200) {
      alert("Imagem salva com sucesso");
    }
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
      <Main>{mainJsx}</Main>
    </>
  );
}

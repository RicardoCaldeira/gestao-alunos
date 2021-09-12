import { useEffect, useState } from "react";
import Alunos from "../components/Alunos";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Main from "../components/Main";

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
              <Alunos alunos={alunos}></Alunos>
            </div>
          </TabPanel>

          <TabPanel>
            Tela de cadastro...
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

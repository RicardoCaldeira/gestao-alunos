export default function Alunos({ alunos = [] }) {
  return (
    <ul className="flex flex-row flex-wrap">
      {alunos.map((aluno, index) => {
        const imgPerfil = aluno.id;

        return (
          <li
            className="p-2 m-2 border flex flex-col items-center justify-center"
            key={aluno.id}
          >
            <div className="flex flex-row items-center justify-between space-x-4">
              <img
                src={`../../../imagens/${imgPerfil}.jpg`}
                alt={aluno.nome}
                style={{
                  borderRadius: "50%",
                  height: "100px",
                }}
                width="100px"
                className="rounded-full"
              />

              {/* <div className="flex flex-col items-center">
                  <div>{percent.toFixed(2)}</div>
                  <div>{votes} votos</div>
                </div> */}
            </div>

            <div>
                <h3 className="text-center font-bold pb-2">{aluno.nome}</h3>
                <hr/>
                <div className="mt-2">
                    <span className="font-semibold">Rua: </span>
                    <span className="">{aluno.endereco.logradouro}, {aluno.endereco.numero}</span>
                    <br/>
                    <span className="font-semibold">Bairro: </span>
                    <span className="">{aluno.endereco.bairro}</span>
                    <br/>
                    <span className="font-semibold">Cidade: </span>
                    <span className="">{aluno.endereco.cidade}</span>
                    <br/>
                    <span className="font-semibold">Estado: </span>
                    <span className="">{aluno.endereco.estado}</span>
                </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

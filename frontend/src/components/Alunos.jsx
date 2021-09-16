import Aluno from "./Aluno";

export default function Alunos({
  onDelete = null,
  onEdit = null,
  alunos = []
}) {

  function handleEditIconClick(aluno) {
    if (onEdit) {
      onEdit(aluno);
    }
  }

  function handleDeleteIconClick(idAluno) {
    if (onDelete) {
        onDelete(idAluno);
    }
  }
  return (
    <div
      className={`flex flex-row`}
      style={{ fontFamily: "monospace" }}
    >
      <ul className="flex flex-row flex-wrap items-center justify-center">
        {alunos.map((aluno, index) => {
          return (
            <div key={aluno.id} className="shadow-lg p-3 m-2 border flex flex-row items-center justify-center" style={{ width: "350px" }}>
              <li>
                <Aluno aluno={aluno} onEdit={handleEditIconClick} onDelete={handleDeleteIconClick} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

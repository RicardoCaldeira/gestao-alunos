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
      <ul className="flex flex-row flex-wrap">
        {alunos.map((aluno, index) => {
          return (
            <div className="shadow-lg p-4 m-2 border flex flex-col items-center justify-center">
              <li
                key={aluno.id}
              >
                <Aluno aluno={aluno} onEdit={handleEditIconClick} onDelete={handleDeleteIconClick} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

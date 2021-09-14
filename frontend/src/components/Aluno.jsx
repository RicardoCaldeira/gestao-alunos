import {
    AiOutlineEdit as EditIcon,
    AiOutlineDelete as DeleteIcon,
} from 'react-icons/ai'

export default function Aluno({
    aluno = null,
    onDelete = null,
    onEdit = null,
}) {

    let currentAluno = null;

    function handleEditIconClick() {
        if (onEdit) {
            onEdit(currentAluno);
        }
      }
    
    function handleDeleteIconClick() {
        if (onDelete) {
            onDelete(currentAluno.id);
        }
    }

    const imgPerfil = aluno.id + ".jpg";
    currentAluno = aluno;
    return (
        <>
            <div className="flex flex-row items-center justify-between space-x-4">
                  <img
                    src={`../../../imagens/${imgPerfil}`}
                    alt={aluno.nome}
                    style={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                    }}
                    className="rounded-full"
                  />

                </div>

                <div>
                  <h3 className="text-center font-bold pb-2">{aluno.nome}</h3>
                  <hr />
                  <div className="mt-2">
                    <span className="font-semibold">Rua: </span>
                    <span className="">
                      {aluno.endereco.logradouro}, {aluno.endereco.numero}
                    </span>
                    <br />
                    <span className="font-semibold">Bairro: </span>
                    <span className="">{aluno.endereco.bairro}</span>
                    <br />
                    <span className="font-semibold">Cidade: </span>
                    <span className="">{aluno.endereco.cidade}</span>
                    <br />
                    <span className="font-semibold">Estado: </span>
                    <span className="">{aluno.endereco.estado}</span>
                    {aluno.endereco.complemento !== "" && (
                      <>
                      <br/>
                        <span className="font-semibold">Complemento: </span>
                        <span className="">{aluno.endereco.complemento}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-row items-center justify-end space-x-4">
                  <EditIcon
                    onClick={handleEditIconClick}
                    className="cursor-pointer"
                    size={24}
                  />
                  <DeleteIcon
                    onClick={handleDeleteIconClick}
                    className="cursor-pointer"
                    size={24}
                  />
              </div>
        </>
    )
}

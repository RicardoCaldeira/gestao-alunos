import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import Button from "./Button";
import Error from "./Error";
import FileInput from "./FileInput";

export default function AlunoForm({
  createMode = true,
  onPersist = null,
  aluno = null,
}) {
  const id = aluno?.id || "";
  const [nome, setNome] = useState(aluno?.nome || "");
  const [imagem, setImagem] = useState(null);
  const [enderecoImagem, setEnderecoImagem] = useState(
    aluno !== null
      ? `../../../imagens/${aluno.id}.jpg`
      : `../../../imagens/0.jpg`
  );
  const [rua, setRua] = useState(aluno?.endereco.logradouro || "");
  const [numero, setNumero] = useState(aluno?.endereco.numero || "");
  const [complemento, setComplemento] = useState(
    aluno?.endereco.complemento || ""
  );
  const [bairro, setBairro] = useState(aluno?.endereco.bairro || "");
  const [cidade, setCidade] = useState(aluno?.endereco.cidade || "");
  const [estado, setEstado] = useState(aluno?.endereco.estado || "");

  const [error, setError] = useState("");

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function handleNameChange(name) {
    setNome(name);
  }

  function handleImageChange(img) {
    if (img) {
      setImagem(img);
      var binaryData = [];
      binaryData.push(img);
      setEnderecoImagem(
        window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/Zip" })
        )
      );
    }
  }

  function handleStreetChange(street) {
    setRua(street);
  }

  function handleNumberChange(number) {
    setNumero(number.replace(/[^\d\s-/]/g, "").trim());
  }

  function handleComplementChange(complement) {
    setComplemento(complement);
  }

  function handleDistrictChange(District) {
    setBairro(District);
  }

  function handleCityChange(city) {
    setCidade(city);
  }

  function handleStateChange(state) {
    setEstado(state);
  }

  function clearFields() {
    setNome("");
    setRua("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setEstado("");
    setImagem(null);
    setEnderecoImagem(
      aluno !== null
        ? `../../../imagens/${aluno.id}.jpg`
        : `../../../imagens/0.jpg`
    );
  }

  function validateForm() {
    return (
      nome.trim() !== "" &&
      rua.trim() !== "" &&
      bairro.trim() !== "" &&
      cidade.trim() !== "" &&
      estado.trim() !== "" &&
      ((createMode && imagem !== null) || (!createMode))
    );
  }

  function validateImgSize() {
    return (imagem.size < 5000000);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      if (validateImgSize()) {
        setError("");

        const alunoDTO = {
          Id: id,
          Nome: nome,
          Endereco: {
            Logradouro: rua,
            Numero: numero,
            Bairro: bairro,
            Cidade: cidade,
            Estado: estado,
            Complemento: complemento
          },
        };

        if (onPersist) {
          onPersist(alunoDTO, imagem);
          clearFields();
        }
      } else {
        setError("O tamanho da imagem não deve exceder 5 MB")
      }
    } else {
      setError("Preencha todos os campos obrigatórios (marcados com *)");
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      {createMode ? (
        <h2 className="text-center font-semibold">Cadastro de alunos</h2>
      ) : (
        <h2 className="text-center font-semibold">Edição de alunos</h2>
      )}

      <TextInput
        labelDescription="Nome:*"
        inputValue={nome}
        onInputChange={handleNameChange}
      />

      <TextInput
        labelDescription="Rua:*"
        inputValue={rua}
        onInputChange={handleStreetChange}
      />

      <TextInput
        labelDescription="Número:*"
        inputValue={numero}
        onInputChange={handleNumberChange}
      />

      <TextInput
        labelDescription="Complemento:"
        inputValue={complemento}
        onInputChange={handleComplementChange}
      />

      <TextInput
        labelDescription="Bairro:*"
        inputValue={bairro}
        onInputChange={handleDistrictChange}
      />

      <TextInput
        labelDescription="Cidade:*"
        inputValue={cidade}
        onInputChange={handleCityChange}
      />

      <TextInput
        labelDescription="Estado:*"
        inputValue={estado}
        onInputChange={handleStateChange}
      />

      <FileInput
        labelDescription= {createMode ? "Foto de perfil:*" : "Foto de perfil:"}
        imagem={imagem}
        enderecoImagem={enderecoImagem}
        onInputChange={handleImageChange}
      />

      <div className="flex items-center justify-between">
        {error.trim() !== "" ? <Error>{error}</Error> : <span>&nbsp;</span>}

        <div>
          <Button colorClass="bg-red-200" type="reset">
            Limpar
          </Button>

          <Button colorClass="bg-green-300" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}

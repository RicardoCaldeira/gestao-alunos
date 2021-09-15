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
  const [nome, setNome] = useState(aluno?.nome || "");
  const [imagem, setImagem] = useState('');
  const [enderecoImagem, setEnderecoImagem] = useState(
    aluno !== null
      ? `../../../imagens/${aluno.id}.jpg`
      : `../../../imagens/0.jpg`
  );
  const [rua, setRua] = useState(aluno?.endereco.logradouro || "");
  const [numero, setNumero] = useState(aluno?.endereco.numero || "");
  const [complemento, setComplemento] = useState(aluno?.endereco.complemento || "");
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
      setEnderecoImagem(window.URL.createObjectURL(new Blob(binaryData, {type: "application/Zip"})));
    }
  }

  function handleStreetChange(street) {
    setRua(street);
  }

  function handleNumberChange(number) {
    setNumero(number);
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
    setImagem("0.jpg");
  }

  function validateForm() {
    return nome.trim() !== ""; //&& description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (onPersist) {
      onPersist(imagem);
      clearFields();
    }

    // if (validateForm()) {
    //   setError("");

    //   if (onPersist) {
    //     //onPersist(title, description);
    //     clearFields();
    //   }
    // } else {
    //   setError("Preencha todos os campos.");
    // }
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
      encType="multipart/form-data"
    >
      <h2 className="text-center font-semibold">Cadastro / Edição de alunos</h2>

      <TextInput
        labelDescription="Nome:"
        inputValue={nome}
        onInputChange={handleNameChange}
      />

      <TextInput
        labelDescription="Rua:"
        inputValue={rua}
        onInputChange={handleStreetChange}
      />

      <TextInput
        labelDescription="Número:"
        inputValue={numero}
        onInputChange={handleNumberChange}
      />

      <TextInput
        labelDescription="Complemento:"
        inputValue={complemento}
        onInputChange={handleComplementChange}
      />

      <TextInput
        labelDescription="Bairro:"
        inputValue={bairro}
        onInputChange={handleDistrictChange}
      />

      <TextInput
        labelDescription="Cidade:"
        inputValue={cidade}
        onInputChange={handleCityChange}
      />

      <TextInput
        labelDescription="Estado:"
        inputValue={estado}
        onInputChange={handleStateChange}
      />

      <FileInput
        labelDescription="Foto de perfil:"
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

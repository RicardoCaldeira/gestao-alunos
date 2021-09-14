import { getNewId } from "../services/idService";

export default function FileInput({
  labelDescription = "Descrição do label:",
  imagem = '',
  enderecoImagem = '',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {

    function handleInputChange({ currentTarget }) {
        if (onInputChange) {
            const newImg = currentTarget.files[0];
            onInputChange(newImg);
        }
    }

    return (
      <div className="flex flex-col my-4">
        <label className="text-sm mb-1" htmlFor={id}>
          {labelDescription}
        </label>

        <input
          autoFocus={autoFocus}
          id={id}
          className="border p-1"
          type="file"
          name="image"
          onChange={handleInputChange}
        />
        <img
            src = { enderecoImagem }
            alt="Foto de perfil"
            width="100"
            height="100"
            className="mt-5"
        />
      </div>
    );
}

package com.delta.backend.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTO {

    @JsonProperty("Nome")
    private String nome;

    @JsonProperty("Endereco")
    private EnderecoDTO enderecoDTO;
}

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
public class EnderecoDTO {

    @JsonProperty("Logradouro")
    private String logradouro;

    @JsonProperty("Numero")
    private Integer numero;

    @JsonProperty("Bairro")
    private String bairro;

    @JsonProperty("Cidade")
    private String cidade;

    @JsonProperty("Estado")
    private String estado;

    @JsonProperty("Complemento")
    private String complemento;

}

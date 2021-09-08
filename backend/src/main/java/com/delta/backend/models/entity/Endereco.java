package com.delta.backend.models.entity;

import com.delta.backend.models.dtos.EnderecoDTO;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "endereco", schema = "gestao_alunos")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String logradouro;

    private Integer numero;

    @NotNull
    private String bairro;

    @NotNull
    private String cidade;

    @NotNull
    private String estado;

    private String complemento;

    public Endereco(EnderecoDTO enderecoDTO) {
        this.numero = enderecoDTO.getNumero();
        this.logradouro = enderecoDTO.getLogradouro();
        this.bairro = enderecoDTO.getBairro();
        this.cidade = enderecoDTO.getCidade();
        this.estado = enderecoDTO.getEstado();
        this.complemento = enderecoDTO.getComplemento();
    }

    public Endereco() {
        super();
    }

}

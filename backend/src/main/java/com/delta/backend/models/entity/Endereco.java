package com.delta.backend.models.entity;

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

}

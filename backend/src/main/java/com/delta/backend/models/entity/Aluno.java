package com.delta.backend.models.entity;

import com.delta.backend.models.dtos.AlunoDTO;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "aluno", schema = "gestao_alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String nome;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    public Aluno(AlunoDTO alunoDTO, Endereco endereco) {
        super();
        this.nome = alunoDTO.getNome();
        this.endereco = endereco;
    }

    public Aluno() {
        super();
    }

}

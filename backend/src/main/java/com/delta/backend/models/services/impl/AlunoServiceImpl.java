package com.delta.backend.models.services.impl;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;
import com.delta.backend.models.entity.Endereco;
import com.delta.backend.models.repositories.AlunoRepository;
import com.delta.backend.models.repositories.EnderecoRepository;
import com.delta.backend.models.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AlunoServiceImpl implements AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Override
    public void cadastrar(AlunoDTO alunoDTO) {

        Endereco endereco = new Endereco(alunoDTO.getEnderecoDTO());
        this.enderecoRepository.saveAndFlush(endereco);

        Aluno aluno = new Aluno(alunoDTO, endereco);
        this.alunoRepository.saveAndFlush(aluno);

    }

    @Override
    public List<Aluno> listarTodos() {
        return this.alunoRepository.findAll();
    }

    @Override
    public Aluno listarPorId(Integer idAluno) {
        return this.alunoRepository.findAlunoById(idAluno);
    }

}

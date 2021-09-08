package com.delta.backend.models.services;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;

import java.util.List;
import java.util.Optional;

public interface AlunoService {
    void cadastrar (AlunoDTO alunoDTO);
    List<Aluno> listarTodos();
    Aluno listarPorId(Integer idAluno);
}

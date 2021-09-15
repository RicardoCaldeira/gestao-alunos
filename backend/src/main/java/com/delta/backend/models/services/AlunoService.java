package com.delta.backend.models.services;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AlunoService {
    void cadastrar (AlunoDTO alunoDTO);
    String salvarImgPerfil(MultipartFile arquivo);
    String editarImgPerfil(MultipartFile arquivo, Integer idAluno);
    void editar(AlunoDTO alunoDTO);
    List<Aluno> listarTodos();
    Aluno listarPorId(Integer idAluno);
    void excluir(Integer idAluno);
}

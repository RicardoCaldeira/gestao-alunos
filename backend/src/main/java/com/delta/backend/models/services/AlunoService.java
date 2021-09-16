package com.delta.backend.models.services;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.ValidationException;
import java.util.List;

public interface AlunoService {
    String cadastrar (AlunoDTO alunoDTO);
    String salvarImgPerfil(MultipartFile arquivo);
    String editarImgPerfil(MultipartFile arquivo, Integer idAluno);
    String editar(AlunoDTO alunoDTO) throws ValidationException;
    List<Aluno> listarTodos();
    Aluno listarPorId(Integer idAluno);
    String excluir(Integer idAluno);
}

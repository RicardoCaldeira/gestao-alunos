package com.delta.backend.models.repositories;

import com.delta.backend.models.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    Aluno findAlunoById(Integer idAluno);
    Aluno findTopByOrderByIdDesc();

}

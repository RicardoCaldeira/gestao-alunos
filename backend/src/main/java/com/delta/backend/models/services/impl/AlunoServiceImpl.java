package com.delta.backend.models.services.impl;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;
import com.delta.backend.models.entity.Endereco;
import com.delta.backend.models.repositories.AlunoRepository;
import com.delta.backend.models.repositories.EnderecoRepository;
import com.delta.backend.models.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.xml.bind.ValidationException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Transactional
@Service
public class AlunoServiceImpl implements AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Override
    public String cadastrar(AlunoDTO alunoDTO) {

        try {
            Endereco endereco = new Endereco(alunoDTO.getEnderecoDTO());
            this.enderecoRepository.saveAndFlush(endereco);

            Aluno aluno = new Aluno(alunoDTO, endereco);
            this.alunoRepository.saveAndFlush(aluno);
        } catch (Exception e) {
            return ("Erro ao cadastrar aluno");
        }
        return ("Aluno cadastrado com sucesso");
    }

    @Override
    public String salvarImgPerfil(MultipartFile arquivo) {
        Aluno aluno = this.alunoRepository.findTopByOrderByIdDesc();
        try {
            if (!arquivo.isEmpty()) {
                byte[] bytes = arquivo.getBytes();
                Path caminho = Paths.get("../frontend/public/imagens/" + aluno.getId().toString() + ".jpg");
                Files.write(caminho, bytes);
            } else {
                Path caminhoImgPadrao = Paths.get("../frontend/public/imagens/0.jpg");
                byte[] bytes = Files.readAllBytes(caminhoImgPadrao);

                Path caminhoNovaImg = Paths.get("../frontend/public/imagens/" + aluno.getId().toString() + ".jpg");
                Files.write(caminhoNovaImg, bytes);
            }
        } catch (Exception e) {
            return "Erro ao salvar imagem";
        }
        return "Imagem cadastrada com sucesso";
    }

    @Override
    public String editarImgPerfil(MultipartFile arquivo, Integer idAluno) {
        try {
            if (!arquivo.isEmpty()) {
                byte[] bytes = arquivo.getBytes();
                Path caminho = Paths.get("../frontend/public/imagens/" + idAluno.toString() + ".jpg");
                Files.write(caminho, bytes);
            }
        } catch (Exception e) {
            return "Erro ao substituir imagem";
        }
        return "Imagem substitu??da com sucesso";
    }

    @Override
    public String editar(AlunoDTO alunoDTO) throws ValidationException {

        try {
            Aluno aluno = this.alunoRepository.getById(alunoDTO.getId());
            if (aluno == null) {
                throw new ValidationException("Aluno n??o encontrado");
            }

            Endereco endereco = this.enderecoRepository.getById(aluno.getEndereco().getId());
            if (endereco == null) {
                throw new ValidationException("Endere??o n??o encontrado");
            }

            endereco.setBairro(alunoDTO.getEnderecoDTO().getBairro());
            endereco.setCidade(alunoDTO.getEnderecoDTO().getCidade());
            endereco.setComplemento(alunoDTO.getEnderecoDTO().getComplemento());
            endereco.setEstado(alunoDTO.getEnderecoDTO().getEstado());
            endereco.setLogradouro(alunoDTO.getEnderecoDTO().getLogradouro());
            endereco.setNumero(alunoDTO.getEnderecoDTO().getNumero());
            this.enderecoRepository.saveAndFlush(endereco);

            aluno.setNome(alunoDTO.getNome());
            aluno.setEndereco(endereco);
            this.alunoRepository.save(aluno);
        } catch (Exception e) {
            return "Erro ao editar aluno";
        }
        return "Dados do aluno atualizados com sucesso";

    }

    @Override
    public List<Aluno> listarTodos() {
        return this.alunoRepository.findAll();
    }

    @Override
    public Aluno listarPorId(Integer idAluno) {
        return this.alunoRepository.findAlunoById(idAluno);
    }

    @Override
    public String excluir(Integer idAluno) {
        try {
            this.alunoRepository.deleteById(idAluno);
            Files.deleteIfExists(Paths.get("../frontend/public/imagens/" + idAluno.toString() + ".jpg"));
        } catch (Exception e) {
            return "Erro ao excluir aluno";
        }
        return "Aluno exclu??do com sucesso";
    }

}

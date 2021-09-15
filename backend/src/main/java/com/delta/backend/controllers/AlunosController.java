package com.delta.backend.controllers;

import com.delta.backend.models.dtos.AlunoDTO;
import com.delta.backend.models.entity.Aluno;
import com.delta.backend.models.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AlunosController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/aluno/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody AlunoDTO alunoDTO) {
        this.alunoService.cadastrar(alunoDTO);
        return new ResponseEntity<>("Aluno cadastrado com sucesso", HttpStatus.OK);
    }

    @GetMapping("/aluno/listarTodos")
    public ResponseEntity<List<Aluno>> listarTodos() {
        return new ResponseEntity<>(this.alunoService.listarTodos(), HttpStatus.OK);
    }

    @GetMapping("/aluno/listarPorId/{idAluno}")
    public ResponseEntity<Aluno> listarPorId(@PathVariable Integer idAluno) {
        return new ResponseEntity<>(this.alunoService.listarPorId(idAluno), HttpStatus.OK);
    }

    @PutMapping("/aluno/editar")
    public ResponseEntity<String> editar(@RequestBody AlunoDTO alunoDTO) {
        this.alunoService.editar(alunoDTO);
        return new ResponseEntity<>("Dados do aluno alterados com sucesso", HttpStatus.OK);
    }

    @DeleteMapping("/aluno/excluir/{idAluno}")
    public ResponseEntity<String> excluir(@PathVariable Integer idAluno) {
        this.alunoService.excluir(idAluno);
        return new ResponseEntity<>("Aluno excluído com sucesso", HttpStatus.OK);
    }

    @PostMapping("/aluno/uploadImg")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile arquivo) {
        try {
            if (!arquivo.isEmpty()) {
                byte[] bytes = arquivo.getBytes();
                Path caminho = Paths.get("../frontend/public/imagens/" + "5.jpg");
                Files.write(caminho, bytes);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return new ResponseEntity<>("Imagem cadastrada com sucesso", HttpStatus.OK);
    }
}

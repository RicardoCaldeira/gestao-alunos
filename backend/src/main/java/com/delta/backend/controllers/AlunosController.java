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
        return new ResponseEntity<>(this.alunoService.cadastrar(alunoDTO), HttpStatus.OK);
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
        return new ResponseEntity<>(this.alunoService.excluir(idAluno), HttpStatus.OK);
    }

    @PostMapping("/aluno/uploadImg")
    public ResponseEntity<String> salvarImagem(@RequestParam("file") MultipartFile arquivo) {
        return new ResponseEntity<>(this.alunoService.salvarImgPerfil(arquivo), HttpStatus.OK);
    }

    @PutMapping("/aluno/updateImg/{idAluno}")
    public ResponseEntity<String> editarImagem(@RequestParam("file") MultipartFile arquivo, @PathVariable Integer idAluno) {
        return new ResponseEntity<>(this.alunoService.editarImgPerfil(arquivo, idAluno), HttpStatus.OK);
    }
}

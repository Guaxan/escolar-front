import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';
import { TurmaService } from '../../../services/turma.service';
import { Aluno } from '../../../models/aluno';
import { Turma } from '../../../models/turma';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class AlunoFormComponent {
  alunoService = inject(AlunoService);
  turmaService = inject(TurmaService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  alunoForm: FormGroup;
  turmas: Turma[] = [];

  constructor() {
    this.alunoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      cadastroCompleto: [false],
      turma: ['', Validators.required]
    });

    this.carregarTurmas();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarAluno(+id);
      }
    });
  }

  private carregarAluno(id: number): void {
    this.alunoService.getAlunoById(id).subscribe({
      next: (aluno) => this.alunoForm.patchValue(aluno),
      error: (erro: HttpErrorResponse) => console.error(`Erro ao buscar aluno com ID ${id}:`, erro)
    });
  }

  private carregarTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => this.turmas = dados,
      error: (erro: HttpErrorResponse) => console.error('Erro ao buscar turmas', erro)
    });
  }

salvarAluno(): void {
  if (this.alunoForm.invalid) {
    alert('Preencha todos os campos corretamente.');
    return;
  }
  
  const formValue = this.alunoForm.value;
  const aluno: Aluno = { ...formValue };
  
  if (typeof formValue.turma === 'number' || typeof formValue.turma === 'string') {
    aluno.turma = { id: Number(formValue.turma), nome: '', semestre: '' };
  } else if (formValue.turma && typeof formValue.turma === 'object' && !formValue.turma.id) {
    console.error('Objeto turma inválido:', formValue.turma);
    alert('Erro no formato da turma selecionada.');
    return;
  }
  
  if (aluno.id) {
    this.alunoService.updateAluno(aluno).subscribe({
      next: () => {
        alert('Aluno atualizado com sucesso!');
        this.alunoForm.reset();
      },
      error: (erro: HttpErrorResponse) => {
        console.error('Erro ao atualizar aluno', erro);
        alert('Erro ao atualizar aluno.');
      }
    });
  } else {
    this.alunoService.saveAluno(aluno).subscribe({
      next: () => {
        alert('Aluno cadastrado com sucesso!');
        this.alunoForm.reset();
      },
      error: (erro: HttpErrorResponse) => {
        console.error('Erro ao cadastrar aluno', erro);
        alert('Erro ao cadastrar aluno.');
      }
    });
  }
}
}

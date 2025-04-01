import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../models/aluno';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './form.component.html', 
  styleUrls: ['./form.component.scss']
})
export class AlunoFormComponent {

  @Input("aluno") aluno: Aluno = new Aluno();
  @Output("retorno") retorno = new EventEmitter();

  alunoService = inject(AlunoService);
  turmaService = inject(TurmaService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  turmas: Turma[] = [];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarAluno(Number(id));
    }
    this.carregarTurmas();
  }

  private carregarAluno(id: number): void {
    this.alunoService.getAlunoById(id).subscribe({
      next: (aluno) => {
        this.aluno = aluno
      },
      error: (erro: HttpErrorResponse) =>
        console.error(`Erro ao buscar aluno com ID ${id}:`, erro),
    });
  }

  private carregarTurmas() {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => (this.turmas = dados),
      error: (erro: HttpErrorResponse) =>
        console.error('Erro ao buscar turmas', erro),
    });
  }

  save() {
    if (this.aluno.id > 0) {
      this.alunoService.updateAluno(this.aluno).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Aluno atualizado com sucesso', 'success');
          this.retorno.emit(this.retorno);
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    } else {
      this.alunoService.saveAluno(this.aluno).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Aluno cadastrado com sucesso', 'success');
          this.carregarTurmas();
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    }
    this.retorno.emit(this.aluno);
  }

  byId(a: Aluno, b: Aluno) {
    return a && b ? a.id === b.id : a === b;
  }
}
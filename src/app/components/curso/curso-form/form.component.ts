import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class CursoFormComponent {

  @Input("curso") curso: Curso = new Curso();
  @Output("retorno") retorno = new EventEmitter();

  cursoService = inject(CursoService);
  turmaService = inject(TurmaService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  turmas: Turma[] = [];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarCurso(Number(id));
    }
    this.carregarTurmas();
  }

  private carregarCurso(id: number): void {
    this.cursoService.getCursoById(id).subscribe({
      next: (curso) => {
        this.curso = curso
      },
      error: (erro: HttpErrorResponse) =>
        console.error(`Erro ao buscar curso com ID ${id}:`, erro)
    });
  }

  private carregarTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => {
        this.turmas = dados
      },
      error: (erro: HttpErrorResponse) =>
        console.error('Erro ao buscar turmas', erro)
    });
  }

  save() {
    if (this.curso.id > 0) {
      this.cursoService.updateCurso(this.curso).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Curso atualizado com sucesso', 'success');
          this.retorno.emit(this.retorno);
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    } else {
      this.cursoService.saveCurso(this.curso).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Curso cadastrado com sucesso', 'success');
          this.carregarTurmas();
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    }
    this.retorno.emit(this.curso);
  }

  byId(a: Curso, b: Curso) {
    return a && b ? a.id === b.id : a === b;
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TurmaFormComponent {


  @Input("turma") turma: Turma = new Turma();
  @Output("retorno") retorno = new EventEmitter();

  turmaService = inject(TurmaService);
  professorService = inject(ProfessorService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  professores: Professor[] = [];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarTurma(Number(id));
    }
    this.carregarProfessores();
  }

  private carregarTurma(id: number): void {
    this.turmaService.getTurmaById(id).subscribe({
      next: (dados) => {
        this.turma = dados
      },
      error: (erro: HttpErrorResponse) => 
        console.error(`Erro ao buscar turma com ID ${id}:`, erro)
    });
  }

  private carregarProfessores() {
    this.professorService.getProfessores().subscribe({
      next: (dados) => (this.professores = dados),
      error: (erro: HttpErrorResponse) => console.error('Erro ao buscar professores', erro)
    });
  }

  save() {
    if (this.turma.id > 0) {
      this.turmaService.updateTurma(this.turma).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Turma atualizada com sucesso', 'success');
          this.retorno.emit(this.retorno);
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    } else {
      this.turmaService.saveTurma(this.turma).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Turma cadastrada com sucesso', 'success');
          this.carregarProfessores();
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    }
    this.retorno.emit(this.turma);
  }
}

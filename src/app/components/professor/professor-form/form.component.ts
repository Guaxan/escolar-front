import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../models/professor';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService, MdbModalModule } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule,MdbModalModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProfessorFormComponent {

  @Input("professor") professor: Professor = new Professor();
  @Output("retorno") retorno = new EventEmitter();

  professorService = inject(ProfessorService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @ViewChild("modalTurmaList") modalTurmaList!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProfessor(Number(id));
    }
  }

  private carregarProfessor(id: number) {
    this.professorService.getProfessorById(id).subscribe({
      next: (professor) => {
        this.professor = professor
      },
      error: (erro: HttpErrorResponse) =>
        console.error(`Erro ao buscar professor com ID ${id}:`, erro)
    });
  }

  save() {
    if (this.professor.id > 0) {
      this.professorService.updateProfessor(this.professor).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Professor atualizado com sucesso', 'success');
          this.retorno.emit(this.retorno);
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    } else {
      this.professorService.saveProfessor(this.professor).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Professor cadastrado com sucesso', 'success');
          this.retorno.emit(this.retorno);
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    }
    this.retorno.emit(this.professor);
  }
}

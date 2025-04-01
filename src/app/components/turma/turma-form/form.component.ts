import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { ProfessorListComponent } from '../../professor/professor-list/list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, ProfessorListComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TurmaFormComponent {
  turmaService = inject(TurmaService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  turma: Turma = new Turma();

  @ViewChild('modalProfessorList') modalProfessorList!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  save() {
    if (this.turma.id > 0) {
      this.turmaService.updateTurma(this.turma).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Turma atualizada com sucesso', 'success');
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    } else {
      this.turmaService.saveTurma(this.turma).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', 'Turma cadastrada com sucesso', 'success');
        },
        error: (erro) => {
          Swal.fire('Erro', erro.error, 'error');
        },
      });
    }
  }

  findById(id: number) {
    this.turmaService.getTurmaById(id).subscribe({
      next: (response) => {
        this.turma = response;
      },
      error: (erro) => {
        Swal.fire('Erro', erro.error, 'error');
      },
    });
  }

  retornoProfessorList(professores: Professor) {

    if (this.turma.professores == null)
      this.turma.professores = [];

    this.turma.professores.push(professores);
    this.modalRef.close();
  }

  buscarProfessores() {
    this.modalRef = this.modalService.open(this.modalProfessorList, { modalClass: "modal-xl" });
  }

  deletaProfessor(professor: Professor) {
    let indice = this.turma.professores.findIndex(x => { return x.id == professor.id });
    this.turma.professores.splice(indice, 1);
  }
}

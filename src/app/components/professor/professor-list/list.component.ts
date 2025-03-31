import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProfessorFormComponent } from '../professor-form/form.component';
import { FormsModule } from '@angular/forms';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../models/professor';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [FormsModule, ProfessorFormComponent, MdbModalModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class ProfessorListComponent {
  professorService = inject(ProfessorService);
  turmaService = inject(TurmaService);
  router = inject(Router);

  listaTurmas: Turma[] = [];
  listaProfessores: Professor[] = [];
  professorEdit!: Professor;
  turmaSelecionada!: Turma;
  professoresSelecionados: number[] = [];

  @ViewChild('modalProfessorForm') modalProfessorForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.getTurmas();
    this.getProfessores();
  }

  getTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => {
        this.listaTurmas = dados;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error')
      }
    });
  }

  private getProfessores() {
    this.professorService.getProfessores().subscribe({
      next: (dados) => {
        this.listaProfessores = dados;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error')
      }
    });
  }

  new() {
    this.professorEdit = new Professor();
    this.modalRef = this.modalService.open(this.modalProfessorForm, { modalClass: 'modal-xl' });
  
    this.modalRef.onClose.subscribe(() => {
      this.getProfessores();
    });
  }

  edit(professor: Professor) {
    this.professorEdit = Object.assign({}, professor);
    this.modalRef = this.modalService.open(this.modalProfessorForm, { modalClass: 'modal-xl' });
  
    this.modalRef.onClose.subscribe(() => {
      this.getProfessores();
    });
  }

  deletarProfessor(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.professorService.deleteProfessor(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.getProfessores();
          },
          error: (erro) => Swal.fire('Erro', erro.error, 'error')
        })
      }
    });
  }

  retornoDetalhe(professor: Professor) {
    this.getProfessores();
    this.modalRef.close();
  }
}

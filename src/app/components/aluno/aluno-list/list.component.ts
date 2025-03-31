import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AlunoFormComponent } from '../aluno-form/form.component';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../models/aluno';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [FormsModule, AlunoFormComponent, MdbModalModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class AlunoListComponent {
  alunoService = inject(AlunoService);
  router = inject(Router);
  listaAlunos: Aluno[] = [];
  alunoEdit!: Aluno;

  @ViewChild('modalAlunoForm') modalAlunoForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.getAlunos();
  }

  getAlunos(): void {
    this.alunoService.getAlunos().subscribe({
      next: (data) => {
        this.listaAlunos = data;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  new() {
    this.alunoEdit = new Aluno();
    this.modalRef = this.modalService.open(this.modalAlunoForm, { modalClass: 'modal-xl' });
    
    this.modalRef.onClose.subscribe(() => {
      this.getAlunos();
    });
  }

  edit(aluno: Aluno) {
    this.alunoEdit = Object.assign({}, aluno);
    this.modalRef = this.modalService.open(this.modalAlunoForm, { modalClass: 'modal-xl' });
    
    this.modalRef.onClose.subscribe(() => {
      this.getAlunos();
    });
  }

  deletarAluno(id: number) {
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
        this.alunoService.deleteAluno(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.getAlunos();
          },
          error: (erro) => Swal.fire('Erro', erro.error, 'error')
        });
      }
    });
  }

  retornoDetalhe(aluno: Aluno) {
    this.modalRef.close();
    this.getAlunos();
  }
}
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TurmaFormComponent } from '../turma-form/form.component';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [FormsModule, TurmaFormComponent, MdbModalModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class TurmaListComponent {
  turmaService = inject(TurmaService);
  router = inject(Router);
  listaTurmas: Turma[] = [];
  turmaEdit!: Turma;

  @ViewChild('modalTurmaForm') modalTurmaForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.getTurmas();
  }

  private getTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => {
        this.listaTurmas = dados;
      },
      error: (erro) => console.error('Erro ao buscar turmas:', erro)
    });
  }

  new() {
    this.turmaEdit = new Turma();
    this.modalRef = this.modalService.open(this.modalTurmaForm, { modalClass: 'modal-xl' });

    this.modalRef.onClose.subscribe(() => {
      this.getTurmas();
    });

  }
  edit(turma: Turma) {
    this.turmaEdit = Object.assign({}, turma);
    this.modalRef = this.modalService.open(this.modalTurmaForm, { modalClass: 'modal-xl' });

    this.modalRef.onClose.subscribe(() => {
      this.getTurmas();
    });
  }


  deletarTurma(id: number) {
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
        this.turmaService.deleteTurma(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.getTurmas();
          },
          error: (erro) => Swal.fire('Erro', erro.error, 'error')
        });
      }
    });
  }
  retornoDetalhe(turma: Turma) {
    this.modalRef.close();
    this.getTurmas();
  }
}

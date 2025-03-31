import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CursoFormComponent } from '../curso-form/form.component';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [FormsModule, CursoFormComponent, MdbModalModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CursoListComponent {
  cursoService = inject(CursoService);
  router = inject(Router);

  listaCursos: Curso[] = [];
  cursoEdit!: Curso;


  @ViewChild('modalCursoForm') modalCursoForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.getCursos();
  }

  getCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: (dados) => {
        this.listaCursos = dados
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error')
      }
    });
  }

  new() {
    this.cursoEdit = new Curso();
    this.modalRef = this.modalService.open(this.modalCursoForm, { modalClass: 'modal-xl' });

    this.modalRef.onClose.subscribe(() => {
      this.getCursos();
    });
  }


  edit(curso: Curso) {
    this.cursoEdit = Object.assign({}, curso);
    this.modalRef = this.modalService.open(this.modalCursoForm, { modalClass: 'modal-xl' });

    this.modalRef.onClose.subscribe(() => {
      this.getCursos();
    });
  }

  deletarCurso(id: number) {
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
        this.cursoService.deleteCurso(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.getCursos();
          },
          error: (erro) => Swal.fire('Erro', erro.error, 'error')
        })
      }
    });
  }

  retornoDetalhe(curso: Curso){
    this.modalRef.close();
    this.getCursos();
  }
}

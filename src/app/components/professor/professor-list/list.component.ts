import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
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
  imports: [FormsModule, MdbModalModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class ProfessorListComponent {
    lista: Professor[] = [];
  
    @Output("retornoProfessor") retornoProfessor = new EventEmitter();
    @Input("modoModal") modoModal : boolean = false;
  
    professorService = inject(ProfessorService);
  
    constructor() {
      this.findAll();
    }
  
    findAll() {
      this.professorService.getProfessores().subscribe({
        next: (listaProfessorRetornado) => {
          this.lista = listaProfessorRetornado;
        },
        error: (erro) => {
          alert('Deu erro!');
        },
      });
    }
  
    deleteById(professor: Professor) {
      if (confirm('Deseja deletar o professor' + professor.nome + '?')) {
        this.professorService.deleteProfessor(professor.id).subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.findAll();
          },
          error: (erro) => {
            alert('Deu erro!');
          },
        });
      }
    }
  
    selecionarProfessor(professor: Professor){
      this.retornoProfessor.emit(professor);
    }
  }
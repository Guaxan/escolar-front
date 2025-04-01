import { Component,EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class TurmaListComponent {

  @Output("retornoTurma") retornoTurma = new EventEmitter();
  @Input("modoModal") modoModal : boolean = false;

    turmaService = inject(TurmaService);
    lista: Turma[] = [];
  
    constructor(){
  
    this.findAll();
  
    }
  findAll(){
      this.turmaService.getTurmas().subscribe({
        next: (listaTurmaRetornada) => {
          this.lista = listaTurmaRetornada;
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });
    }
  
    deleteById(turma : Turma){
      
      if (confirm("Deseja deletar o aluno" + turma.nome + "?")){
        this.turmaService.deleteTurma(turma.id).subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.findAll();
          },
          error: (erro) => {
            alert('Deu erro!');
          }
        });
      }
  
      }
      
      selecionarTurma(turma: Turma){
        this.retornoTurma.emit(turma);

      }

}
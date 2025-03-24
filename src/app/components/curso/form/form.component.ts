import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class CursoFormComponent {
  cursoService = inject(CursoService);
  turmaService = inject(TurmaService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  cursoForm: FormGroup;
  turmas: Turma[] = [];

  constructor() {
    this.cursoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      turma: ['', Validators.required]
    });

    this.carregarTurmas();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarCurso(+id);
      }
    });
  }

  private carregarCurso(id: number): void {
    this.cursoService.getCursoById(id).subscribe({
      next: (curso) => {
        this.cursoForm.patchValue(curso);
        this.formatTurma(curso);
      },
      error: (erro: HttpErrorResponse) => console.error(`Erro ao buscar curso com ID ${id}:`, erro)
    });
  }

  private carregarTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => this.turmas = dados,
      error: (erro: HttpErrorResponse) => console.error('Erro ao buscar turmas', erro)
    });
  }

  private formatTurma(curso: Curso): void {
    const formValue = this.cursoForm.value;

    if (typeof formValue.turma === 'number' || typeof formValue.turma === 'string') {
      curso.turma = { id: Number(formValue.turma), nome: '', semestre: '', ano: 0, turno: '' };
    } else if (typeof formValue.turma === 'object') {
      curso.turma = formValue.turma;
    } else {
      console.error('Objeto turma inválido:', formValue.turma);
      alert('Turma inválida');
    }
  }

  salvarCurso(): void {
    if (this.cursoForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
  
    const formValue = this.cursoForm.value;
    const curso: Curso = { ...formValue };
  
    
    if (typeof formValue.turma === 'number' || typeof formValue.turma === 'string') {
      curso.turma = { id: Number(formValue.turma) } as Turma; 
    } else if (formValue.turma && typeof formValue.turma === 'object' && !formValue.turma.id) {
      console.error('Objeto turma inválido:', formValue.turma);
      alert('Erro no formato da turma selecionada.');
      return;
    }

    if (curso.id) {
      this.cursoService.updateCurso(curso).subscribe({
        next: () => {
          alert('Curso atualizado com sucesso!');
          this.cursoForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao atualizar curso:', erro);
          alert('Erro ao atualizar curso.');
        }
      });
    } else {
      this.cursoService.saveCurso(curso).subscribe({
        next: () => {
          alert('Curso criado com sucesso!');
          this.cursoForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao criar curso:', erro);
          alert('Erro ao criar curso.');
        }
      });
    }
  }
  
}

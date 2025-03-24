import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../models/professor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProfessorFormComponent {
  professorService = inject(ProfessorService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  professorForm: FormGroup;

  constructor() {
    this.professorForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      especialidade: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarProfessor(+id);
      }
    });
  }

  private carregarProfessor(id: number): void {
    this.professorService.getProfessorById(id).subscribe({
      next: (professor) => {
        console.log('Dados do professor:', professor); // Para depuração
        this.professorForm.patchValue(professor);
      },
      error: (erro: HttpErrorResponse) => 
        console.error(`Erro ao buscar professor com ID ${id}:`, erro)
    });
  }

  salvarProfessor(): void {
    if (this.professorForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const formValue = this.professorForm.value;
    const professor: Professor = { ...formValue };

    if (professor.id) {
      this.professorService.updateProfessor(professor).subscribe({
        next: () => {
          alert('Professor atualizado com sucesso!');
          this.professorForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao atualizar professor:', erro);
          alert('Erro ao atualizar professor.');
        }
      });
    } else {
      this.professorService.saveProfessor(professor).subscribe({
        next: () => {
          alert('Professor cadastrado com sucesso!');
          this.professorForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao cadastrar professor:', erro);
          alert('Erro ao cadastrar professor.');
        }
      });
    }
  }
}

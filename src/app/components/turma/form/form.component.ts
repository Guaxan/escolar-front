import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TurmaFormComponent {
  turmaService = inject(TurmaService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  turmaForm: FormGroup;

  constructor() {
    this.turmaForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      semestre: ['', Validators.required],
      ano: ['', Validators.required],
      turno: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarTurma(+id);
      }
    });
  }

  private carregarTurma(id: number): void {
    this.turmaService.getTurmaById(id).subscribe({
      next: (turma) => this.turmaForm.patchValue(turma),
      error: (erro: HttpErrorResponse) => console.error(`Erro ao buscar turma com ID ${id}:`, erro)
    });
  }

  salvarTurma(): void {
    if (this.turmaForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const formValue = this.turmaForm.value;
    const turma: Turma = { ...formValue };

    if (turma.id) {
      this.turmaService.updateTurma(turma).subscribe({
        next: () => {
          alert('Turma atualizada com sucesso!');
          this.turmaForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao atualizar turma', erro);
          alert('Erro ao atualizar turma.');
        }
      });
    } else {
      this.turmaService.saveTurma(turma).subscribe({
        next: () => {
          alert('Turma cadastrada com sucesso!');
          this.turmaForm.reset();
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao cadastrar turma', erro);
          alert('Erro ao cadastrar turma.');
        }
      });
    }
  }
}

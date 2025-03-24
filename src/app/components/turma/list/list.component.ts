import { Component, inject } from '@angular/core';
import { TurmaService } from '../../../services/turma.service';
import { Turma } from '../../../models/turma';

@Component({
  selector: 'app-turma- mlist',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class TurmaListComponent {
  turmaService = inject(TurmaService);
  turmas: Turma[] = [];

  constructor() {
    this.carregarTurmas();
  }

  private carregarTurmas(): void {
    this.turmaService.getTurmas().subscribe({
      next: (dados) => {
        this.turmas = dados;
      },
      error: (erro) => console.error('Erro ao buscar turmas:', erro)
    });
  }

  editarTurma(id: number): void {
    window.location.href = `/admin/turma/edit/${id}`;
  }

  cadastrarTurma(): void {
    window.location.href = '/admin/turma/new';
  }

  deletarTurma(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta turma?')) {
      this.turmaService.deleteTurma(id).subscribe({
        next: () => {
          alert('Turma deletada com sucesso!');
          this.carregarTurmas();
        },
        error: (erro) => console.error(`Erro ao deletar turma com ID ${id}:`, erro)
      });
    }
  }

}

import { Component, inject } from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../models/aluno';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class AlunoListComponent {
  alunoService = inject(AlunoService);
  alunos: Aluno[] = [];

  constructor() {
    this.carregarAlunos();
  }

  // Método para carregar alunos
  private carregarAlunos(): void {
    this.alunoService.getAlunos().subscribe({
      next: (dados) => {
        this.alunos = dados;
      },
      error: (erro) => console.error('Erro ao buscar alunos:', erro)
    });
  }
  
  editarAluno(id: number): void {
    window.location.href = `/admin/aluno/edit/${id}`;
  }

  cadastrarAluno(): void {
    window.location.href = '/admin/aluno/new';
  }

  deletarAluno(id: number): void { 
    if (confirm('Tem certeza que deseja deletar este aluno?')) {
      this.alunoService.deleteAluno(id).subscribe({
        next: () => {
          alert('Aluno deletado com sucesso!');
          this.carregarAlunos(); 
        },
        error: (erro) => console.error(`Erro ao deletar aluno com ID ${id}:`, erro)
      });
    }
  }
}

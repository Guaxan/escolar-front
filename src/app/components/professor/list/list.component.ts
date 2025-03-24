import { Component, inject } from '@angular/core';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../models/professor';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']  // Corrigido para styleUrls
})
export class ProfessorListComponent {
  professorService = inject(ProfessorService);
  professores: Professor[] = [];

  constructor() {
    this.carregarProfessores();
  }

  private carregarProfessores(): void {
    this.professorService.getProfessores().subscribe({
      next: (dados) => {
        this.professores = dados;
      },
      error: (erro) => console.error('Erro ao buscar professores:', erro)
    });
  }

  editarProfessor(id: number): void {
    window.location.href = `/admin/professor/edit/${id}`;
  }

  cadastrarProfessor(): void {
    window.location.href = '/admin/professor/new';
  }

  deletarProfessor(id: number): void {
    if (confirm('Tem certeza que deseja deletar este professor?')) {
      this.professorService.deleteProfessor(id).subscribe({
        next: () => {
          alert('Professor deletado com sucesso!');
          this.carregarProfessores();
        },
        error: (erro) => console.error(`Erro ao deletar professor com ID ${id}:`, erro)
      });
    }
  }
}

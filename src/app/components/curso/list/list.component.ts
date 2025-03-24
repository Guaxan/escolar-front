import { Component, inject } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CursoListComponent {
  cursoService = inject(CursoService);
  cursos: Curso[] = [];

  constructor() {
    this.carregarCursos(); 
  }

  private carregarCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: (dados) => (this.cursos = dados),
      error: (erro) => console.error('Erro ao buscar cursos:', erro)
    });
  }

  editarCurso(id: number): void {
    window.location.href = `/admin/curso/edit/${id}`;
  }

  cadastrarCurso(): void {
    window.location.href = '/admin/curso/new';
  }

  excluirCurso(id: number): void {
    this.cursoService.deleteCurso(id).subscribe({
      next: () => this.carregarCursos(),
      error: (erro) => console.error('Erro ao excluir curso:', erro)
    });
  }
}

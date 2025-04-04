import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AlunoListComponent } from './components/aluno/aluno-list/list.component';
import { AlunoFormComponent } from './components/aluno/aluno-form/form.component';
import { CursoListComponent } from './components/curso/curso-list/list.component';
import { CursoFormComponent } from './components/curso/curso-form/form.component';
import { ProfessorListComponent } from './components/professor/professor-list/list.component';
import { ProfessorFormComponent } from './components/professor/professor-form/form.component';
import { TurmaListComponent } from './components/turma/turma-list/list.component';
import { TurmaFormComponent } from './components/turma/turma-form/form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin', component: PrincipalComponent, children: [
            
            { path: 'aluno', component: AlunoListComponent },
            { path: 'aluno/new', component: AlunoFormComponent },
            { path: 'aluno/edit/:id', component: AlunoFormComponent },

            { path: 'curso', component: CursoListComponent },
            { path: 'curso/new', component: CursoFormComponent },
            { path: 'curso/edit/:id', component: CursoFormComponent },

            { path: 'professores', component: ProfessorListComponent },
            { path: 'professores/new', component: ProfessorFormComponent },
            { path: 'professores/edit/:id', component: ProfessorFormComponent },

            { path: 'turmas', component: TurmaListComponent },
            { path: 'turmas/new', component: TurmaFormComponent },
            { path: 'turmas/edit/:id', component: TurmaFormComponent },
        ]
    }
];

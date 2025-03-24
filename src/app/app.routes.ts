import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AlunoListComponent } from './components/aluno/list/list.component';
import { AlunoFormComponent } from './components/aluno/form/form.component';
import { CursoListComponent } from './components/curso/list/list.component';
import { CursoFormComponent } from './components/curso/form/form.component';
import { ProfessorListComponent } from './components/professor/list/list.component';
import { ProfessorFormComponent } from './components/professor/form/form.component';
import { TurmaListComponent } from './components/turma/list/list.component';
import { TurmaFormComponent } from './components/turma/form/form.component';

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

            { path: 'professor', component: ProfessorListComponent },
            { path: 'professor/new', component: ProfessorFormComponent },
            { path: 'professor/edit/:id', component: ProfessorFormComponent },

            { path: 'turmad', component: TurmaListComponent },
            { path: 'turma/new', component: TurmaFormComponent },
            { path: 'turma/edit/:id', component: TurmaFormComponent },
        ]
    }
];

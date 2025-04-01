import { Professor } from './professor';

export class Turma {
    id!: number;
    nome!: string;
    semestre!: string;
    ano!: number;
    turno!: string;
    professores!: Professor[];
}

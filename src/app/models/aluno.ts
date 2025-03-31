import { Turma } from './turma';

export class Aluno {
    id!: number;
    nome!: string;
    cpf!: string;
    telefone?: string;
    cadastroCompleto!: boolean;
    turma?: Turma;
}

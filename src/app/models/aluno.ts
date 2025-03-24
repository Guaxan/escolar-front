import { Turma } from './turma';

export class Aluno {
    id!: number;
    nome!: string;
    cpf!: string;
    telefone?: string;
    cadastroCompleto!: boolean;
    turma?: Turma;

    constructor(
        id?: number,
        nome?: string,
        cpf?: string,
        telefone?: string,
        cadastroCompleto?: boolean,
        turma?: Turma
    ) {
        this.id = id ?? 0;
        this.nome = nome ?? '';
        this.cpf = cpf ?? '';
        this.telefone = telefone;
        this.cadastroCompleto = cadastroCompleto ?? false;
        this.turma = turma;
    }
}

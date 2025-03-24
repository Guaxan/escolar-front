import { Turma } from './turma';

export class Curso {

    id!: number;
    nome!: string;
    turma?: Turma; 

    constructor(
        id?: number,
        nome?: string,
        turma?: Turma
    ) {
        this.id = id ?? 0;
        this.nome = nome ?? '';
        this.turma = turma;
    }
}

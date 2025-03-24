import { Professor } from './professor';

export class Turma {
    id!: number;
    nome!: string;
    semestre!: string;
    ano?: number;
    turno?: string;
    professores?: Professor[];

    constructor(
        id?: number,
        nome?: string,
        semestre?: string,
        ano?: number,
        turno?: string,
        professores?: Professor[]
        ) {
        this.id = id ?? 0;
        this.nome = nome ?? '';
        this.semestre = semestre ?? '';
        this.ano = ano;
        this.turno = turno;
        this.professores = professores;
    }   
}

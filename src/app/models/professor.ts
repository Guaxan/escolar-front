export class Professor {

    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    especialidade!: string;

    constructor(
        id?: number,
        nome?: string,
        cpf?: string,
        email?: string,
        especialidade?: string
    ) {
        this.id = id ?? 0;
        this.nome = nome ?? '';
        this.cpf = cpf ?? '';
        this.email = email ?? '';
        this.especialidade = especialidade ?? '';
    }
}

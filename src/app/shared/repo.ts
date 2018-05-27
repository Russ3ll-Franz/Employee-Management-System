
export interface IEmployee {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    color: string[];
    status: number;
    country: string;
}

export interface ISelect {
    id?: string;
    name?: string;
}

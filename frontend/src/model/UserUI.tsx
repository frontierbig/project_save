export interface UserInterface{
    ID:number,
    Name:string,
    Email:string,
    Password:string,
    Tel:string,
    Gender:string,
    Birthday:Date,

    Role : RoleInterface,
    RoleID: number,

    Key : string,
    // ID: string,
    // FirstName: string;
    // LastName: string;
    // Email: string;
    // Age: number;
    // BirthDay: Date | null;
}

export interface RoleInterface {
    Name : string,
}

export interface UserloginInterface{
    ID:number,
    Name:string,
    Email:string,
    Password:string,
    Tel:string,
    Gender:string,
    Birthday:Date,

    Role : RoleInterface,
    RoleID: number,
}

export interface RoleloginInterface {
    Name : string,
}
export interface IUserData extends Document {
    email: string,
    password: string,
    displayName: string,
    photoURL?: string,
    token: string;
    companyId: string;
    role: string,
}
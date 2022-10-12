export default interface User {
    email: string,
    password: string,
    displayName: string,
    photoURL?: string,
    token: string;
    companyId: string;
    role: string,
}
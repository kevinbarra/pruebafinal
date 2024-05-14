type SessionContextModel = {
    user?: User
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, lastname: string, email: string, password: string) => Promise<boolean>
    logout: () => void
}
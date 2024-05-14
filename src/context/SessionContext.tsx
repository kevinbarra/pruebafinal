import React from "react";
import { useAPI } from "hooks/useAPI";

export const SessionContext = React.createContext<SessionContextModel>({
    login: () => Promise.resolve(false),
    signup: () => Promise.resolve(false),
    logout: () => { },
})

type Props = {
    children: React.ReactNode
}

const SessionContextProvider = ({ children }: Props) => {

    const { post } = useAPI()

    const [user, setUser] = React.useState<User>()

    const login = async (email: string, password: string) => {
        const response = await post('login', '', JSON.stringify({ email: email, password: password }))
        console.log(response);

        if (response) {
            setUser(response.user)
            return true
        }
        else {
            return false
        }
    }

    const signup = async (name: string, lastname: string, email: string, password: string) => {
        const response = await post('register', '',
            JSON.stringify({ name: name, lastname: lastname, email: email, password: password })
        )

        console.log(response)

        if (response) {
            return true
        }
        else {
            return false
        }
    }

    const logout = () => {
        setUser(undefined)
    }

    const sessionContext: SessionContextModel = {
        user,
        login,
        signup,
        logout
    }

    return (
        <SessionContext.Provider value={sessionContext}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;
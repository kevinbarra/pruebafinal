import PageTemplate from "@assets/page/PageTemplate";

import { FormEvent, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EnvelopeIcon, UserCircleIcon, KeyIcon } from "@heroicons/react/24/outline";

import TextInput from "@assets/components/TextInput";
import { useResizeHandler } from "@hooks/useResizeHandler";
import { useSessionContext } from "@hooks/useSessionContext";

const Signup = () => {

    const context = useSessionContext()
    const navigator = useNavigate()

    const [loginCorrect, setLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorType, setErrorType] = useState(1)

    const [lstNameLogo, setLastNameLogo] = useState<JSX.Element>()

    const errors = [
        'Empty First Name input!',
        'Empty Last Name input!',
        'Add an email!',
        'Empty Password!',
        'Review the inputs or change Username!',
        'Something went wrong!'
    ]

    const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (firstName === '') {
            setErrorType(0)
            setLogin(false)
        }
        else if (lastName === '') {
            setErrorType(1)
            setLogin(false)
        }
        else if (email === '') {
            setErrorType(2)
            setLogin(false)
        }
        else if (password === '') {
            setErrorType(4)
            setLogin(false)
        }
        else {
            const res = await context.signup(firstName, lastName, email, password);
            console.log(res)

            if (res === true) {
                navigator('/')
            }
            else {
                setErrorType(5)
                setLogin(false)
            }
        }
    }

    useResizeHandler({ use: 'logo', setLogo: setLastNameLogo, logo: <UserCircleIcon className="w-7" /> })

    return (
        <PageTemplate>
            <Link to="/" className="self-start inline-flex items-center gap-2 mb-5">
                <ArrowLeftIcon className="w-6" />
                Back
            </Link>

            <form onSubmit={OnSubmit}>
                <Card title="Signup" className="bg-transparent md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto text-center rounded-xl px-4">

                    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                        {/* First Name */}
                        <TextInput
                            logo={<UserCircleIcon className="w-7" />}
                            id="firstName"
                            label="First Name"
                            value={firstName}
                            setValue={setFirstName}
                        />

                        {/* Last Name */}
                        <TextInput
                            logo={lstNameLogo}
                            id="lastName"
                            label="Last Name"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>

                    {/* Email */}
                    <TextInput
                        logo={<EnvelopeIcon className="w-7" />}
                        id="email"
                        label="Email"
                        value={email}
                        setValue={setEmail}
                    />

                    {/* Password */}
                    <TextInput
                        logo={<KeyIcon className="w-7" />}
                        id="password"
                        label="Password"
                        value={password}
                        setValue={setPassword}
                    />

                    {loginCorrect === false && (
                        <p className="text-red-600 font-light text-sm text-center">{errors[errorType]}</p>
                    )}

                    <div className="flex justify-center">
                        <Button label="Sign Up" className="border-2 border-violet-800 text-violet-800 hover:bg-violet-800 focus:bg-violet-800 hover:text-white focus:text-white my-3 py-1 px-4" />
                    </div>

                    <p>
                        Already have an account?
                        <Link to="/login" className="text-violet-800 ms-1 border-b-2 border-violet-800/80">
                            Login here!
                        </Link>
                    </p>
                </Card>
            </form>
        </PageTemplate>
    );


}

export default Signup;
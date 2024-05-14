import TextInput from "@assets/components/TextInput";
import PageTemplate from "@assets/page/PageTemplate";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSessionContext } from "@hooks/useSessionContext";
import { Button } from "primereact/button";
import { FormEvent, useState } from "react";

const Me = () => {
    const context = useSessionContext()
    const [editing, setEditing] = useState(false)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("s");

    }

    return (
        <PageTemplate>
            <h1 className="text-2xl font-semibold tracking-wide border-b-2 pb-1 border-violet-800/50">Your Information</h1>
            <form className="my-4" onSubmit={onSubmit}>
                <header className="flex justify-end">
                    {editing ? (
                        <>
                            <Button className="px-2 p-1 text-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white me-2" label="Save" type="submit"
                                icon={<CheckIcon className="w-7 pe-1" />}
                            />
                            <Button className="px-2 p-1 text-center border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white" label="Cancel" type="button"
                                icon={<XMarkIcon className="w-7 pe-1" />} onClick={() => setEditing(false)}
                            />
                        </>
                    ) : (
                        <button className="flex gap-2 rounded px-2 p-1 text-center border-2 border-violet-800 text-violet-800 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white" type="button" onClick={() => setEditing(true)}>
                            <PencilIcon className="w-7 pe-1" />
                            Edit
                        </button>
                    )}
                </header>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4 mt-6">
                    <TextInput
                        value={context.user?.name}
                        setValue={() => { }}
                        label="Name"
                        id="name"
                    />
                    <TextInput
                        value={context.user?.lastname}
                        setValue={() => { }}
                        label="Last Name"
                        id="lastname"
                    />
                    <TextInput
                        value={context.user?.email}
                        setValue={() => { }}
                        label="Email"
                        id="email"
                    />
                </div>
            </form>
        </PageTemplate>
    );
}

export default Me;
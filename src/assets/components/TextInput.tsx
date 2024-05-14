import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

interface Props {
    id: string
    logo?: JSX.Element
    label: string
    value: string | undefined
    setValue: React.Dispatch<React.SetStateAction<string>>
    fieldsetClass?: string
    inputClass?: string
    disabled?: boolean
}

const TextInput = ({ logo, id, label, value, setValue, fieldsetClass, inputClass, disabled }: Props) => {

    const getType = () => {
        if (id === 'password' || id === 'pass') {
            return 'password'
        }
        else if (id === 'email') {
            return 'email'
        }
        return 'text'
    }
    return (
        <fieldset className={`p-inputgroup mb-8 ${fieldsetClass}`}>

            {logo &&
                <span className="p-inputgroup-addon bg-violet-800/30">
                    {logo}
                </span>
            }

            <FloatLabel>
                {id === 'password' ? (
                    <Password
                        className={`flex items-center px-2 border-violet-800/30 focus:outline-none ${logo ? 'border-y-2 border-r-2' : 'border-2 h-12'} ${inputClass}`}
                        inputId={id}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={disabled}
                    />
                ) : (
                    <InputText
                        className={`flex items-center px-2 border-violet-800/30 focus:outline-none ${logo ? 'border-y-2 border-r-2' : 'border-2 h-12'} ${inputClass}`}
                        id={id}
                        type={getType()}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={disabled}
                    />
                )}
                <label htmlFor={id}>{label}</label>
            </FloatLabel>
        </fieldset>
    );
}

export default TextInput;
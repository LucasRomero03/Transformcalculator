interface Props {
    label: string;
    controlledValue: [number, React.Dispatch<React.SetStateAction<number>>];
}

function InputField({ label, controlledValue }: Readonly<Props>) {
    const [value, setValue] = controlledValue;
    return (
        <div className="flex flex-col">
            <label className="">{label}</label>
            <input
                type="number"
                className="rounded px-1 text-black"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>)
}

export default InputField;
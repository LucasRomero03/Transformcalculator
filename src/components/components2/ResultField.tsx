interface Props {
    label: string;
    value: string;
    unit?: string;
    className?: string;
}

function ResultField({ label, value, unit, className }: Readonly<Props>) {
    return (<div className={`px-1 flex justify-between ${className}`}>
        <label className="text-md">{label}</label>
        <span className="text-sm font-semibold px-2">
            {`${value} ${unit ?? ''}`}
        </span>
    </div>)
}

export default ResultField;
interface Props {
    title: string;
    svg?: JSX.Element;
    children?: JSX.Element;
    className?: string;
}

function Title({ title, svg, children, className }: Readonly<Props>) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="justify-center px-2 font-bold text-xl flex flex-row gap-1 items-end mb-7">
                {title}
                {svg}
            </label>
            {children}
        </div>
    )
}

export default Title;
interface HeaderProps {
  onClick: (view: "Modelo 3D" | "Diagrama") => void;
}

export function Header(props: HeaderProps) {
  return (
    <div className="bg-gray-700 w-full h-20 flex justify-center items-center px-10">
      <p
        className="text-white font-semibold text-2xl hover:cursor-pointer mr-5"
        onClick={() => props.onClick("Modelo 3D")}
      >
        Modelo 3D
      </p>
      <p
        className="text-white font-semibold text-2xl hover:cursor-pointer ml-5"
        onClick={() => props.onClick("Diagrama")}
      >
        Diagrama
      </p>
    </div>
  );
}

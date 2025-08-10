type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Card({
  title,
  icon,
  children,
  extra,
  onClick,
  className,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-6 h-full justify-between text-gray-800 border border-[#EBEBEB] rounded p-4 px-3 bg-[#FEFEFF] ${className}`}
    >
      <div className=" flex justify-between">
        <h2 className=" font-medium text-sm">{title}</h2>
        {icon}
      </div>
      <div className=" space-y-6">{children}</div>
      <div className=" text-xs text-neutral-500">{extra}</div>
    </div>
  );
}

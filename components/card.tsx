import LoadingState from "./loading-state";

type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
};

export default function Card({
  title,
  icon,
  children,
  extra,
  onClick,
  className,
  loading,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-6 h-full justify-between text-gray-800 border border-[#EBEBEB] rounded p-4 px-3 bg-[#FEFEFF] ${className}`}
    >
      <div className=" flex justify-between">
        <h2 className=" text-xs font-medium">{title}</h2>
        {icon}
      </div>
      {loading ? (
        <LoadingState />
      ) : (
        <div className=" space-y-6 h-full w-full">{children}</div>
      )}
      {extra ? <div className=" text-xs text-neutral-600">{extra}</div> : ""}
    </div>
  );
}

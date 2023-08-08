import { CgSpinner } from "react-icons/cg";

interface PropsType extends ReactProps {
  icon?: JSX.Element;
}
export function Spinner({ icon = <CgSpinner />, className = "py-60", ...props }: PropsType) {
  return (
    <div className={`w-full flex-center text-primary ${className}`}>
      <i className="text-4xl animate-spin">{icon}</i>
    </div>
  );
}

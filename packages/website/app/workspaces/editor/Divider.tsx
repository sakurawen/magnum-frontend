type DividerProps = {
  text?: string;
};
const lineClass = 'h-px bg-theme-gray-3 w-full';
const Divider = ({ text }: DividerProps) => {
  return (
    <div className="flex items-center  my-4 justify-center">
      <i className={lineClass}></i>
      {text ? <span className="text-xs mx-4 whitespace-nowrap select-none text-theme-gray-3">{text}</span> : null}
      <i className={lineClass}></i>
    </div>
  );
};
export default Divider;

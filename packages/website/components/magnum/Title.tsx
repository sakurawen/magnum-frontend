type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return <h2 className="text-2xl font-bold min-h-[1em] leading-none mt-3 mb-1">{text}</h2>;
};

export default Title;

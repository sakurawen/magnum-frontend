type ParagraphProps = {
  text: string;
};

const Paragraph = ({ text }: ParagraphProps) => {
  return (
    <p className="text-sm  min-h-[1em]">
      {text}
    </p>
  );
};

export default Paragraph;

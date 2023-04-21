import Table from './Table';
const SubmissionData = (props: {
  params: {
    id: string;
  };
}) => {
  const {
    params: { id },
  } = props;
  return (
    <div className="h-full overflow-y-auto">
      <Table id={id} />
    </div>
  );
};

export default SubmissionData;

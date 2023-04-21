import { redirect } from 'next/navigation';
import Table from './Table';
import { getFormItem } from '@/utils/server-only';

export const generateMetadata = async (props: {
  params: {
    id: string;
  };
}) => {
  console.log({
    id: props.params.id,
  });
  try {
    const { data } = await getFormItem(props.params.id);
    console.log({ data });
    return {
      title: `Magnum Form - 数据收集 - ${data.title} `,
    };
  } catch (err) {
    console.log(err);
    return {
      title: 'Magnum Form -  数据收集',
    };
  }
};

const SubmissionData = async (props: {
  params: {
    id: string;
  };
}) => {
  const {
    params: { id },
  } = props;
  const { data } = await getFormItem(id);
  if (!data.id) {
    return redirect('/workspaces/dashboard');
  }
  return (
    <div className="h-full overflow-y-auto">
      <Table form={data} id={id} />
    </div>
  );
};

export default SubmissionData;

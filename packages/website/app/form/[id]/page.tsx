import { getFormTemplate } from '@/utils/server-only';
import UserForm from '@/app/UserForm';
import { redirect } from 'next/navigation';
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
      title: `Magnum Form - ${data.title} - ${data.description}`,
    };
  } catch (err) {
    console.log(err);
    return {
      title: 'Magnum Form',
    };
  }
};

const Preview = async (props: {
  params: {
    id: string;
  };
}) => {
  const {
    params: { id },
  } = props;
  const result = await getFormTemplate(id);
  if (!result?.data) {
    return redirect('/workspaces');
  }
  return (
    <>
      <div className="bg-login relative flex h-screen items-center justify-center md:bg-gray-50">
        <div className="h-full w-full md:h-auto md:w-auto">
          <div className="relative box-content h-full overflow-hidden bg-white md:rounded-[4vh]  md:shadow-xl  md:ring-[1.8vh] md:ring-gray-800">
            <div className="top absolute left-0 right-0 top-0 mx-auto hidden h-[3vh] w-[12vh] rounded-bl-[1.2vh] rounded-br-[1.2vh] bg-gray-800 md:block"></div>
            <UserForm data={result.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;

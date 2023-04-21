import { getFormSnapshot } from '@/utils/server-only';
import UserForm from '@/app/UserForm';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Magnum Form Preview - 表单预览',
};

const Preview = async (props: {
  params: {
    id: string;
  };
}) => {
  const {
    params: { id },
  } = props;
  const result = await getFormSnapshot(id);
  if (!result?.data) {
    return redirect('/workspaces');
  }
  return (
    <>
      <div className="relative flex h-screen items-center justify-center md:bg-gray-50">
        <div className="bg-grid absolute left-0 top-0 h-full w-full opacity-20"></div>
        <div className="h-full md:h-auto">
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

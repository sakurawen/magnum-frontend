import { getFormDate } from '@/utils/server-only';
import UserForm from '@/app/UserForm';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Magnum Form Preview',
};

const Preview = async (props: {
  params: {
    id: string;
  };
}) => {
  const {
    params: { id },
  } = props;
  const result = await getFormDate(id);
  if (!result?.data) {
    return redirect('/workspaces');
  }
  return (
    <div className="flex h-screen items-center justify-center md:bg-gray-50">
      <div className="h-full md:h-auto">
        <div className="relative box-content overflow-hidden rounded-[4vh] bg-white  md:shadow-xl md:pt-[4vh]  md:ring-[1.8vh] md:ring-gray-800">
          <div className="hidden md:block top absolute left-0 right-0 top-0 mx-auto h-[3vh] w-[12vh] rounded-bl-[1.2vh] rounded-br-[1.2vh] bg-gray-800">
          </div>
          <UserForm data={result?.data} />
        </div>
      </div>
    </div>
  );
};

export default Preview;

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
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <UserForm data={result?.data} />
        </div>
      </div>
    </div>
  );
};

export default Preview;

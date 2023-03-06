import { redirect } from 'next/navigation';

/**
 * 保留首页
 * @returns
 */
export default function Home() {
  return redirect('/editor');
}

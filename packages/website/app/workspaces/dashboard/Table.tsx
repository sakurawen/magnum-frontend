'use client';
import useSWR from 'swr';
import { request } from '@/utils/request';
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Title,
  Text,
} from '@tremor/react';
import { Button } from '@magnum/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const DashboardTable = () => {
  const { data: list } = useSWR<Service.Response<App.ListForm[]>>(
    '/form/list-all',
    request.post,
  );
  const router = useRouter();
  const handleQuerySubmissions = (id: string) => {
    router.push(`/workspaces/dashboard/${id}`);
    
  };
  return (
    <div className="p-4">
      <Card className="p-2">
        <Title className="px-4 py-4 text-3xl font-bold">
          Form Create Record
        </Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Form ID</TableHeaderCell>
              <TableHeaderCell>标题</TableHeaderCell>
              <TableHeaderCell>说明</TableHeaderCell>
              <TableHeaderCell>创建时间</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Text>{item.description}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>
                      {dayjs(item.create_at).format('YYYY年mm月DD日 hh:mm:ss')}
                    </Text>
                  </TableCell>
                  <TableCell
                    className="text-center"
                    onClick={() => handleQuerySubmissions(item.id)}
                  >
                    <Button variant="gray">查看具体数据</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DashboardTable;

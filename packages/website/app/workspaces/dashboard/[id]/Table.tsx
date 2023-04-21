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
import { formService } from '@/services';

const SubmissionTable = ({ id }: { id: string }) => {
  const { data: list } = useSWR<Service.Response<App.FormSubmissionModel[]>>(
    '/form/submissions',
    (path: string) =>
      request.post(path, {
        form_id: id,
      }),
  );
  console.log('list:', list);

  const handleQuerySubmissionData = (id: string) => {
    formService
      .submissionRecord(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="p-4">
      <Card className="p-2">
        <Title className="px-4 py-4 text-3xl font-bold">
          Submission Record
        </Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>提交时间</TableHeaderCell>
              <TableHeaderCell>提交记录ID</TableHeaderCell>
              <TableHeaderCell>提交人ID</TableHeaderCell>
              <TableHeaderCell>提交人名称</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text>
                      {dayjs(item.create_at).format('YYYY年mm月DD日 hh:mm:ss')}
                    </Text>
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.submit_user_id}</TableCell>
                  <TableCell>
                    <Text>{item.submit_user_name}</Text>
                  </TableCell>

                  <TableCell
                    className="text-center"
                    onClick={() => handleQuerySubmissionData(item.id)}
                  >
                    <Button variant="gray">查看提交数据</Button>
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

export default SubmissionTable;

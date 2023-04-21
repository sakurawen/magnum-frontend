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
  Metric,
  Title,
  Text,
  Badge,
} from '@tremor/react';
import { Button, Dialog } from '@magnum/ui';
import dayjs from 'dayjs';
import { formService } from '@/services';
import { useState } from 'react';

const getFormatFieldValue = (val: any) => {
  if (typeof val === 'boolean') {
    return val ? '是' : '否';
  }
  if (typeof val === 'object') {
    return val.value;
  }
  return val;
};

const SubmissionTable = ({ id, form }: { id: string; form: App.FormModel }) => {
  const { data: list } = useSWR<Service.Response<App.FormSubmissionModel[]>>(
    '/form/submissions',
    (path: string) =>
      request.post(path, {
        form_id: id,
      }),
  );
  const [loading, setLoading] = useState(false);
  const [curLoadId, setCurLoadId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionData, setSubmissionData] = useState<
    App.FormSubmissionDataModel[]
  >([]);
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSubmissionData([]);
    }
  };

  const handleQuerySubmissionData = (id: string) => {
    setCurLoadId(id);
    setLoading(true);
    formService
      .submissionRecord(id)
      .then((res) => {
        setDialogOpen(true);
        console.log(res.data);
        setSubmissionData(
          res.data.map((item) => {
            return {
              ...item,
              field_value: JSON.parse(item.field_value),
            };
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCurLoadId('');
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <Card className="p-2">
        <div className="space-y-2 px-4 py-4">
          <Metric>{form.title}</Metric>
          <Text>{form.description}</Text>
          <Text>
            创建时间：{dayjs(form.create_at).format('YYYY年MM月DD日 hh:mm:ss')}
          </Text>
        </div>
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
                      {dayjs(item.create_at).format('YYYY年MM月DD日 hh:mm:ss')}
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
                    <Button
                      disabled={loading}
                      loading={item.id === curLoadId}
                      variant="gray"
                    >
                      查看提交数据
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      <Dialog onOpenChange={handleDialogOpenChange} open={dialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Card className="w-[576px]  p-4">
              <Metric>{form.title}</Metric>
              <Title>{form.description}</Title>
              <Text>提交ID：{submissionData[0]?.submission_id}</Text>
              <div className="mt-4 space-y-3">
                {submissionData.map((item) => {
                  return (
                    <div key={item.id}>
                      <div className="flex items-start justify-between pb-1">
                        <Title>Q：{item.field_label}</Title>
                        <Badge>{item.field_type}</Badge>
                      </div>
                      <Text>A：{getFormatFieldValue(item.field_value)}</Text>
                    </div>
                  );
                })}
              </div>
              <Button
                onClick={() => handleDialogOpenChange(false)}
                className="mt-4 w-full"
                size="large"
                variant="gray"
              >
                关闭
              </Button>
            </Card>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};

export default SubmissionTable;

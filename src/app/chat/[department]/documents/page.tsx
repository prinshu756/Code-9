import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { department: 'electronics' },
  ];
}

type Props = {
  params: Promise<{
    department: string;
  }>;
};

export default async function DocumentsPage({ params }: Props) {
  const { department } = await params;

  const departmentName =
    department.charAt(0).toUpperCase() + department.slice(1);

  return (
    <AppLayout title={`${departmentName}`}>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <FileText className="w-8 h-8 text-green-500" />
              </div>

              <CardTitle>Documents</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <p>
              Documents for {departmentName} department will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
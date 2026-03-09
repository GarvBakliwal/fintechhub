import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import HomeClient from '@/components/HomeClient';
import { getData } from '@/services/data';
import { cookies } from 'next/headers';

export default async function Home() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ['financial-data'],
    queryFn: () => getData(token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
// app/api/logout/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  cookieStore.set({
    name: 'token',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
  });

  return new Response(null, {
    status: 200,
  });
}

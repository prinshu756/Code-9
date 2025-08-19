
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/chat/electronics`);
  }, [router]);
  
  return null; // or a loading spinner
}

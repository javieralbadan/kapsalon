'use client';
import { supabaseClient } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseAuthReturn {
  isLoading: boolean;
  session: Session | null;
  handleSendMagicLink: (phone: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = (redirectTo: string = '/dashboard'): UseAuthReturn => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

      const {
        data: { session: currentSession },
      } = await supabaseClient.auth.getSession();
      console.log('🚀 ~ fetchSession ~ currentSession:', currentSession);
      setSession(currentSession);
      setIsLoading(false);

      if (redirectTo && !currentSession) {
        router.push(redirectTo);
      }
    };

    void fetchSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setIsLoading(false);
      if (redirectTo && !currentSession) {
        router.push(redirectTo);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, redirectTo]);

  const handleSendMagicLink = async (phone: string) => {
    console.log('🚀 ~ handleSendMagicLink ~ phone:', phone);
    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: `+${phone}`,
      options: {
        channel: 'whatsapp',
      },
    });

    console.log('🚀 ~ handleSendMagicLink ~ error:', error);
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      message.warning('Error al cerrar sesión', 8);
    }
  };

  return { isLoading, session, handleSendMagicLink, signOut };
};

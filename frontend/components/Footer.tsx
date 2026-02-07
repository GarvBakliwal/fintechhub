import { useRouter } from 'next/navigation';
import React from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { FooterProps } from '@/types';
import Logout from './ui/logout';

const Footer = ({ type = 'desktop' }: Omit<FooterProps, 'user'>) => {
  const router = useRouter();
  const user = useGlobalStore((state) => state.user);

  const handleLogOut = () => {
    useGlobalStore.getState().logout?.();
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return (
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName?.[0] || 'U'}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName || 'Guest'}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email || 'guest@example.com'}
        </p>
      </div>

      <Logout/>

    </footer>
  );
};

export default Footer;
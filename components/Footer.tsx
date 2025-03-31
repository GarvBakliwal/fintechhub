import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = () => {
    // Simulate logout by clearing user data and redirecting to sign-in
    console.log('User logged out');
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

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="/icons/logout.svg" width={24} height={24} alt="Logout" />
      </div>
    </footer>
  );
};

export default Footer;
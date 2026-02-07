'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/store/globalStore';

function logout() {
    const router = useRouter();
    const user = useGlobalStore((state) => state.user);

    const handleLogOut = () => {
        useGlobalStore.getState().logout?.();
        localStorage.removeItem('token');
        router.push('/sign-in');
    };
    return (
        <div className="ml-auto" onClick={handleLogOut}>
            <Image src="/icons/logout.svg" width={24} height={24} alt="Logout" />
        </div>
    )
}

export default logout
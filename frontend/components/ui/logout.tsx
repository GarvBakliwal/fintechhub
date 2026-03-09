'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/store/globalStore';
import { logoutUser } from '@/services/auth';

function Logout() {
    const router = useRouter();

    const handleLogOut = async () => {
        useGlobalStore.getState().logout?.();
        await logoutUser();
        router.push('/sign-in');
    };
    return (
        <div className="ml-auto cursor-pointer" onClick={handleLogOut}>
            <Image src="/icons/logout.svg" width={24} height={24} alt="Logout" />
        </div>
    )
}

export default Logout
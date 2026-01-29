'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ArrowRightLeft, History, Wallet } from 'lucide-react';
import { Paper, Group, Text, Box, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

export default function MobileFloatingNav() {
  const pathname = usePathname();
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(scroll.y <= lastScrollY || scroll.y < 50);
    setLastScrollY(scroll.y);
  }, [scroll.y]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Transactions', href: '/transaction-history', icon: History },
    { name: 'Wallet', href: '/my-banks', icon: Wallet },
    { name: 'Transfer', href: '/payment-transfer', icon: ArrowRightLeft },
  ];

  return (
    <Box
      hiddenFrom="md"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 400,
        zIndex: 1000,
      }}
    >
      <Transition mounted={isVisible} transition="slide-up" duration={200}>
        {(styles) => (
          <Paper style={styles} shadow="lg" radius="xl" p="xs" withBorder>
            <Group justify="space-around" gap={0}>
              {navItems.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        padding: '8px 0',
                        color: isActive
                          ? 'var(--mantine-primary-color-6)'
                          : 'var(--mantine-color-gray-5)',
                      }}
                    >
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      <Text size="xs" fw={isActive ? 700 : 500}>
                        {name}
                      </Text>
                    </Box>
                  </Link>
                );
              })}
            </Group>
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
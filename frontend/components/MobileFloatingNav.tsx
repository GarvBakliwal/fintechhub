'use client';

import { mobileSidebarLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Paper, Group, Text, Box, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function MobileFloatingNav() {
  const pathname = usePathname();
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(scroll.y <= lastScrollY || scroll.y < 50);
    setLastScrollY(scroll.y);
  }, [scroll.y]);

  return (
    <Box
      hiddenFrom="md"
      style={{
        position: 'fixed',
        bottom: 'env(safe-area-inset-bottom)',
        left: 0,
        width: '100%',
        zIndex: 999,
      }}
    >
      <Transition mounted={isVisible} transition="slide-up" duration={200}>
        {(styles) => (
          <Paper
            style={{
              ...styles,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}
            shadow="lg"
            py={8}
            px={6}
            withBorder
          >
            <Group justify="space-between" align="center">
              {mobileSidebarLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);

                return (
                  <Link
                    key={item.label}
                    href={item.route}
                    style={{
                      textDecoration: 'none',
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        minWidth: 72,
                        background: isActive ? 'rgba(29,78,216,0.08)' : 'transparent',
                        borderRadius: 10,
                        padding: '6px 8px'
                      }}
                    >
                      {/* ICON */}
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={22}
                        height={22}
                        style={{
                          opacity: isActive ? 1 : 0.6,
                          filter: isActive
                            ? 'none'
                            : 'grayscale(100%) brightness(0.6)',
                        }}
                      />

                      {/* LABEL */}
                      <Text
                        size="10px"
                        fw={isActive ? 700 : 500}
                        style={{
                          color: isActive
                            ? '#1d4ed8'
                            : '#6b7280',
                          textAlign: 'center',
                        }}
                      >
                        {item.label}
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
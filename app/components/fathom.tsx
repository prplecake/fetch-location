'use client';
import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Fathom() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    load('HOYQYQEM', {
      includedDomains: ['prplecake.github.io'],
      spa: 'auto',
    });

    trackPageview();
  }, [pathname, searchParams]);

  return null;
}
'use client';
import { load, trackPageview } from "fathom-client";
import {Suspense, useEffect} from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    load('HOYQYQEM', {
      includedDomains: ['prplecake.github.io'],
      spa: 'auto',
    });
  }, []);

  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
      <Suspense fallback={null}>
        <TrackPageView/>
      </Suspense>
  );
}
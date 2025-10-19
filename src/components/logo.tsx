import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <div className="p-1.5 bg-primary rounded-lg">
        <Zap className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-bold font-headline tracking-tighter">Digital Connect</span>
    </Link>
  );
}

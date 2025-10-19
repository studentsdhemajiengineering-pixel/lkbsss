import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3" prefetch={false}>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-800 font-bold text-sm">LKB</span>
        </div>
        <div>
            <h1 className="text-lg font-bold text-white">Luit Kumar Barman</h1>
            <p className="text-xs text-blue-100">Official Website</p>
        </div>
    </Link>
  );
}

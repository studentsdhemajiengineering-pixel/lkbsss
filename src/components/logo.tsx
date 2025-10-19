import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3" prefetch={false}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
            <Image src="https://picsum.photos/seed/logo/40/40" alt="Luit Kumar Barman" width={40} height={40} className="object-cover"/>
        </div>
        <div>
            <h1 className="text-lg font-bold text-white">Luit Kumar Barman</h1>
            <p className="text-xs text-blue-100">Official Website</p>
        </div>
    </Link>
  );
}

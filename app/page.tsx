import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="p-8 text-center space-y-6">
      <Image
        src="/next.svg"
        alt="Sacrament Meeting Planner logo"
        width={180}
        height={38}
        className="mx-auto dark:invert"
      />
      <h1 className="text-3xl font-bold">Sacrament Meeting Planner</h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Plan, review, and print sacrament meeting programs for your ward — announcements,
        hymns, prayers, and speakers all in one place.
      </p>
      <Link
        href="/meetings"
        className="inline-block rounded-lg bg-blue-600 text-white px-6 py-2 font-medium hover:bg-blue-700 transition"
      >
        View Meetings
      </Link>
    </div>
  );
}
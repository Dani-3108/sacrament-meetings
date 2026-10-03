import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <Link
            href={`/meetings/${meeting.id}`}
            className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
        >
            <p className="text-sm text-gray-500">{meeting.date}</p>
            <h2 className="text-lg font-semibold capitalize">{meeting.meetingType} Meeting</h2>
            <p className="text-sm text-gray-600">Presiding: {meeting.presiding}</p>
        </Link>
    );
}
import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
            <Link href={`/meetings/${meeting.id}`} className="block">
                <p className="text-sm text-gray-500">{meeting.date}</p>
                <h2 className="text-lg font-semibold capitalize">{meeting.meetingType} Meeting</h2>
                <p className="text-sm text-gray-600">Presiding: {meeting.presiding}</p>
            </Link>

            <div className="mt-3 flex items-center gap-4">
                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    aria-label={`Edit meeting on ${meeting.date}`}
                    className="text-sm font-semibold text-blue-700 hover:underline"
                >
                    Edit
                </Link>
                <form action={deleteMeeting.bind(null, String(meeting.id))}>
                    <button
                        type="submit"
                        aria-label={`Delete meeting on ${meeting.date}`}
                        className="text-sm font-semibold text-red-700 hover:underline"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}
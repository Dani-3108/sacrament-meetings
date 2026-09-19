import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
    const res = await fetch('http://localhost:3000/api/meetings', { cache: 'no-store' });
    return res.json();
}

export default async function MeetingsPage() {
    const meetings = await getMeetings();

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">All Meetings</h1>
            <div className="space-y-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </div>
    );
}
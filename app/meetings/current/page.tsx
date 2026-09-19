import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    const isoDate = sunday.toISOString().split('T')[0];
    const meetings = getMeetings(isoDate);

    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    }

    redirect('/meetings');
}
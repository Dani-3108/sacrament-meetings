import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
    const res = await fetch(`http://localhost:3000/api/meetings/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export default async function MeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meeting = await getMeeting(id);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}
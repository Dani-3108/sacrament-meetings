import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';
import MeetingForm from '../../meeting-form';

export default async function EditMeetingPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const meetingId = Number(id);
    if (Number.isNaN(meetingId)) notFound();

    const meeting = await getMeetingById(meetingId);
    if (!meeting) notFound();

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Edit Meeting</h1>
            <MeetingForm action={updateMeeting.bind(null, id)} meeting={meeting} submitLabel="Save Changes" />
        </main>
    );
}
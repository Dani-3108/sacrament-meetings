import MeetingForm from '../meeting-form';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Create Meeting</h1>
            <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
        </main>
    );
}
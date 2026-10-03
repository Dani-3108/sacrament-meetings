import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
    const date = new URL(request.url).searchParams.get('date');
    const meetings = await getMeetings();

    if (date) {
        const filtered = meetings.filter((m) => m.date === date);
        return Response.json(filtered);
    }

    return Response.json(meetings);
}
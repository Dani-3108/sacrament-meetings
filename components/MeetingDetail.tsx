import type { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <article className="space-y-4 p-4">
            <header>
                <p className="text-sm text-gray-500">{meeting.date}</p>
                <h1 className="text-2xl font-bold capitalize">{meeting.meetingType} Meeting</h1>
                <p className="text-sm text-gray-600">
                    Presiding: {meeting.presiding} · Conducting: {meeting.conducting}
                </p>
            </header>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section>
                    <h2 className="font-semibold">Announcements</h2>
                    <ul className="list-disc list-inside">
                        {meeting.announcements.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h2 className="font-semibold">Opening Hymn</h2>
                <p>#{meeting.openingHymn.number} — {meeting.openingHymn.title}</p>
            </section>

            <section>
                <h2 className="font-semibold">Opening Prayer</h2>
                <p>{meeting.openingPrayer}</p>
            </section>

            {meeting.wardBusiness.length > 0 && (
                <section>
                    <h2 className="font-semibold">Ward Business</h2>
                    <ul className="list-disc list-inside">
                        {meeting.wardBusiness.map((item, i) => (
                            <li key={i}>{item.description}</li>
                        ))}
                    </ul>
                </section>
            )}

            {meeting.stakeBusiness && (
                <p className="italic text-sm">This meeting includes stake business.</p>
            )}

            <section>
                <h2 className="font-semibold">Sacrament Hymn</h2>
                <p>#{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}</p>
            </section>

            {meeting.speakers.length > 0 && (
                <section>
                    <h2 className="font-semibold">Speakers &amp; Musical Numbers</h2>
                    <ul className="list-disc list-inside">
                        {meeting.speakers.map((s, i) => (
                            <li key={i}>
                                {s.name}
                                {s.type === 'speaker' && s.topic ? ` — ${s.topic}` : ''}
                                {s.type === 'musical-number' ? ' (Musical Number)' : ''}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h2 className="font-semibold">Closing Hymn</h2>
                <p>#{meeting.closingHymn.number} — {meeting.closingHymn.title}</p>
            </section>

            <section>
                <h2 className="font-semibold">Closing Prayer</h2>
                <p>{meeting.closingPrayer}</p>
            </section>
        </article>
    );
}
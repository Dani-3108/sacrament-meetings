import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-09-06',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' },
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: Sept 12'],
    },
    {
        id: 2,
        date: '2026-09-13',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Brother Lee',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: "'Tis Sweet to Sing the Matchless Love" },
        speakers: [],
        closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        closingPrayer: 'Sister Garcia',
        announcements: ['Fast and testimony meeting this week'],
    },
    {
        id: 3,
        date: '2026-09-20',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Kim',
        wardBusiness: [{ description: 'Release of ward clerk' }],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [
            { name: 'Brother Taylor', topic: 'Service', type: 'speaker' },
            { name: 'Sister Nguyen', topic: 'Gratitude', type: 'speaker' },
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Brother Martinez',
    },
    {
        id: 4,
        date: '2026-09-27',
        meetingType: 'stake',
        presiding: 'President Anderson',
        conducting: 'President Anderson',
        openingHymn: { number: 248, title: 'Called to Serve' },
        openingPrayer: 'Sister Patel',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [{ name: 'Stake President', topic: 'Missionary Work', type: 'speaker' }],
        closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        closingPrayer: 'Brother Chen',
    },
    {
        id: 5,
        date: '2026-10-04',
        meetingType: 'general',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Alvarez',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [],
        closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        closingPrayer: 'Brother Wilson',
        announcements: ['General Conference weekend'],
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter((m) => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find((m) => m.id === id) ?? null;
}
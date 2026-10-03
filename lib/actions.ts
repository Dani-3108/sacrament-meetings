'use server';

import { z } from 'zod';
import type { SacramentMeeting, SpeakerItem } from './types';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';
import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
} from './meetings-db';

const MeetingFormSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.'),
    meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
        error: 'Choose a meeting type.',
    }),
    presiding: z.string().trim().min(1, 'Presiding is required.'),
    conducting: z.string().trim().min(1, 'Conducting is required.'),
    openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
    closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
    openingHymnNumber: z.coerce.number().int().min(1, 'Enter a hymn number.'),
    openingHymnTitle: z.string().trim().min(1, 'Hymn title is required.'),
    sacramentHymnNumber: z.coerce.number().int().min(1, 'Enter a hymn number.'),
    sacramentHymnTitle: z.string().trim().min(1, 'Hymn title is required.'),
    closingHymnNumber: z.coerce.number().int().min(1, 'Enter a hymn number.'),
    closingHymnTitle: z.string().trim().min(1, 'Hymn title is required.'),
    announcements: z.string().optional(),
    wardBusiness: z.string().optional(),
    stakeBusiness: z.string().optional(),
});

export type State = {
    errors?: Record<string, string[] | undefined>;
    message?: string | null;
};

function splitLines(text?: string): string[] {
    return (text ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function readSpeakers(formData: FormData): SpeakerItem[] {
    const speakers: SpeakerItem[] = [];
    for (let i = 1; i <= 3; i++) {
        const name = String(formData.get(`speaker${i}Name`) ?? '').trim();
        if (!name) continue;
        speakers.push({
            name,
            topic: String(formData.get(`speaker${i}Topic`) ?? '').trim(),
            type: formData.get(`speaker${i}Type`) === 'musical-number' ? 'musical-number' : 'speaker',
        });
    }
    return speakers;
}

function buildMeeting(
    d: z.infer<typeof MeetingFormSchema>,
    formData: FormData
): Omit<SacramentMeeting, 'id'> {
    return {
        date: d.date,
        meetingType: d.meetingType,
        presiding: d.presiding,
        conducting: d.conducting,
        announcements: splitLines(d.announcements),
        openingHymn: { number: d.openingHymnNumber, title: d.openingHymnTitle },
        openingPrayer: d.openingPrayer,
        wardBusiness: splitLines(d.wardBusiness).map((description) => ({ description })),
        stakeBusiness: d.stakeBusiness === 'on',
        sacramentHymn: { number: d.sacramentHymnNumber, title: d.sacramentHymnTitle },
        speakers: readSpeakers(formData),
        closingHymn: { number: d.closingHymnNumber, title: d.closingHymnTitle },
        closingPrayer: d.closingPrayer,
    };
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to create meeting.',
        };
    }

    try {
        await addMeeting(buildMeeting(parsed.data, formData));
    } catch (error) {
        console.error('Error creating meeting:', error);
        throw new Error('Failed to create meeting. Please try again later.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(id: string, prevState: State, formData: FormData): Promise<State> {
    const meetingId = Number(id);
    if (Number.isNaN(meetingId)) notFound();

    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to update meeting.',
        };
    }

    let updated;
    try {
        updated = await updateMeetingInDb(meetingId, buildMeeting(parsed.data, formData));
    } catch (error) {
        console.error('Error updating meeting:', error);
        throw new Error('Failed to update meeting. Please try again later.');
    }
    if (!updated) notFound();

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function deleteMeeting(id: string) {
    try {
        await deleteMeetingInDb(Number(id));
    } catch (error) {
        console.error('Error deleting meeting:', error);
        throw new Error('Failed to delete meeting. Please try again later.');
    }
    revalidatePath('/meetings');
}
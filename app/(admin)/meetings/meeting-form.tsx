'use client';

import { useActionState } from 'react';
import type { Hymn, SacramentMeeting, SpeakerItem } from '@/lib/types';
import type { State } from '@/lib/actions';

type Props = {
    action: (prevState: State, formData: FormData) => Promise<State>;
    meeting?: SacramentMeeting;
    submitLabel: string;
};

const initialState: State = { message: null, errors: {} };

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors?.map((error) => (
                <p key={error} className="field-error">{error}</p>
            ))}
        </div>
    );
}

function HymnFields({ prefix, label, hymn, errors }: {
    prefix: string;
    label: string;
    hymn?: Hymn;
    errors?: State['errors'];
}) {
    return (
        <fieldset>
            <legend>{label}</legend>
            <label htmlFor={`${prefix}Number`}>Number</label>
            <input id={`${prefix}Number`} name={`${prefix}Number`} type="number" min="1"
                defaultValue={hymn?.number} aria-describedby={`${prefix}Number-error`} required />
            <FieldError id={`${prefix}Number-error`} errors={errors?.[`${prefix}Number`]} />

            <label htmlFor={`${prefix}Title`}>Title</label>
            <input id={`${prefix}Title`} name={`${prefix}Title`}
                defaultValue={hymn?.title} aria-describedby={`${prefix}Title-error`} required />
            <FieldError id={`${prefix}Title-error`} errors={errors?.[`${prefix}Title`]} />
        </fieldset>
    );
}

function SpeakerFields({ speakers }: { speakers?: SpeakerItem[] }) {
    return (
        <fieldset>
            <legend>Speakers and musical numbers (leave unused rows blank)</legend>
            {[1, 2, 3].map((n) => {
                const speaker = speakers?.[n - 1];
                return (
                    <fieldset key={n}>
                        <legend>Row {n}</legend>
                        <label htmlFor={`speaker${n}Name`}>Name</label>
                        <input id={`speaker${n}Name`} name={`speaker${n}Name`} defaultValue={speaker?.name} />

                        <label htmlFor={`speaker${n}Topic`}>Topic</label>
                        <input id={`speaker${n}Topic`} name={`speaker${n}Topic`} defaultValue={speaker?.topic} />

                        <label htmlFor={`speaker${n}Type`}>Type</label>
                        <select id={`speaker${n}Type`} name={`speaker${n}Type`} defaultValue={speaker?.type ?? 'speaker'}>
                            <option value="speaker">Speaker</option>
                            <option value="musical-number">Musical number</option>
                        </select>
                    </fieldset>
                );
            })}
        </fieldset>
    );
}

export default function MeetingForm({ action, meeting, submitLabel }: Props) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form className="meeting-form" action={formAction}>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" defaultValue={meeting?.date} aria-describedby="date-error" required />
            <FieldError id="date-error" errors={state.errors?.date} />

            <label htmlFor="meetingType">Meeting type</label>
            <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? ''} aria-describedby="meetingType-error" required>
                <option value="" disabled>Select a type</option>
                <option value="regular">Regular</option>
                <option value="testimony">Testimony</option>
                <option value="stake">Stake</option>
                <option value="general">General</option>
            </select>
            <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
            <label htmlFor="presiding">Presiding</label>
            <input id="presiding" name="presiding" defaultValue={meeting?.presiding} aria-describedby="presiding-error" required />
            <FieldError id="presiding-error" errors={state.errors?.presiding} />

            <label htmlFor="conducting">Conducting</label>
            <input id="conducting" name="conducting" defaultValue={meeting?.conducting} aria-describedby="conducting-error" required />
            <FieldError id="conducting-error" errors={state.errors?.conducting} />

            <label htmlFor="openingPrayer">Opening prayer</label>
            <input id="openingPrayer" name="openingPrayer" defaultValue={meeting?.openingPrayer} aria-describedby="openingPrayer-error" required />
            <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />

            <label htmlFor="closingPrayer">Closing prayer</label>
            <input id="closingPrayer" name="closingPrayer" defaultValue={meeting?.closingPrayer} aria-describedby="closingPrayer-error" required />
            <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
            <HymnFields prefix="openingHymn" label="Opening hymn" hymn={meeting?.openingHymn} errors={state.errors} />
            <HymnFields prefix="sacramentHymn" label="Sacrament hymn" hymn={meeting?.sacramentHymn} errors={state.errors} />
            <HymnFields prefix="closingHymn" label="Closing hymn" hymn={meeting?.closingHymn} errors={state.errors} />
            <label htmlFor="announcements">Announcements</label>
            <textarea id="announcements" name="announcements" rows={3}
                defaultValue={meeting?.announcements?.join('\n')} aria-describedby="announcements-hint" />
            <p id="announcements-hint">One announcement per line.</p>

            <label htmlFor="wardBusiness">Ward business</label>
            <textarea id="wardBusiness" name="wardBusiness" rows={3}
                defaultValue={meeting?.wardBusiness?.map((item) => item.description).join('\n')}
                aria-describedby="wardBusiness-hint" />
            <p id="wardBusiness-hint">One item per line (releases, sustainings, and so on).</p>

            <label>
                <input type="checkbox" name="stakeBusiness" defaultChecked={meeting?.stakeBusiness} />
                Stake business
            </label>

            <SpeakerFields speakers={meeting?.speakers} />

            {state.message ? <p className="field-error">{state.message}</p> : null}
            <button type="submit" disabled={isPending}>{isPending ? 'Saving...' : submitLabel}</button>
        </form>
    );
}
// components/login-form.tsx
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction} className="space-y-4 rounded-lg bg-white p-6 shadow">
            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" name="email" required className="w-full rounded border border-gray-300 px-3 py-2 focus:border-[#043063] focus:outline-none focus:ring-2 focus:ring-[#043063]/30" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" minLength={6} required />
            </div>
            <button aria-disabled={isPending} type="submit" className="w-full rounded bg-[#043063] py-2 font-semibold text-white hover:bg-[#032450] aria-disabled:opacity-60">
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>
            {errorMessage && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
        </form>
    );
}
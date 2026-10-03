export default function Header() {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="border-b border-gray-200 p-4">
            <h1 className="text-xl font-bold">First Ward</h1>
            <p className="text-sm text-gray-500">{today}</p>
        </header>
    );
}
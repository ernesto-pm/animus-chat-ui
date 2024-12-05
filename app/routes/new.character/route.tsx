import {useFetcher} from "@remix-run/react";
import {ActionFunctionArgs, json} from "@remix-run/cloudflare";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name');
    const display_name = formData.get('display_name');
    const details = formData.get('details');
    const personality = formData.get('personality');

    try {
        // Make your API call here
        const response = await fetch('http://localhost:3000/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, display_name, details, personality }),
        });

        if (!response.ok) {
            throw new Error('Failed to create character');
        }

        return json({ success: true });
    } catch (error) {
        return json({ error: error.message }, { status: 400 });
    }
}

export default function NewCharacter() {
    const fetcher = useFetcher<{success: boolean, error: string}>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        fetcher.submit(formData, { method: 'POST' });  // Specify POST method here
    };

    return (
        <div className="p-10 flex flex-col space-y-2">
            <div className="text-2xl">
                Create a new character
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <div className="flex flex-col space-x-1">
                    <div>Name:</div>
                    <input name="name" className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Display name:</div>
                    <input name="display_name" className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Details:</div>
                    <textarea rows={5} name="details" className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Personality:</div>
                    <textarea rows={5} name="personality" className="p-2"/>
                </div>

                <button
                    type="submit"
                    className="border-2 p-0.5 rounded-md"
                    disabled={fetcher.state === 'submitting'}
                >
                    {fetcher.state === 'submitting' ? 'Creating...' : 'Create'}
                </button>

                {fetcher.data?.error && (
                    <div className="text-red-500">{fetcher.data.error}</div>
                )}

                {fetcher.data?.success && (
                    <div className="text-green-500">Character created successfully!</div>
                )}
            </form>
        </div>
    )
}
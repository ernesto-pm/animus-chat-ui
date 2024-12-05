import {useFetcher} from "@remix-run/react";
import {json} from "@remix-run/cloudflare";

export async function action({ request }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const content = formData.get('content');

    try {
        // Make your API call here
        const response = await fetch('http://localhost:3000/system_messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, content }),
        });

        if (!response.ok) {
            throw new Error('Failed to create system message');
        }

        return json({ success: true });
    } catch (error) {
        return json({ error: error.message }, { status: 400 });
    }
}

export default function NewSystemPrompt() {
    const fetcher = useFetcher()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        fetcher.submit(formData, { method: 'POST' });  // Specify POST method here
    };

    return (
        <div className="p-10 flex flex-col space-y-2">
            <div className="text-2xl">
                Create a new system prompt
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <div className="flex flex-col space-x-1">
                    <div>Name:</div>
                    <input name="name" className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Content:</div>
                    <textarea rows={5} name="content" className="p-2"/>
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
                    <div className="text-green-500">System message created successfully!</div>
                )}
            </form>
        </div>
    )
}
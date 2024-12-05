import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import { useForm } from "react-hook-form";
import {createPersonaPersonasPost} from "~/services/openapi";
import {useLoaderData} from "@remix-run/react";
import {authenticate} from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticate(request, "/new/persona") // we specify that we want to return here
    return {user}
}

export default function NewPersona() {
    const {user} = useLoaderData<typeof loader>()

    const { register, handleSubmit, formState: { isSubmitSuccessful, errors, isSubmitting} } = useForm<{name: string, details: string}>();
    async function onSubmit(data: {name: string, details: string}) {
        await createPersonaPersonasPost({body: {
            name: data.name, details: data.details, associatedUserId: user.id
        }})
    }

    return (
        <div className="p-10 flex flex-col space-y-2">
            <div className="text-2xl">
                Create a new persona
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                <div className="flex flex-col space-x-1">
                    <div>Name:</div>
                    <input {...register("name")} className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Details:</div>
                    <input {...register("details")} className="p-2"/>
                </div>

                <button type="submit" className="border-2 p-0.5 rounded-md" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>

                {isSubmitSuccessful && "Success!"}
            </form>
        </div>
    )
}
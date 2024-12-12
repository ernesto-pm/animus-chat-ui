import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import { useForm } from "react-hook-form";
import {
    createSystemMessage, getAllUsers
} from "~/services/openapi";
import {useLoaderData} from "@remix-run/react";
import {authenticate} from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticate(request, "/new/system-message") // we specify that we want to return here
    const users = await getAllUsers()

    return {user, userList: users.data}
}

interface FormArguments {
    name: string
    content: string
    isPublic: boolean | undefined
    overrideAssociatedUserId: string | undefined
}

export default function NewSystemMessage() {
    const {user, userList} = useLoaderData<typeof loader>()
    const { register, handleSubmit, formState: { isSubmitSuccessful, errors, isSubmitting} } = useForm<FormArguments>();

    async function onSubmit(data: FormArguments) {
        let associatedUserId = user.id
        if (data.overrideAssociatedUserId && data.overrideAssociatedUserId !== "") {
            associatedUserId = data.overrideAssociatedUserId!
        }

        let isPublic = false
        if (data.isPublic) {
            isPublic = data.isPublic
        }

        const response = await createSystemMessage({body: {
                name: data.name,
                content: data.content,
                associatedUserId: associatedUserId,
                isPublic: isPublic
            }
        })

        if (response.error) {
            throw response.error
        }
    }

    return (
        <div className="p-10 flex flex-col space-y-2">
            <div className="text-2xl">
                Create a new system message
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                <div className="flex flex-col space-x-1">
                    <div>Name:</div>
                    <input {...register("name")} className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div>Content:</div>
                    <textarea {...register("content")} className="p-2"/>
                </div>

                {
                    user.is_admin &&
                    <div>
                        Make it available for all users? (Public)&nbsp;
                        <input type="checkbox" {...register("isPublic")} />
                    </div>
                }

                {
                    (user.is_admin && userList) &&
                        <div>
                            <div>
                                Associate with user:
                            </div>
                            <select
                                {...register("overrideAssociatedUserId")}
                            >
                                <option/>
                                {
                                    userList.map(user => <option
                                        key={user.id}
                                        value={user.id}>
                                        {user.name}
                                    </option>)
                                }
                            </select>
                        </div>
                }

                <button type="submit" className="border-2 p-0.5 rounded-md" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>

                {isSubmitSuccessful && "Success!"}
            </form>
        </div>
    )
}
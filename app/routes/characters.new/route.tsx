import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import { useForm } from "react-hook-form";
import {createCharacter, getAllUsers} from "~/services/openapi";
import {useLoaderData} from "@remix-run/react";
import {authenticate} from "~/services/auth.server";
import PersonalityTraitsForm from "~/routes/characters.new/personalityTraitsForm";
import SkillsForm from "~/routes/characters.new/skilsForm";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticate(request, "/new/character") // we specify that we want to return here
    const users = await getAllUsers()

    return {user, userList: users.data}
}

interface PersonalityTraitObject {
    name: string
    value: string
}

interface SkillsObject {
    name: string
    value: string
}

export interface FormArguments {
    name: string
    displayName: string
    details: string
    personalityTraits: Array<PersonalityTraitObject>
    skills: Array<SkillsObject>
    isPublic: boolean | undefined
    overrideAssociatedUserId: string | undefined
}

export default function NewCharacter() {
    const {user, userList} = useLoaderData<typeof loader>()
    const { register, control, handleSubmit, formState: { isSubmitSuccessful, errors, isSubmitting} } = useForm<FormArguments>({
        defaultValues: {
            personalityTraits: [
                {name: "general details", value: ""},
                {name: "fears", value: ""},
                {name: "desires", value: ""},
                {name: "values", value: ""}
            ]
        }
    });

    async function onSubmit(data: FormArguments) {
        let associatedUserId = user.id
        if (data.overrideAssociatedUserId && data.overrideAssociatedUserId !== "") {
            associatedUserId = data.overrideAssociatedUserId!
        }

        let isPublic = false
        if (data.isPublic) {
            isPublic = data.isPublic
        }

        const response = await createCharacter({
            body: {
                name: data.name,
                display_name: data.displayName,
                details: data.details,
                associated_user_id: associatedUserId,
                is_public: isPublic,
                additional_attributes: JSON.stringify({
                    personalityTraits: data.personalityTraits,
                    skills: data.skills
                })
            }
        })

        if (response.error) {
            throw response.error
        }
    }

    return (
        <div className="p-10 flex flex-col space-y-2">
            <div className="text-2xl">
                Create a new Character
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                <div className="flex flex-col space-x-1">
                    <div className="font-bold">Name:</div>
                    <input {...register("name")} className="p-2"/>
                </div>

                <div className="flex flex-col space-x-1">
                    <div className="font-bold">Display Name:</div>
                    <input {...register("displayName")} className="p-2"/>
                </div>

                <div>
                    <div className="font-bold">Details:</div>
                    <textarea {...register("details")} className="w-full" rows={3}/>
                </div>

                <PersonalityTraitsForm control={control} register={register} />

                <SkillsForm control={control} register={register} />

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
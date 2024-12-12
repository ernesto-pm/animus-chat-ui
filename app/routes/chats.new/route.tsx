import {
    createChat,
    getAllUsers,
    getCharactersForUser, getPersonasForUser, getScenariosForUser, getSystemMessagesForUser
} from "~/services/openapi";
import {authenticate} from "~/services/auth.server";
import {LoaderFunctionArgs, redirect} from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";
import {useForm} from "react-hook-form";

export async function loader({request}: LoaderFunctionArgs) {
    const user = await authenticate(request, "/new/character")
    if (!user) redirect("/login")

    const users = await getAllUsers()
    const characters = await getCharactersForUser({path: {
        user_id: user.id
    }})
    const personas = await getPersonasForUser({path: {
        user_id: user.id
    }})
    const systemMessages = await getSystemMessagesForUser({path: {
        user_id: user.id
    }})
    const scenarios = await getScenariosForUser({path: {
        user_id: user.id
    }})

    return {
        user,
        users: users.data,
        characters: characters.data,
        personas: personas.data,
        systemMessages: systemMessages.data,
        scenarios: scenarios.data
    }
}

export interface FormArguments {
    name: string
    modelVersion: string
    characterId: string
    personaId: string
    systemMessageId: string
    scenarioId: string
    overrideAssociatedUserId: string
    // ToDo: add settings
}

export default function CreateChat() {
    const {user, users, characters, personas, systemMessages, scenarios} = useLoaderData<typeof loader>()
    const { register, control, handleSubmit, formState: { isSubmitSuccessful, errors, isSubmitting} } = useForm<FormArguments>()

    async function onSubmit(data: FormArguments) {
        let associatedUserId = user.id
        if (data.overrideAssociatedUserId && data.overrideAssociatedUserId !== "") {
            associatedUserId = data.overrideAssociatedUserId!
        }

        const response = await createChat({
            body: {
                name: data.name,
                modelVersion: data.modelVersion,
                characterId: data.characterId,
                personaId: data.personaId,
                systemMessageId: data.systemMessageId,
                scenarioId: data.scenarioId,
                associatedUserId: associatedUserId,
                settings: null // ToDo: Add this at some point lol
            }
        })

        if (response.error) {
            throw response.error
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <h1 className="text-2xl font-bold">New Chat</h1>
            <hr/>

            <div>
                Name:
                <input {...register("name")}/>
            </div>

            <div>
                Model Version:
                <input {...register("modelVersion")}/>
            </div>

            <div>
                Character:
                <select {...register("characterId")}>
                    <option/>
                    {characters?.map((character) => (
                        <option key={character.id} value={character.id}>{character.name}</option>
                    ))}
                </select>
            </div>

            <div>
                Persona:
                <select {...register("personaId")}>
                    <option/>
                    {personas?.map((persona) => (
                        <option key={persona.id} value={persona.id}>{persona.name}</option>
                    ))}
                </select>
            </div>

            <div>
                System Message:
                <select {...register("systemMessageId")}>
                    <option/>
                    {systemMessages?.map((systemMessage) => (
                        <option key={systemMessage.id} value={systemMessage.id}>{systemMessage.name}</option>
                    ))}
                </select>
            </div>

            <div>
                Scenario:
                <select {...register("scenarioId")}>
                    <option/>
                    {scenarios?.map((scenario) => (
                        <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                    ))}
                </select>
            </div>

            {
                (user.is_admin && users) &&
                <div>
                    <div>
                        Associate with user:
                    </div>
                    <select
                        {...register("overrideAssociatedUserId")}
                    >
                        <option/>
                        {
                            users.map(user => <option
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
    )
}
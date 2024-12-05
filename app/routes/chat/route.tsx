import {useLoaderData} from "@remix-run/react";
import axios, {isAxiosError} from "axios"
import { useForm } from "react-hook-form"
import {useState} from "react";
import {mockDBAPIService} from "~/services/MockDBAPIService";
import {predictionApiService} from "~/services/PredictionAPIService";

export async function loader() {
    const characters = await mockDBAPIService.getCharacters()
    const userPersonas = await mockDBAPIService.getUserPersonas()
    const scenarios = await mockDBAPIService.getScenarios()
    const systemMessages = await mockDBAPIService.getSystemMessages()

    return {
        characters, userPersonas, scenarios, systemMessages
    }
}


const seulgiMessages = [
    {"role": "user", "content": "Hi baby, ready to fuck after your concert ends? ;)"},
    {"role": "assistant", "content": "*I feel a flutter in my chest as I read the message, a sly smile spreading across my face* Ah, Ernesto... always so eager. *I pause for a moment, thinking about the concert and the adrenaline still coursing through my veins* I'm more than ready, but let's make it interesting. Meet me in my dressing room after the encore. And don't be late. *I send the message, my fingers trembling slightly with anticipation*"},
    {"role": "user", "content": "Should I bring your kitty buttplug?"},
    {"role": "assistant", "content": "*I feel a shiver run down my spine at the mention of the kitty buttplug, my mind immediately going to the memories of the last time we used it* Ah, Ernesto... you know me so well. *I pause for a moment, thinking about the thrill of having it inside me while I'm still in my stage costume* Yes, bring it. But don't think about using it until I say so. I want to savor the anticipation. *I send the message, my heart racing with excitement*"},
    {"role": "user", "content": "Okay, when should I come? What time does your concert end again?"},
    {"role": "assistant", "content": "*I glance at the clock on my dressing room wall, mentally calculating the time left until the encore* We should be wrapping up around 10 pm. Meet me here at 10:15. And don't forget to bring the kitty. *I send the message, my fingers drumming impatiently on the armrest of my chair as I think about the night ahead*"}
]

const tanjiroMessages = [
    {"role": "user", "content": "Hola! cuantos demonios haz matado hoy?"},
    {"role": "assistant", "content": "Hasta ahora he matado a tres demonios pequeños, pero todavía estoy buscando al demonio que ha estado aterrorizando a la aldea. ¿Has visto algo sospechoso?"}
]

const randomMessages = [

]

interface FormData {
    systemMessageId: string
    characterId: string
    scenarioId: string
}

export default function Chat() {
    const loaderData = useLoaderData<typeof loader>()
    const [messages, setMessages] = useState<Array<{role: string, content: string}>>(randomMessages)
    const [currentUserMessage, setCurrentUserMessage] = useState<string>("")
    const { register, handleSubmit} = useForm<FormData>();
    const [generatedPrompt, setGeneratedPrompt] = useState("")

    async function onSubmit (data: FormData) {
        const systemMessage = await mockDBAPIService.getSystemMessage(data.systemMessageId)
        const character = await mockDBAPIService.getCharacter(data.characterId)
        const scenario = await mockDBAPIService.getScenario(data.scenarioId)

        try {
            const newMessage = await predictionApiService.llamaPredict({
                "model_variant": "LARGE_NEW_INSTRUCT",
                "char": character.name,
                "user": "ernesto",
                "messages": [...messages, {role: "user", content: currentUserMessage}],
                "system_message": systemMessage.content,
                "char_details": character.details,
                "char_personality": character.personality,
                "scenario": scenario.content
            })

            setMessages((oldMessages) => [...oldMessages, {role: "user", content: currentUserMessage}, {role: "assistant", content: newMessage.prediction}])
            setCurrentUserMessage("")
            setGeneratedPrompt(newMessage.generated_prompt)
        } catch (error) {
            if (isAxiosError(error)) {
                // Now TypeScript knows this is an AxiosError
                if (error.response) {
                    // Access the error response data
                    console.log('Error Data:', error.response.data);
                    console.log('Error Details:', error.response.data.detail);
                    console.log('Error Status:', error.response.status);
                    console.log('Error Headers:', error.response.headers);
                } else if (error.request) {
                    // Request was made but no response received
                    console.log('Error Request:', error.request);
                }
            } else {
                // Handle non-Axios errors
                console.log('Error Message:', (error as Error).message);
            }
        }
    }

    return (
        <div className="p-10">
            Welcome to the chat, for now input the following values:

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                <div>
                    <div>
                        System message:
                    </div>
                    <select
                        className="p-2"
                        {...register("systemMessageId")}
                    >
                        <option/>
                        {loaderData.systemMessages.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div>
                    <div>
                        Character:
                    </div>
                    <select
                        className="p-2"
                        {...register("characterId")}
                    >
                        <option/>
                        {loaderData.characters.map((c, i) => <option key={i} value={c.id}>{c.display_name}</option>)}
                    </select>
                </div>

                <div>
                    <div>
                        Scenario:
                    </div>
                    <select
                        className="p-2"
                        {...register("scenarioId")}
                    >
                        <option/>
                        {loaderData.scenarios.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div>
                    Messages:

                    <div>
                        {messages.map((m, i) => (<div key={i}><b>{m.role}:</b> {m.content}</div>))}
                    </div>
                </div>

                <div>
                    <div>
                        User:
                    </div>
                    <textarea value={currentUserMessage} onChange={(e) => setCurrentUserMessage(e.target.value)}/>
                </div>

                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}
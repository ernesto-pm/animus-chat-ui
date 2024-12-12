import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getChat, ollamaDetailedChatPredict} from "~/services/openapi";
import {useEffect, useRef, useState} from "react";
import {Send, Settings} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "~/components/ui/drawer";
import {Button} from "~/components/ui/button";

export async function loader({params}: LoaderFunctionArgs) {
    // Access the $id parameter
    const chatId = params.id;
    if (!chatId) {
        throw new Response("Chat ID is required", {status: 400})
    }

    const chatResponse = await getChat({path: {chat_id: chatId!}})
    if (!chatResponse.data) {
        throw new Response("Failed to fetch chat data", {status: 404})
    }

    return {chatData: chatResponse.data}
}

export default function Chat() {
    const {chatData} = useLoaderData<typeof loader>();
    const {chat, systemMessage, character, scenario, persona} = chatData
    const [currentUserMessage, setCurrentUserMessage] = useState("")
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([])
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function addUserMessage(newUserMessage: string) {
        setMessages((oldMessages) => (
            [...oldMessages, {role: "user", content: newUserMessage}]
        ))
    }

    function addAssistantMessage(newAssistantMessage: string) {
        setMessages((oldMessages) => (
            [...oldMessages, {role: "assistant", content: newAssistantMessage}]
        ))
    }

    async function handleSubmit() {
        let response = await ollamaDetailedChatPredict({
            body: {
                modelVersion: chat!.model_version,
                systemMessageContent: systemMessage!.content!,
                personaName: persona!.name,
                personaDetails: persona!.details!,
                characterName: character!.name,
                characterDetails: character!.details,
                characterAdditionalAttributes: character!.additional_attributes!,
                scenarioContent: scenario!.content!,
                messages: [...messages, {role: "user", content: currentUserMessage}]
            }
        })

        if (response.data?.message) {
            setMessages((oldMessages) => [
                ...oldMessages,
                {role: "user", content: currentUserMessage},
                {role: "assistant", content: response.data.message!.content!}
            ])
            setCurrentUserMessage("")
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <div className="flex flex-col h-screen bg-gray-100 text-black">
            <div className="bg-white shadow-md p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-semibold">{chat.name}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Drawer direction="bottom">
                            <DrawerTrigger>Details</DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Chat Details</DrawerTitle>
                                    <DrawerDescription>
                                        <div>
                                            Character: {character.details}
                                        </div>
                                        <div>
                                            Persona: {persona.details}
                                        </div>
                                        <div>
                                            Scenario: {scenario.content}
                                        </div>
                                        <div>
                                            System Message: {systemMessage.content}
                                        </div>
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                <DrawerClose>
                                        <Button variant="outline">Close</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <Settings className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900"/>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <span className="text-sm text-gray-500 mb-1 px-4">{message.role}</span>
                        <div
                            className={`max-w-xl rounded-lg px-4 py-2 ${
                                message.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>

            <div className="bg-white border-t p-4">
                <div className="flex space-x-4">
                    <textarea
                        value={currentUserMessage}
                        onChange={(event) => setCurrentUserMessage(event.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                        rows={2}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                    >
                        <Send className="h-5 w-5 mr-2"/>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

/*
 <div className="font-bold">{chat?.name}</div>
            <hr/>
            {
                messages.map(
                    (message, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {message.role}: {message.content}
                        </div>
                    )
                )
            }

            <textarea
                value={currentUserMessage}
                onChange={(event) => setCurrentUserMessage(event.target.value)}
            />
            <button onClick={handleSubmit}>
                Send message to assistant
            </button>
 */
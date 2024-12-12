import {Outlet, useLoaderData} from "@remix-run/react";
import {getChatsForUser} from "~/services/openapi";
import {authenticate} from "~/services/auth.server";
import {LoaderFunctionArgs, redirect} from "@remix-run/cloudflare";
import ChatsSidebar from "~/routes/chats/ChatSidebar";

export async function loader({request}: LoaderFunctionArgs) {
    const user = await authenticate(request, "/new/character")
    if (!user) redirect("/login")
    const chats = await getChatsForUser({path: {user_id: user.id}})

    return {
        chats: chats.data || []
    }
}

export default function Chat() {
    const {chats} = useLoaderData<typeof loader>()

    return (
        <div className="flex bg-gray-600">
            <ChatsSidebar chats={chats}/>
            <div className="flex-1 overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    )
}
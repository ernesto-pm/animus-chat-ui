import {useLoaderData, useNavigate} from "@remix-run/react";
import {authenticate} from "~/services/auth.server";
import {LoaderFunctionArgs} from "@remix-run/cloudflare";

export async function loader({request}: LoaderFunctionArgs) {
    const user = await authenticate(request, "/profile") // we specify that we want to return here

    return {user}
}

export default function Profile() {
    const {user} = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    return (
        <div className="p-10">
            <h1>Hi, {user.name}</h1>

            <div>
                <button onClick={() => navigate("/characters")}>
                    Characters
                </button>
            </div>
        </div>
    )
}
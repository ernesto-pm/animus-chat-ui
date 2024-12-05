import {LoaderFunctionArgs, redirect} from "@remix-run/cloudflare";
import {sessionStorage} from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));

    return redirect("/login", {
        headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
    });
}

export default function Logout() {
    return (
        <div>

        </div>
    )
}
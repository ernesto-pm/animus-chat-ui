import {Form} from "@remix-run/react"
import { authenticator } from "~/services/auth.server";
import {ActionFunctionArgs, data, LoaderFunctionArgs, redirect} from "@remix-run/cloudflare";
import {sessionStorage} from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
    // we call the method with the name of the strategy we want to use and the
    // request object
    const user = await authenticator.authenticate("email-pass", request);
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    session.set("user", user);

    throw redirect("/", {
        headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
}

// Finally, we need to export a loader function to check if the user is already
// authenticated and redirect them to the dashboard
export async function loader({ request }: LoaderFunctionArgs) {
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    const user = session.get("user");
    if (user) throw redirect("/chat");

    return data(null);
}

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
    return (
        <Form method="post" className="p-5">
            <div>
                <div>
                    email:
                </div>
                <input type="email" name="email" required/>
            </div>

            <div>
                <div>
                    Password:
                </div>
                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                />
            </div>

            <button>Sign In</button>
        </Form>
    );
}


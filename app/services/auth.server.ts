// Create an instance of the authenticator, pass a generic with what
// strategies will return
import {Authenticator} from "remix-auth";
import { FormStrategy } from "remix-auth-form"
import {AnimusBetaUser, loginUser} from "~/services/openapi";
import {redirect} from "@remix-run/cloudflare";
import {sessionStorage} from "~/services/session.server";

export const authenticator = new Authenticator<AnimusBetaUser>();

authenticator.use(
    new FormStrategy(async ({form}) => {
        const email = form.get("email") as string;
        const password = form.get("password") as string;

        const response = await loginUser({body: {email: email, password: password}})
        if (response.error) {
            //console.log(JSON.stringify(response.error))
            throw Error(response.error.detail?.toString())
        }

        return response.data
    }),
    "email-pass"
)

export async function authenticate(request: Request, returnTo?: string) {
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    const user = session.get("user") as AnimusBetaUser;
    if (user) return user;
    if (returnTo) session.set("returnTo", returnTo);

    throw redirect("/login", {
        headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
}
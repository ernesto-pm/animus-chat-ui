import type { LinksFunction } from "@remix-run/cloudflare";
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useRouteError,
} from "@remix-run/react";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
    const error = useRouteError();

    let errorMessage = "An unexpected error occurred.";
    let status = 500;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data;
        status = error.status;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <html>
        <head>
            <title>Error</title>
            <Meta />
            <Links />
        </head>
        <body>
        <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 className="mb-4 text-2xl font-bold text-black">Error {status}</h1>
                <p className="text-gray-600">{errorMessage}</p>
                <a
                href="/"
                className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                Return Home
            </a>
        </div>
        </div>
        <Scripts />
        </body>
</html>
);
}
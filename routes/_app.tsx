import { asset } from "fresh/runtime";

export default function App({ Component, url }) {
  const isHome = url.pathname === "/";
  
  return (
    <html data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>yxplog | normal mode</title>
        {/* daisyUI + Tailwind via CDN for reliability in this environment */}
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href={asset("/styles/custom.css")} />
      </head>
      <body className={`min-h-screen bg-base-200 ${isHome ? "no-scroll" : ""}`}>
        <Component />
      </body>
    </html>
  );
}

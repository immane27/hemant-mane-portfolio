# A Beginner's Guide to Hemant's Portfolio

Welcome! This guide walks through the portfolio one small idea at a time. You
do not need previous frontend experience. By the end, you should know how to
start the site, find the files that control it, make a small change, understand
how the Digital Twin talks to an AI service, and run the project's checks.

The site uses **Next.js**, **React**, **TypeScript**, and **CSS**. The Digital
Twin sends its questions to **OpenRouter**, using the model
`minimax/minimax-m3.1-flash:free`.

## 1. The big picture

A website is made from a few different ingredients:

- **HTML** describes the content and its structure: headings, paragraphs,
  links, and buttons.
- **CSS** controls how that content looks and adapts to different screen
  sizes.
- **JavaScript** adds behavior, such as opening the chat panel or sending a
  question.
- **React** helps build a page from reusable pieces called components.
- **TypeScript** adds descriptions of what kinds of data those pieces use, so
  many mistakes can be caught before the site runs.
- **Next.js** organizes React into a full website, serves the pages, and can
  run secure server code such as the OpenRouter API connection.

The most important files in this project are:

| File | What it is for |
| --- | --- |
| [`app/page.tsx`](./app/page.tsx) | The portfolio homepage and its career and skills content. |
| [`app/components/digital-twin.tsx`](./app/components/digital-twin.tsx) | The interactive chat window shown in the browser. |
| [`app/api/chat/route.ts`](./app/api/chat/route.ts) | The server endpoint that validates messages and contacts OpenRouter. |
| [`app/globals.css`](./app/globals.css) | The design, layout, colors, animations, and mobile styles. |
| [`app/layout.tsx`](./app/layout.tsx) | The shared page wrapper and search/social metadata. |
| [`package.json`](./package.json) | The commands and software packages used by the project. |
| [`tsconfig.json`](./tsconfig.json) | TypeScript's project settings. |
| [`Profile.pdf`](./Profile.pdf) | The profile document that provides the career facts represented on the site. |

## 2. Getting the site running

### Install the prerequisites

You need:

- **Node.js 20.9 or later**. Next.js 16 requires a modern version of Node.
- **npm**, which is installed with Node.js.
- The project folder, including its private `.env` file if you want to use the
  AI chat.

Open a terminal in the project folder and install the packages:

```bash
npm install
```

Think of a package as a reusable tool other developers have published. This
project uses packages for Next.js, React, TypeScript, and linting.

### Start the development website

Run:

```bash
npm run dev
```

Leave that terminal window open while you work. The terminal should print a
local URL, usually `http://localhost:3000`. Open that address in your browser.
When you edit and save a source file, Next.js refreshes the page automatically.

To stop the development server, click its terminal and press **Ctrl+C**.

### Build and run the production version

The development server is designed for editing. To check the optimized version:

```bash
npm run build
npm start
```

The `build` command must finish successfully before `start`. The production
server uses port 3000 by default. Stop it with **Ctrl+C**.

If the address is already in use, another server may already be running on that
port. Close that server before starting another one.

## 3. A first look at a React component

Open [`app/page.tsx`](./app/page.tsx). It contains the homepage. A React
component is a function that returns a description of what the browser should
show.

Here is a simplified example:

```tsx
function Welcome() {
  return (
    <section>
      <h1>Hello, I’m Hemant.</h1>
      <p>I build data platforms.</p>
    </section>
  );
}
```

The HTML-like syntax inside a TypeScript file is called **JSX**. JSX lets you
write the structure of the page next to the JavaScript that supplies its data.
The tags have familiar meanings: `<h1>` is the main heading, `<p>` is a
paragraph, and `<section>` groups related content.

The homepage uses named areas such as the hero, about section, work cards,
career timeline, toolkit, and contact footer. A link like this moves the reader
to the matching section on the same page:

```tsx
<a href="#journey">Explore my career journey</a>
```

The destination needs the same identifier:

```tsx
<section id="journey">
  {/* Career content goes here. */}
</section>
```

The comment in this small example is JSX comment syntax. In normal page code,
you can just write the content without comments.

## 4. Changing the career timeline

Near the top of `app/page.tsx`, the `experience` variable is an **array**: an
ordered list of career entries. Each entry is an **object** containing named
pieces of information:

```tsx
const experience = [
  {
    period: "2021 — NOW",
    role: "Development Team Lead · Data Engineering",
    company: "Nextgen Clearing Ltd",
    note: "Leading data engineering and delivery.",
    current: true,
  },
];
```

To update a description, edit the corresponding `note`. To add a role, add
another object with the same fields. Keep the fields consistent: the timeline
expects `period`, `role`, `company`, `note`, and `current`.

Later, `.map()` turns every object into a timeline entry:

```tsx
{experience.map((job) => (
  <li key={job.role}>
    <h3>{job.role}</h3>
    <p>{job.company}</p>
    <p>{job.note}</p>
  </li>
))}
```

In plain language, this says: “For each job in the list, make one `<li>`.”
`{job.role}` inserts the role's text. The `key` gives React a stable way to
identify each entry when the list changes. If two roles ever have the same
title, give each item a unique ID and use that ID as the key.

The `capabilities` array near it works similarly: each object supplies the
heading, description, tags, and color variant for a portfolio card.

## 5. How page structure and styling fit together

The markup in `app/page.tsx` supplies readable content and class names. For
example:

```tsx
<section className="work-section section-pad" id="work">
  <h2>The work, at its best.</h2>
</section>
```

The names in `className` connect to CSS rules in
[`app/globals.css`](./app/globals.css):

```css
.work-section {
  padding-top: 100px;
  color: var(--paper);
  background: var(--deep);
}
```

Here, `.work-section` selects elements whose class is `work-section`.
`padding-top` adds space inside the top edge. The `color` sets text color, and
`background` sets the background color. The variables `--paper` and `--deep`
are declared near the top of the CSS file:

```css
:root {
  --deep: #17201c;
  --paper: #faf9f5;
  --lime: #d2fc63;
}
```

Using variables means you can change a repeated color in one place instead of
tracking down every instance.

The toolkit layout uses CSS Grid. A simplified grid looks like this:

```css
.toolkit-section {
  display: grid;
  grid-template-columns: 0.75fr 1.6fr 0.75fr;
  gap: 35px;
}
```

`display: grid` arranges child elements in rows and columns. The `fr` unit
shares available space proportionally. Here, the middle column gets more room
than either outside column.

### Making a layout work on phones

CSS media queries apply different styles at different viewport sizes. In this
project, the main breakpoints are approximately 1050 pixels, 760 pixels, and
380 pixels:

```css
@media (max-width: 760px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
}
```

That example changes the work cards to a single column on narrower screens.
When changing desktop CSS, test a narrow screen too: long headings, contact
details, and buttons need to remain readable and clickable.

The stylesheet also includes `prefers-reduced-motion`. That setting reduces
animations for visitors who have requested less motion in their device
accessibility settings.

## 6. Safe profile updates

Your profile information appears in two places:

1. The public-facing sections in `app/page.tsx`.
2. The AI's reference material in the `systemPrompt` string in
   `app/api/chat/route.ts`.

When a career fact changes, update both locations so the page and AI assistant
tell the same story. Check job titles and dates, company names, technology
claims, location, education, certifications, and links before publishing.
Only add experience that you can verify from your profile.

Some text is descriptive copy rather than an independently verified
achievement. Avoid turning general wording into invented metrics, project
names, customers, or results.

## 7. Understanding the Digital Twin

The chat is split into a **browser side** and a **server side**.

### Browser side: the chat component

Open [`app/components/digital-twin.tsx`](./app/components/digital-twin.tsx).
This file begins with:

```tsx
"use client";
```

This tells Next.js that this component needs to run in the visitor's browser.
It needs the browser because a visitor can open the panel, type a message, and
receive a response without reloading the page.

The component uses React **state** for information that changes while a visitor
uses the chat:

```tsx
const [isOpen, setIsOpen] = useState(false);
const [draft, setDraft] = useState("");
const [isSending, setIsSending] = useState(false);
```

- `isOpen` says whether the chat window is visible.
- `draft` is the text in the input box.
- `isSending` prevents another message from being sent while a reply is
  pending.
- `messages` keeps the current conversation.
- `error` holds an error message to show in the chat.

`useState(false)` means “start with this value set to false.” Calling the
matching setter, such as `setIsOpen(true)`, tells React to redraw the component
with the new value.

When someone submits a question, `sendMessage` calls the local API route:

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: updatedMessages.slice(-11) }),
});
```

`fetch` makes an HTTP request. `POST` means the browser is sending data.
`JSON.stringify` converts JavaScript values into JSON text for the request
body. `/api/chat` is a path on this same website, not a direct browser
connection to OpenRouter.

### Server side: the API route

[`app/api/chat/route.ts`](./app/api/chat/route.ts) handles requests to
`/api/chat`. In Next.js, the folder path `app/api/chat` and file name
`route.ts` create that API endpoint. Its `POST` function runs on the server.

The route:

1. Reads `OPENROUTER_API_KEY` from the server's environment.
2. Validates the submitted conversation and its message sizes/count.
3. Adds the profile facts and behavior instructions.
4. Sends the request to OpenRouter with the selected model.
5. Returns a JSON answer or a clear error response.

Here is the shape of the server-to-server request:

```ts
{
  model: "minimax/minimax-m3.1-flash:free",
  messages: [
    { role: "system", content: systemPrompt },
    ...messages,
  ],
}
```

The `system` message gives the model verified career facts and asks it not to
invent information. `user` messages contain visitor questions; `assistant`
messages contain previous AI replies.

The route checks that messages alternate between user and assistant, begin and
end with a user question, and stay inside configured limits. These checks make
the input predictable; the server does not blindly forward arbitrary request
data.

### Why the OpenRouter key must stay on the server

The project's `.env` file contains a private API key. It must never be copied
into browser code, pasted into a public page, or committed to a source
repository. Browser code is delivered to every visitor, so a key in that code
would no longer be secret.

The `.gitignore` file ignores `.env`, which helps prevent accidental commits.
For local work, use your private root `.env` file. When hosting the site,
configure `OPENROUTER_API_KEY` as a private environment variable in the hosting
provider's settings; do not deploy your local `.env` file.

### What the chat errors mean

The API returns an appropriate error when it cannot process a message:

- `400` means the submitted request was invalid.
- `413` means the request's declared `Content-Length` exceeded the route's
  configured limit. See the code review below for why the advertised length is
  not the same as enforcing an actual body-size limit.
- `429` means the model provider reported that requests are arriving too
  quickly.
- `502` means the provider failed or returned an unexpected response.
- `503` means the server has no configured OpenRouter key.
- `504` means the model request took too long.

The chat component displays these messages to visitors instead of pretending
that a failed response was successful.

## 8. Updating the Digital Twin

### Change suggested questions

At the top of `digital-twin.tsx`, update `suggestedQuestions`:

```tsx
const suggestedQuestions = [
  "Tell me about your Trino lakehouse work",
  "How do you use HyperLogLog at scale?",
  "What kind of data teams do you lead?",
];
```

These are buttons displayed before the visitor starts typing. Keep them short
and based on information the profile actually supports.

### Change what the AI knows

Edit `systemPrompt` in `app/api/chat/route.ts`. Keep the verified facts and
answering rules together. For example:

```text
- His core technology is Trino.
- He stores data as Parquet on object storage, including S3 and MinIO.
- Describe HLL as probabilistic; do not promise exact counts.
```

The API sends this prompt on every request. This makes it important to avoid
putting private information, secrets, or unverified claims in the prompt.

### Change the model

The model is set near the top of `route.ts`:

```ts
const MODEL = "minimax/minimax-m3.1-flash:free";
```

Change this only to a model ID supported by your OpenRouter account. A new
model can respond differently or have different availability, so send it a
test question before relying on it.

## 9. TypeScript, errors, and accessible controls

A TypeScript type documents the expected shape of a message:

```ts
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
```

In this example, `role` must be one of two exact strings, and `content` must
be text. TypeScript can help check code that uses this type, but an internet
request is untrusted input. The server therefore also checks the values at
runtime with `isChatMessage`.

The chat buttons have accessible names, for example:

```tsx
<button aria-label="Send message">
  {/* The decorative SVG icon goes here. */}
</button>
```

The icon alone might not explain the button to a screen reader, so
`aria-label` provides a text name. The decorative SVG uses `aria-hidden="true"`
so it is not announced as an extra item.

If you add an icon-only button, keep an accessible name. If you change the
chat's loading or error states, make sure keyboard and screen-reader users can
still discover what is happening.

## 10. Everyday editing workflow

1. Open the project folder in your editor.
2. In a terminal, run `npm run dev`.
3. Open `http://localhost:3000`.
4. Edit the appropriate file:
   - Career text and sections: `app/page.tsx`.
   - Chat design and interactions: `app/components/digital-twin.tsx`.
   - AI facts and OpenRouter request: `app/api/chat/route.ts`.
   - Visual styling: `app/globals.css`.
5. Save and inspect the browser.
6. Try both a wide desktop size and a narrow mobile size.
7. Before calling the work finished, run:

```bash
npm run lint
npm run build
```

`lint` checks code quality and common mistakes. `build` checks that Next.js can
compile the production website and that TypeScript types are valid.

If the chat stops working, check that the private `.env` file exists and has a
non-empty `OPENROUTER_API_KEY`. Restart the development server after changing
environment variables; server processes generally read them when they start.
Never print or share the key while troubleshooting.

## 11. Detailed code review

### Overall assessment

The code is a clean, compact portfolio with a useful separation between the
server-rendered page and the interactive browser chat. It builds with Next.js,
uses TypeScript, validates the basic shape of incoming messages, keeps the
OpenRouter key on the server, and gives the visitor visible loading and error
states. The layout includes responsive breakpoints and reduced-motion styling.

The review below focuses on practical risks and maintainability. The two
highest-priority improvements are protecting the public AI endpoint from
unexpected usage and fixing the chat's retry behavior.

### Finding 1 — High: the public AI route has no rate limit

**File:** [`app/api/chat/route.ts`](./app/api/chat/route.ts)

Anyone who can reach the deployed site can call `/api/chat` repeatedly. The
server key is protected, but the route can still spend the account's model
quota on a visitor's behalf. Input limits do not limit how many valid requests
one client can send.

This is a greater concern on a publicly deployed site than a private local
development server. Before deploying publicly, add rate limiting using a
trusted hosting platform, edge service, or shared rate-limit store. Include an
overall model-usage budget and provider-side spending limits where available.
Do not rely solely on a limit held in one server process: multiple production
instances need to share the limit.

A future wrapper might look like this:

```ts
export async function POST(request: Request) {
  const client = identifyClientUsingTrustedDeploymentHeaders(request);

  if (!(await chatLimiter.allow(client))) {
    return NextResponse.json(
      { error: "Please wait before sending another question." },
      { status: 429 },
    );
  }

  // Continue with request validation and the OpenRouter call.
}
```

`identifyClientUsingTrustedDeploymentHeaders` and `chatLimiter` are
intentionally placeholders, not functions that currently exist. Choose an
implementation supported by the host, and only trust forwarding headers that
the host itself controls.

### Finding 2 — Medium: request size is checked before JSON parsing only by
the advertised length

**File:** [`app/api/chat/route.ts`](./app/api/chat/route.ts)

The route checks the `Content-Length` header and then calls `request.json()`.
The header can be absent or invalid, and it does not reliably cap the bytes
that the server reads. The message-count and message-length rules are useful,
but they run only after the JSON body has been parsed into memory.

Use a request-body size limit enforced by the hosting platform or a bounded
stream reader before parsing JSON. Then keep the existing field, count, and
total-text validation as a second layer. A simple improvement to the current
header parsing would be:

```ts
const contentLengthHeader = request.headers.get("content-length");
const contentLength = contentLengthHeader === null
  ? null
  : Number(contentLengthHeader);

if (
  contentLength !== null &&
  (!Number.isSafeInteger(contentLength) ||
    contentLength < 0 ||
    contentLength > MAX_REQUEST_BYTES)
) {
  return NextResponse.json(
    { error: "That message is too large. Please shorten it and try again." },
    { status: 413 },
  );
}
```

This makes the header check stricter, but **does not** replace an enforced
actual body-size limit when the header is missing or untrustworthy.

### Finding 3 — Medium: retrying a failed question can submit two user
messages

**File:** [`app/components/digital-twin.tsx`](./app/components/digital-twin.tsx)

`sendMessage` adds the visitor's question to `messages` before it calls the
API. If the request fails, that user message remains in the conversation and
the question is copied back into the draft. The “Try again” button calls
`sendMessage(draft)`, which appends the same question a second time.
`route.ts` correctly rejects consecutive user messages, so the retry can fail
again.

Store a copy of the conversation before each request and restore it on failure,
or retry the same request body instead of adding another message. For example,
restore the conversation:

```tsx
const previousMessages = messages;
const updatedMessages = [
  ...previousMessages,
  { role: "user" as const, content: question },
];

setMessages(updatedMessages);

try {
  // Send updatedMessages to /api/chat and append the assistant reply.
} catch (sendError) {
  setMessages(previousMessages);
  setDraft(question);
  setError(/* a visitor-friendly message */);
}
```

If the failed question should remain visible in the conversation, keep it as a
separate failed-message state and make the retry resend that exact conversation
rather than append another user message.

### Finding 4 — Medium: profile facts are maintained in multiple files

**Files:** [`app/page.tsx`](./app/page.tsx) and
[`app/api/chat/route.ts`](./app/api/chat/route.ts)

Career dates, roles, skills, and location are entered once for the page and
again in the AI's prompt. A future profile update could fix the page while
leaving the Digital Twin with older information, or the other way around.

For a site this size, first use a small update checklist whenever facts
change. As the profile grows, consider keeping verified data in one
server-safe, typed module and reusing it where appropriate. For example:

```ts
export const profile = {
  location: "Mumbai Metropolitan Region",
  skills: ["Trino", "Parquet", "Apache NiFi"],
  experience: [
    {
      role: "Development Team Lead · Data Engineering",
      company: "Nextgen Clearing Ltd",
      period: "2021 — NOW",
    },
  ],
} as const;
```

The page and the prompt could both use this data, while the API keeps its
private answering rules on the server. Be careful not to import a server-only
module that contains secrets into a client component.

### Finding 5 — Low: chat accessibility can be more complete

**File:** [`app/components/digital-twin.tsx`](./app/components/digital-twin.tsx)

The buttons already have accessible labels and the error uses `role="alert"`,
which are good foundations. There is still room to improve how keyboard and
screen-reader users enter and leave the chat: move focus to the input when the
panel opens, return focus to the launcher when it closes, and let the Escape
key close the panel.

A small keyboard handler could look like this:

```tsx
import { KeyboardEvent as ReactKeyboardEvent } from "react";

function handleKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    void sendMessage(draft);
  }
}

const launcherRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (!isOpen) return;

  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsOpen(false);
      launcherRef.current?.focus();
    }
  }

  document.addEventListener("keydown", handleEscape);
  inputRef.current?.focus();

  return () => document.removeEventListener("keydown", handleEscape);
}, [isOpen]);
```

Add `ref={launcherRef}` to the launcher button to make the focus-return line
work. The input focus runs when the panel opens; focus returns to the launcher
when Escape closes it. The React event type is aliased as
`ReactKeyboardEvent`, leaving `KeyboardEvent` here to mean the browser's DOM
event. Also test keyboard navigation and a screen reader after changing focus
behavior. Consider whether focus should be trapped inside the chat while it is
open; that is especially important if the panel is treated as a modal dialog.

### Validation coverage

The project has `npm run lint` and `npm run build` commands. These are valuable
checks, but they do not automatically test the message-validation cases,
OpenRouter failure modes, successful browser conversations, or accessible
keyboard behavior. Those are good candidates for focused automated tests.
Avoid sending real paid or production requests as part of an ordinary test;
mock the provider response for repeatable tests.

## 12. Five suggestions for improving the code

1. **Protect the AI endpoint before public deployment:** add shared
   per-client rate limiting, provider quotas, and usage alerts.
2. **Enforce a real request-body limit:** cap bytes before JSON parsing, then
   retain the existing message validation.
3. **Fix and test chat retries:** retry the original conversation without
   appending a duplicate user message.
4. **Create one verified profile source:** generate or assemble both page and
   AI profile content from a typed shared data model.
5. **Add focused automated tests:** cover valid and invalid API requests,
   provider errors, successful chat turns, retry behavior, and keyboard
   accessibility.

# Setup:

cd <Project-Folder>

npx create-next-app@latest .

use recommended Next.js defaults



### Activate React Compiler:
npm install babel-plugin-react-compiler@latest

change next.config.ts to:
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true, // For Caching
  },
};

export default nextConfig;



### Start der dev Server:
npm run dev

open http://localhost:3000



### Nice to know:
put components and other folders/files which are not pages outside the app folder



### Routing in Next.js:

**Route Groups `( )`:**
Folders wrapped in parentheses are not included in the URL and are used for grouping routes and organizing layouts. Example: `(root)` and `(dashboard)` are Route Groups – the URL remains `/about`, not `/(root)/about`.

**Dynamic Routes `[ ]`:**
Folders wrapped in square brackets are dynamic route segments and are used as URL parameters. Example: `[id]` creates a route like `/users/123`, where `123` is available as `params.id`.

**Why only one `page.tsx`?**
Each route must define exactly one `page.tsx` as its endpoint. Multiple would cause conflicts, as Next.js wouldn't know which page to render. Layouts (`layout.tsx`) can be nested to share common UI structures.



### Special Files in Next.js (https://nextjs.org/docs/app/api-reference/functions/):

**`error.tsx`:**
Error boundary component that catches errors in the route segment and its children. Must be a Client Component. Receives `error` and `reset` props.

**`loading.tsx`:**
Shows a loading UI while the route segment is loading. Automatically wraps the page and children in a Suspense boundary.

**`not-found.tsx`:**
Renders when a route is not found (404). Can be placed at any route level to handle missing routes.

**`global-error.tsx`:**
Catches errors in the root layout. Must be a Client Component and should include `<html>` and `<body>` tags as it replaces the root layout when an error occurs.

**`unauthorized.tsx`:**
Custom UI component that renders when `unauthorized()` from `next/navigation` is called (401 error). Used for handling authentication errors. Requires experimental `authInterrupts: true` in `next.config.js`. Introduced in v15.1.0.

**`forbidden.tsx`:**
Custom UI component that renders when `forbidden()` from `next/navigation` is called (403 error). Used for handling authorization errors. Requires experimental `authInterrupts: true` in `next.config.js`. Introduced in v15.1.0.

**Note:** `unauthorized()` and `forbidden()` functions can be called in Server Components, Server Actions, and Route Handlers, but not in the root layout.



### Server-Side API Fetching & SEO:

**Why Server-Side Fetching is Better for SEO:**
Server Components in Next.js fetch data on the server before rendering, which means the complete HTML content with all data is sent to the browser in the initial response. Search engine crawlers receive fully rendered pages without needing to execute JavaScript, ensuring all content is immediately indexable. This improves Core Web Vitals, reduces time to first byte, and provides better accessibility since the content is available even without JavaScript enabled.



### Request Deduplication:

**Automatic Request Deduplication:**
Next.js automatically deduplicates identical fetch requests that occur during the same render cycle. If multiple components request the same data (same URL and options), Next.js will only make one actual network request and reuse the result for all components. This reduces unnecessary API calls, improves performance, and prevents duplicate data fetching in layouts, pages, and nested components that might need the same data.



### Security with Server-Side Requests:

**API Keys and Sensitive Data:**
When fetching data on the server, API keys and sensitive credentials never get exposed to the client. Server Components run only on the server, so secrets stored in environment variables (prefixed with `NEXT_PUBLIC_` are public, others are server-only) remain secure. This prevents API keys from appearing in the browser's network tab or being accessible via client-side JavaScript, significantly improving application security.



### Reduced Network Waterfall:

**Parallel Data Fetching:**
Server Components enable parallel data fetching, eliminating the sequential "waterfall" pattern where one request waits for another to complete. Multiple fetch requests in Server Components are automatically executed in parallel, reducing total loading time. This is especially beneficial when fetching data from multiple APIs or databases, as all requests can start simultaneously rather than waiting for dependencies to resolve.



### Directives: `'use client'`, `'use server'`, and `use cache`:

**`'use client'`:**
Directive placed at the top of a file to mark a component as a Client Component. Client Components run in the browser and can use React hooks (`useState`, `useEffect`, etc.), event handlers, and browser APIs. Use when you need interactivity, state management, or access to browser features. By default, components in the App Router are Server Components, so only add `'use client'` when necessary.

**`'use server'`:**
Directive placed at the top of a Server Action file or inside a function to mark it as a Server Action. Server Actions run on the server and can be called from Client Components via form actions or event handlers. They provide secure server-side mutations without exposing API routes. Useful for database operations, authentication, and other server-side logic that should not be exposed to the client.

**`use cache`:**
React function (from `react`) used in Server Components to manually cache the result of a function call. Wraps expensive computations or data fetching operations to cache results across renders and requests. Useful when you need fine-grained control over caching behavior beyond Next.js's automatic fetch caching. Must be used with a stable function reference.

- **`cacheLife`:** Optional parameter for `use cache` that specifies how long the cached result should be valid. Accepts a number (milliseconds) or a time string (e.g., `'1h'`, `'30m'`). After the specified time expires, the cache is invalidated and the function will be re-executed. Useful for time-sensitive data that needs periodic refresh while still benefiting from caching.

- **`cacheTag`:** Optional parameter for `use cache` that allows you to tag cached entries with a string identifier. Tags enable manual cache invalidation using `revalidateTag()` from `next/cache`. When data changes (e.g., after a mutation), you can invalidate all cached entries with a specific tag, ensuring fresh data without waiting for the cache to expire. Useful for on-demand cache invalidation in response to data updates.

**Cache Invalidation Functions:**

**`revalidatePath`:** Function from `next/cache` that invalidates cached data for a specific path. Call this after mutations (e.g., in Server Actions) to ensure the next request to that path fetches fresh data. Useful for on-demand revalidation when you know exactly which route needs to be updated.

**`revalidateTag`:** Function from `next/cache` that invalidates all cached entries associated with a specific tag. Works with `cacheTag` in `use cache` or `next: { tags: [...] }` in fetch options. More flexible than `revalidatePath` as it can invalidate multiple routes that share the same tag, making it ideal for data that affects multiple pages.



### Metadata in Next.js:

Next.js provides two ways to define metadata for pages and layouts: config-based and file-based. Metadata includes SEO information like title, description, Open Graph tags, and more.

**Config-Based Metadata:**
Export a `metadata` object or `generateMetadata` function directly from `layout.tsx` or `page.tsx`. The `metadata` object is static, while `generateMetadata` is a function that can generate dynamic metadata based on route parameters or fetched data. This approach keeps metadata co-located with your components.

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

**File-Based Metadata:**
Create a `metadata.ts` or `metadata.js` file in the same directory as your `page.tsx` or `layout.tsx`. Export a `metadata` object or `generateMetadata` function from this file. This approach separates metadata configuration from component code, making it easier to manage complex metadata setups or share metadata across multiple routes.

// metadata.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

Both approaches support static metadata objects and dynamic generateMetadata functions. Metadata is inherited from parent layouts, and child routes can override or extend parent metadata. If both file-based and config-based metadata are present, file-based metadata takes precedence and overrides config-based metadata.
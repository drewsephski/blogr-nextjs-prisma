import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "drew@drewsepeczi.xyz" },
    update: {},
    create: {
      email: "drew@drewsepeczi.xyz",
      name: "Drew Sepeczi",
      emailVerified: true,
    },
  });

  // Create account for the user (for Better Auth)
  await prisma.account.upsert({
    where: {
      id: "demo-account",
    },
    update: {},
    create: {
      id: "demo-account",
      accountId: user.id,
      providerId: "credential",
      userId: user.id,
    },
  });

  console.log(`✅ Created user: ${user.name} (${user.email})`);

  // Sample blog posts
  const posts = [
    {
      title: "Next.js 16: The AI-First Framework That's Changing Everything",
      content: `# Next.js 16: The AI-First Framework That's Changing Everything

Next.js 16 isn't just another incremental update—it's a fundamental shift toward AI-native development. With features designed specifically for AI agents, enhanced streaming capabilities, and a complete routing overhaul, this release marks the moment when web development frameworks started thinking like AI systems.

## Agent-Ready Development Environment

The most significant change in Next.js 16 is how it embraces AI agents. The new \`create-next-app\` includes an \`AGENTS.md\` file by default, giving AI coding agents access to version-matched Next.js documentation from the start of your project.

Research shows this approach achieves a 100% pass rate on Next.js evals—outperforming skill-based approaches that max out at 79%. The key insight: always-available context works better than on-demand retrieval, because agents often fail to recognize when they should search for documentation.

## Browser Log Forwarding

Next.js now forwards browser errors to the terminal by default during development. This is especially helpful for AI agents that operate primarily through the terminal and can't access a browser console. When an error occurs, the agent sees it immediately without switching contexts.

## Experimental Agent DevTools

The new \`@vercel/next-browser\` CLI exposes browser-level data—screenshots, network requests, console logs—along with framework-specific insights from React DevTools and the Next.js dev overlay. An LLM can't read a DevTools panel, but it can run \`next-browser tree\`, parse the output, and decide what to inspect next.

## Turbopack Goes Stable

After years in beta, Turbopack is now the default bundler for all Next.js applications. The performance improvements are dramatic:
- Cold starts are up to 76% faster than Webpack
- Hot Module Replacement (HMR) is near-instant even in large codebases
- Production builds are 2-5x faster

## Cache Components: Explicit Caching Semantics

Next.js 16 introduces Cache Components, a new set of features designed to make caching both more explicit and more flexible. The new \`"use cache"\` directive can be used to cache pages, components, and functions, and it leverages the compiler to automatically generate cache keys wherever it's used.

Unlike the implicit caching found in previous versions, caching with Cache Components is entirely opt-in. All dynamic code in any page, layout, or API route is executed at request time by default—aligning with what developers actually expect from a full-stack framework.

## Enhanced Routing and Navigation

The routing system has been completely overhauled with two key optimizations:
- **Layout deduplication**: When prefetching multiple URLs with a shared layout, the layout is downloaded once instead of separately for each link
- **Incremental prefetching**: Next.js only prefetches parts not already in cache, rather than entire pages

For a page with 50 product links, this means downloading the shared layout once instead of 50 times—dramatically reducing network transfer size.

## React 19.2 Integration

Next.js 16 uses the latest React Canary release with newly stabilized features:
- **View Transitions**: Animate elements that update inside a Transition or navigation
- **useEffectEvent**: Extract non-reactive logic from Effects into reusable Effect Event functions
- **Activity**: Render "background activity" by hiding UI with \`display: none\` while maintaining state

## Breaking Changes to Know About

- \`middleware.ts\` is now \`proxy.ts\` to clarify the network boundary
- \`cookies()\`, \`headers()\`, \`params\`, and \`searchParams\` APIs are now async (required breaking change)
- Partial Prerendering (PPR) configuration has changed—stay on your current Next.js version if you're using the experimental flag

## What This Means for Developers

The shift to AI-first development is real. Next.js 16 isn't just adding AI features—it's rethinking the entire development experience around how AI agents work. The framework that once optimized for human developers now optimizes for human-AI collaboration.

*The future isn't just AI-assisted development. It's AI-native development.*`,
      published: true,
    },
    {
      title: "The 2026 AI Automation Stack: Next.js + Cursor + Copilot",
      content: `# The 2026 AI Automation Stack: Next.js + Cursor + Copilot

The automation agency landscape has fundamentally shifted in 2026. Teams are no longer spending 60% of their time on boilerplate code and repetitive tasks. Instead, they're architecting systems where AI handles the mechanical work while developers focus on structure, logic, and business outcomes.

## The New Standard: 46% Code Generation

GitHub Copilot has evolved from a code autocomplete tool to an agentic workflow orchestrator, now powering 46% of all code written across 20 million developers. When paired with Next.js—the 4th most-used web framework in 2026—agencies unlock unprecedented velocity.

## Why Next.js + AI is the Perfect Match

Next.js has become the default choice for automation agencies building client portals, internal dashboards, and API-driven applications. The framework's React Server Components allow teams to offload data fetching to the server while maintaining a reactive UI.

This architecture pairs perfectly with AI copilots because server components reduce the amount of client-side JavaScript that needs generation. Copilot can focus on business logic rather than state management boilerplate.

Agencies report 55% faster task completion when combining Next.js with Copilot's context-aware suggestions.

## The File-Based Routing Advantage

Next.js's file-based routing system benefits significantly from AI generation. In practice, an agency developer types "create user profile page with auth" in Cursor, and the AI scaffolds the entire route structure, middleware checks, and server action handlers in seconds.

This wasn't possible in 2024 when copilots only understood isolated functions. By 2026, tools like Copilot and Cursor index entire Next.js codebases, understanding conventions like app directory structure and route handlers.

## V0 + Copilot: The Two-Stage Workflow

Vercel's v0 integration converts natural language prompts into production-ready Next.js components. Agencies use v0 for rapid prototyping during client kickoff meetings, then hand off the generated code to Copilot for refinement.

This two-stage workflow—prototyping with v0 and production hardening with Copilot—has become standard practice. Teams that adopt this approach report 84% more successful builds because the initial scaffold is already aligned with Next.js best practices.

## TanStack Query: The Data Fetching Standard

TanStack Query (formerly React Query) has become the de facto data fetching library in Next.js agency stacks. Its declarative approach aligns perfectly with AI code generation because Copilot can infer caching strategies from API endpoint patterns.

For example, when scaffolding a user dashboard, Copilot recognizes that user profile data should use staleTime of 5 minutes while real-time notification counts need staleTime of 0. This level of contextual understanding, trained on millions of repositories, is why Java code generation with Copilot reaches 61% while JavaScript hovers around 35%—the difference being how strongly typed languages provide more structural hints.

## Cursor vs. Copilot: Choosing Your AI Partner

**Cursor** excels at:
- Complete codebase understanding at any scale
- Autonomous agents that build, test, and demo features end-to-end
- Specialized Tab model for striking speed and precision
- Multi-model support (OpenAI, Anthropic, Gemini, xAI)

**GitHub Copilot** leads in:
- 46% code generation rates
- Deep integration with VS Code and JetBrains
- Native GitHub integration for PR reviews
- Enterprise-grade security and compliance

The choice often comes down to team preference and existing tooling. Many agencies use both—Cursor for complex refactors and Copilot for day-to-day development.

## Agentic CI/CD Pipelines

The real game-changer in 2026 is agentic CI/CD. AI agents now handle:
- Automated PR reviews that catch tricky backward compatibility issues
- Test generation for new features
- Deployment pipeline optimization
- Performance regression detection

Teams implementing agentic CI/CD report reducing PR cycles by 75% while maintaining 88% code quality retention.

## The Economic Advantage

The 2026 automation agency stack is clear: Next.js for application architecture, GitHub Copilot or Cursor for AI-powered development, and agentic workflows for testing and deployment.

Agencies that master this stack ship 55% faster while maintaining high code quality. The shift from mechanical coding to system architecture is complete, and the economic advantage belongs to teams that embrace these tools fully—not halfway.

*The future isn't AI replacing developers. It's AI-augmented developers building better systems, faster.*`,
      published: true,
    },
    {
      title: "AI in Next.js 2026: Production Patterns That Actually Work",
      content: `# AI in Next.js 2026: Production Patterns That Actually Work

Next.js has become the go-to framework for building AI-powered web applications. Its architecture—combining React Server Components, streaming, Edge Runtime, and Server Actions—maps almost perfectly onto the demands of modern AI workloads: long-running inference calls, token-by-token streaming responses, and API-heavy backends that need to stay fast and secure.

## The Server Component Revolution for AI

The 2026 standard for AI in Next.js has fundamentally shifted. The old pattern of fetching AI streams in useEffect on the client is dead. Now you fetch AI streams in Server Components and use Suspense to show skeletons.

React Server Components eliminate the traditional client-server roundtrip for AI operations. Instead of loading JavaScript, initializing state, and then making an API call, RSC executes AI requests directly on the server during the render phase.

The result: users see AI-generated content as part of the initial HTML response, reducing perceived latency by 40-60% in typical applications.

## Security: API Keys Never Leave the Server

Calling an LLM from the browser means exposing your API key. Server Actions solve this cleanly: the AI call executes on the server, the key never leaves the environment, and the progressive enhancement model means the feature degrades gracefully even without JavaScript.

For enterprise clients handling sensitive data—healthcare, finance, legal—this is not optional; it is the baseline.

## Streaming: The New User Experience Standard

The most visible AI pattern today is streaming—showing the user tokens as they arrive rather than waiting for the full response. Next.js makes this trivial with the built-in Suspense boundary and the readableStream pattern inside Route Handlers.

Paired with the Vercel AI SDK's streamText helper, you can stream an OpenAI or Anthropic response to the browser in fewer than 30 lines of code.

React 19's streaming capabilities, combined with Next.js 16's native support, transform how users experience AI responses. Instead of waiting 3-10 seconds for a complete response, users see tokens appear progressively. This pattern reduces perceived latency by up to 80% and keeps users engaged during longer AI operations.

## Edge Runtime for Lightweight AI Tasks

Next.js Middleware runs on the Edge Runtime—a V8-based environment deployed in 30+ regions worldwide. This is the right place for lightweight AI tasks: content moderation, language detection, personalization hints.

Running these checks at the edge instead of your origin server removes 100–300ms of round-trip latency for the majority of your users.

## The Three AI Application Patterns

AI applications built with Next.js typically follow one of three patterns:

### 1. RAG Chains
Combine a vector database (Pinecone, pgvector, Weaviate) with an LLM to ground answers in your own content. In Next.js this works well as a Route Handler: embed the user query, retrieve the top-k chunks, inject them into the prompt, and stream the response.

### 2. Server Actions for Form Processing
Server Actions are ideal for AI-assisted form validation, summarization, and structured data extraction. A user submits a long document; a Server Action calls GPT-4o with a JSON schema output, extracts the structured fields, and returns them to the form—all in a single round-trip without client-side JavaScript.

### 3. Route Handlers for Complex Workflows
For more complex workflows—document ingestion, multi-step research, code generation pipelines—Next.js Route Handlers act as lightweight orchestration endpoints. Combined with a task queue (Inngest, Trigger.dev, Upstash QStash), you can build durable, resumable AI pipelines that survive network interruptions and LLM timeouts.

## Production Gotchas to Avoid

### Caching Conflicts
Next.js aggressively caches Route Handler responses. AI endpoints must set \`no-store\` cache headers to avoid serving stale LLM output.

### Streaming and Middleware Conflicts
Middleware that transforms the response body (compression, encryption) will break streaming. Run AI endpoints on paths that bypass response-transforming middleware.

### Cost Control
Without token budgets and per-user rate limiting, a single user can exhaust your monthly LLM budget in minutes. Implement limits at the Route Handler level before going to production.

### Context Window Management
For long conversations, naive history appending will eventually exceed the context limit. Implement sliding window summarization or use a vector store for long-term memory.

## The Production Stack

A typical production AI stack in 2026 includes:
- OpenAI GPT-4o or Anthropic Claude—general-purpose inference
- Vercel AI SDK—schema validation of structured LLM output
- NextAuth.js or Clerk—authentication and per-user rate limiting
- Pinecone or pgvector—vector database for RAG

Next.js 16 provides the foundation for building production AI applications that are fast, cost-effective, and maintainable. React Server Components enable direct AI API access without client-side complexity. Streaming delivers responsive user experiences even for longer AI responses. Edge functions minimize latency for global audiences.

*The future of AI in web development isn't about adding AI features—it's about building AI-native applications from the ground up.*`,
      published: true,
    },
    {
      title: "Next.js 16 App Router: Production Patterns and Pitfalls",
      content: `# Next.js 16 App Router: Production Patterns and Pitfalls

The Next.js App Router fundamentally changed how we build React applications, and by Next.js 16 the patterns have matured into something genuinely production-ready. But the conceptual shift from Pages Router is steep—server components, partial prerendering, nested layouts, and a completely redesigned data fetching model all require mental model rewiring that documentation alone can't fully convey.

## The Golden Rule: Server Components by Default

The single biggest mistake developers make with the App Router is reaching for \`'use client'\` too early. In Next.js 16, every component in the \`app/\` directory is a Server Component by default.

This is the right default—Server Components render on the server, have zero JavaScript bundle impact, and can directly access databases and APIs.

### Push \`'use client'\` to the Leaves

The rule: push \`'use client'\` to the leaves of your component tree. A page can be a Server Component that fetches data and passes it to a thin Client Component shell that handles interactions.

\`\`\`typescript
// ❌ Bad: Everything is client-side
"use client";
export default function BlogPost({ id }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(\`/api/posts/\${id}\`).then(setPost);
  }, [id]);
  return <PostContent post={post} />;
}

// ✅ Good: Server component with client leaf
export default async function BlogPost({ id }) {
  const post = await prisma.post.findUnique({ where: { id } });
  return <PostContent post={post} />;
}
\`\`\`

The key insight: \`BlogContent\` sends JavaScript to the browser. \`PostMeta\` does not. Every unnecessary \`'use client'\` directive inflates your bundle.

## Metadata: Always Use generateMetadata()

Static \`export const metadata\` is tempting for its simplicity, but it cannot be locale-aware, cannot access route params, and cannot fetch data. For any real application, \`generateMetadata()\` is the only correct choice:

\`\`\`typescript
// ❌ Bad: Static metadata
export const metadata = {
  title: "Blog Post",
};

// ✅ Good: Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  return {
    title: post.title,
    description: post.excerpt,
  };
}
\`\`\`

## The Four Caching Layers You Must Understand

Next.js 16 has four distinct caching layers. Understanding all four is required to reason about why a page is or isn't updating:

1. **Request Cache** — Per-request cache for \`fetch()\` calls
2. **Data Cache** — Persistent across requests. \`fetch()\` responses are cached indefinitely by default
3. **Full Route Cache** — Static HTML and RSC payload cached at build time for static routes
4. **Router Cache** — Client-side cache of visited routes. Persists for the browser session

### Common Caching Mistakes

**Over-caching everything**: Not all data should be cached. Real-time data needs \`no-store\`.

**Under-caching critical paths**: Static content that changes infrequently should be cached aggressively.

**Ignoring revalidation**: Set up \`revalidate\` for data that changes periodically.

### Correct Approach

- Cache static data aggressively (blog posts, product pages)
- Revalidate dynamic data (user dashboards, real-time feeds)
- Avoid stale critical paths (auth state, shopping carts)

## Error Boundaries: You Need Two

Production applications need two error boundaries:

1. **Locale-aware pages** - \`error.tsx\` in each locale directory
2. **Global fallback** - \`global-error.tsx\` at the root

The \`global-error.tsx\` replaces the root \`layout.tsx\` when it fires, so it must include \`<html>\` and \`<body>\` tags. It cannot access context providers that live in the layout—no i18n, no theme, no auth context.

## The Middleware vs Proxy Pitfall

Next.js uses \`middleware.ts\` (or \`middleware.js\`) for edge middleware. In a project using next-intl v4, the middleware setup often gets renamed to \`proxy.ts\` and re-exported, creating a critical pitfall:

**Do not create both \`middleware.ts\` and \`proxy.ts\`.** Having both causes a build error.

## Static vs Dynamic Rendering

Use \`generateStaticParams()\` for content that changes infrequently (blog posts, product pages, documentation). This generates static HTML at build time with zero runtime cost.

Use dynamic rendering for personalized content, real-time data, or pages with thousands of variants where build time would be prohibitive.

Combine both with ISR (\`revalidate\`) for content that changes occasionally.

## Performance Pitfalls to Avoid

### Fetching Data in Client Components
Never fetch data in Client Components if you can avoid it. This sends your data sources and adds a waterfall of requests.

### Missing Loading States
Use \`loading.tsx\` files over \`<Suspense>\` for loading states—they integrate with React Suspense and PPR seamlessly.

### Bundle Analysis Neglect
Analyze your bundle with \`next build --debug\` and the \`@next/bundle-analyzer\` plugin. Every unnecessary \`'use client'\` adds to your bundle.

## The Production Mindset

The App Router isn't just a different way to organize files—it's a fundamentally different mental model. Server Components, nested layouts, and the new caching model require you to think about your application architecture from first principles.

The patterns that hold up at scale are:
- Server-first rendering by default
- Explicit caching strategies
- Proper error boundaries
- Static generation where possible
- Dynamic rendering where necessary

Master these patterns, and the App Router becomes incredibly powerful. Ignore them, and you'll fight the framework every step of the way.

*The App Router rewards those who embrace its philosophy. It punishes those who try to force the old mental model onto the new architecture.*`,
      published: true,
    },
    {
      title: "Building AI-Native Applications: The 2026 Developer's Guide",
      content: `# Building AI-Native Applications: The 2026 Developer's Guide

The shift from AI-assisted development to AI-native applications is complete. In 2026, successful applications aren't just adding AI features—they're being designed around AI capabilities from the ground up. Here's how to build applications that leverage AI as a core architectural component.

## What Makes an Application AI-Native?

AI-native applications differ from AI-assisted ones in fundamental ways:

**AI-Assisted**: Traditional applications with AI features bolted on
- Chat interface added to existing product
- AI used for content generation or summarization
- AI is a feature, not the foundation

**AI-Native**: Applications designed around AI capabilities
- AI drives the core user experience
- Application architecture optimized for AI workflows
- AI is integrated into every layer of the stack

## The AI-Native Architecture

### 1. Agent-First Design

Design your application with AI agents as first-class citizens, not afterthoughts. This means:

- Structured data formats that agents can easily parse and manipulate
- Clear APIs that expose exactly what agents need
- Deterministic workflows that agents can reason about
- Comprehensive documentation that agents can access

### 2. Streaming-Native UX

Design your user experience around streaming responses. Users should see progress in real-time, not wait for complete responses.

\`\`\`typescript
// Streaming response pattern
export async function POST(req: Request) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "..." }],
    stream: true,
  });

  return new Response(stream.toReadableStream());
}
\`\`\`

### 3. Context-Aware State Management

AI applications need rich context. Your state management should include:
- Conversation history with proper summarization
- User preferences and behavior patterns
- Application state that AI can reason about
- External context (documents, databases, APIs)

### 4. Deterministic Fallbacks

AI is probabilistic—sometimes it fails. Your application needs deterministic fallbacks:
- Cached responses for common queries
- Rule-based logic for critical paths
- Graceful degradation when AI is unavailable
- Clear error boundaries

## The Technology Stack

### Core Framework: Next.js 16

Next.js 16 is the clear choice for AI-native applications:
- Server Components for secure AI calls
- Streaming support built-in
- Edge Runtime for low-latency AI tasks
- Cache Components for intelligent response caching

### AI SDK: Vercel AI SDK

The Vercel AI SDK provides production-ready patterns:
- \`streamText\` for streaming responses
- \`generateObject\` for structured output
- \`useChat\` and \`useCompletion\` hooks for React integration
- Tool calling for agentic workflows

### Vector Database: Pinecone or pgvector

For RAG applications, you need a vector database:
- Pinecone for managed simplicity
- pgvector if you're already using PostgreSQL
- Weaviate for advanced filtering needs

### Orchestration: LangChain or Custom

For complex workflows:
- LangChain for standard patterns
- Custom orchestration for unique requirements
- Task queues (Inngest, Trigger.dev) for long-running jobs

## Production Considerations

### Cost Management

AI APIs are expensive. Implement:
- Token budgets per user
- Response caching strategies
- Model selection based on task complexity
- Usage monitoring and alerting

### Rate Limiting

Protect your AI budget:
- Per-user rate limits
- Queue-based throttling
- Priority tiers for different user types
- Circuit breakers for abuse detection

### Observability

You need deep visibility into AI operations:
- Token usage tracking
- Response time monitoring
- Quality metrics (accuracy, relevance)
- Cost attribution per feature

### Security

AI introduces new security concerns:
- Prompt injection protection
- Output sanitization
- PII detection and redaction
- Audit logging for all AI operations

## Common Pitfalls

### Over-Reliance on AI

Don't use AI for everything. Use it where it adds value:
- ✅ Content generation and summarization
- ✅ Data extraction and classification
- ✅ Natural language interfaces
- ❌ Simple CRUD operations
- ❌ Deterministic business logic
- ❌ High-throughput transactional workloads

### Ignoring Latency

AI calls are slow (1-5 seconds typical). Design for this:
- Show loading states immediately
- Stream responses when possible
- Cache aggressively
- Use background processing for long tasks

### Poor Context Management

Naive history appending will exceed context limits. Implement:
- Sliding window summarization
- Vector stores for long-term memory
- Selective context injection
- Conversation pruning strategies

## The Future is AI-Native

The applications that succeed in 2026 and beyond won't be the ones that add AI features—they'll be the ones designed around AI from the start.

The shift is comparable to the mobile revolution. Just as mobile-native applications beat desktop applications with mobile features added on, AI-native applications will beat traditional applications with AI features bolted on.

*The question isn't whether to add AI to your application. It's how to design your application around AI capabilities.*`,
      published: true,
    },
    {
      title: "Draft: The Agentic Development Revolution",
      content: `# The Agentic Development Revolution

We're witnessing a fundamental shift in how software is built. The era of agentic development—where AI agents autonomously write, test, and deploy code—is here. This isn't just incremental improvement; it's a paradigm shift comparable to the move from punch cards to IDEs.

## What is Agentic Development?

Agentic development means AI agents that can:
- Understand entire codebases at scale
- Plan complex multi-step tasks
- Execute changes autonomously
- Test and validate their work
- Learn from feedback and improve

## The Current State

Tools like Cursor, GitHub Copilot, and OpenAI Codex are pushing the boundaries:

**Cursor** offers complete codebase understanding and autonomous agents that build features end-to-end.

**GitHub Copilot** provides contextual assistance across the entire software development lifecycle.

**OpenAI Codex** handles complex refactors, migrations, and multi-file changes autonomously.

## The Impact

Teams using agentic development report:
- 55% faster task completion
- 75% reduction in PR cycles
- 88% code quality retention
- 30-50% reduction in early iteration time

## The Challenges

- Trust and verification
- Security and access control
- Integration with existing workflows
- Skill shifts for developers

## What's Next

The future isn't AI replacing developers—it's AI augmenting developers to build at unprecedented scale. The developers who thrive will be the ones who learn to direct agents effectively, not the ones who try to compete with them.

*This is a work in progress...*`,
      published: false,
    },
  ];

  // Create posts
  for (const postData of posts) {
    const post = await prisma.post.create({
      data: {
        ...postData,
        authorId: user.id,
      },
    });
    console.log(`✅ Created post: "${post.title}"`);
  }

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

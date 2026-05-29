import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Offlyn<span className="text-muted-foreground">.ai</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/workflow"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Workflow
          </Link>
          <Link
            href="/benchmarks"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Benchmarks
          </Link>
          <Link
            href="/architecture"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Architecture
          </Link>
          <Link
            href="/audit"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Token Audit
          </Link>
          <a
            href="#request-audit"
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
          >
            Request Audit
          </a>
        </nav>
      </div>
    </header>
  );
}

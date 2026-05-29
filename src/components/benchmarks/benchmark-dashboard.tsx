"use client";

import { useState } from "react";
import { benchmarkRun, type BenchmarkEntry, type BenchmarkLibrary } from "@/data/benchmarks";
import { cn } from "@/lib/utils";

function StatusDot({ status }: { status: BenchmarkEntry["status"] }) {
  return (
    <span
      className={cn(
        "inline-block h-2.5 w-2.5 rounded-full",
        status === "pass" && "bg-emerald-400",
        status === "improvement" && "bg-emerald-400",
        status === "within" && "bg-blue-400",
        status === "regression" && "bg-red-400",
      )}
    />
  );
}

function MetricBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function BenchmarkRow({ entry, maxValue }: { entry: BenchmarkEntry; maxValue: number }) {
  const numericValue = parseFloat(entry.value);
  return (
    <div className="group grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/30 md:grid-cols-[1.5fr_80px_1fr_120px_auto]">
      <div className="flex items-center gap-2">
        <StatusDot status={entry.status} />
        <span className="text-sm text-foreground">{entry.operation}</span>
      </div>

      <div className="text-right font-mono text-sm font-bold text-foreground">
        {entry.value}
        <span className="ml-0.5 text-xs text-muted-foreground">{entry.unit}</span>
      </div>

      <div className="hidden md:block">
        <MetricBar
          value={numericValue}
          max={maxValue}
          color={
            entry.status === "regression"
              ? "bg-red-400/70"
              : entry.status === "improvement"
                ? "bg-emerald-400/70"
                : "bg-accent/50"
          }
        />
      </div>

      <div className="hidden text-right font-mono text-xs text-muted-foreground md:block">
        {entry.delta && (
          <span
            className={cn(
              entry.delta.startsWith("-") ? "text-emerald-400" : "text-muted-foreground",
            )}
          >
            {entry.delta}
          </span>
        )}
        {entry.baseline && (
          <span className="ml-1 text-muted-foreground/60">vs {entry.baseline}</span>
        )}
      </div>

      <div>
        {entry.budget && (
          <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            {entry.budget}
          </span>
        )}
      </div>
    </div>
  );
}

function LibraryCard({
  library,
  isOpen,
  onToggle,
}: {
  library: BenchmarkLibrary;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const passCount = library.entries.filter(
    (e) => e.status === "pass" || e.status === "improvement" || e.status === "within",
  ).length;
  const total = library.entries.length;
  const allPass = passCount === total;

  const maxValue = Math.max(...library.entries.map((e) => parseFloat(e.value)));

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/20"
      >
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold",
            allPass
              ? "bg-emerald-400/15 text-emerald-400"
              : "bg-red-400/15 text-red-400",
          )}
        >
          {passCount}/{total}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{library.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{library.description}</p>
        </div>
        <svg
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-border/40 px-2 py-2">
          {library.entries.map((entry) => (
            <BenchmarkRow key={entry.operation} entry={entry} maxValue={maxValue} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCards() {
  const { regressions, improvements, withinMargin } = benchmarkRun;
  const total = regressions + improvements + withinMargin;
  const cards = [
    {
      label: "Total",
      value: total,
      color: "text-foreground",
      bg: "bg-muted/30",
    },
    {
      label: "Pass",
      value: withinMargin,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Improved",
      value: improvements,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Regressions",
      value: regressions,
      color: regressions > 0 ? "text-red-400" : "text-emerald-400",
      bg: regressions > 0 ? "bg-red-400/10" : "bg-emerald-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={cn("rounded-xl border border-border/50 p-4 text-center", card.bg)}
        >
          <p className={cn("text-3xl font-bold", card.color)}>{card.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

function HealthRing() {
  const { regressions, improvements, withinMargin } = benchmarkRun;
  const total = regressions + improvements + withinMargin;
  const healthPct = total > 0 ? ((total - regressions) / total) * 100 : 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (healthPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/40"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-emerald-400 transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-emerald-400">{Math.round(healthPct)}%</span>
          <span className="text-[10px] text-muted-foreground">healthy</span>
        </div>
      </div>
    </div>
  );
}

export function BenchmarkDashboard() {
  const [openLibraries, setOpenLibraries] = useState<Set<string>>(
    new Set(benchmarkRun.libraries.map((l) => l.id)),
  );

  function toggleLibrary(id: string) {
    setOpenLibraries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-8">
      {/* Header meta */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4 rounded-xl border border-border/40 bg-card/40 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-xs text-muted-foreground">Hardware</p>
            <p className="font-mono text-sm font-semibold text-foreground">
              {benchmarkRun.hardware}
            </p>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-mono text-sm text-foreground">{benchmarkRun.date}</p>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div>
            <p className="text-xs text-muted-foreground">Mode</p>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold uppercase text-emerald-400">
              {benchmarkRun.mode}
            </span>
          </div>
        </div>
        <HealthRing />
      </div>

      {/* Summary */}
      <SummaryCards />

      {/* Libraries */}
      <div className="space-y-3">
        {benchmarkRun.libraries.map((lib) => (
          <LibraryCard
            key={lib.id}
            library={lib}
            isOpen={openLibraries.has(lib.id)}
            onToggle={() => toggleLibrary(lib.id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <StatusDot status="pass" /> Pass / budget met
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="within" /> Within ±10%
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="improvement" /> Improvement (&gt;10% faster)
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="regression" /> Regression (&gt;10% slower)
        </span>
      </div>
    </div>
  );
}

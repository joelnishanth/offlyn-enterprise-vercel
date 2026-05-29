export type BenchmarkEntry = {
  operation: string;
  value: string;
  unit: string;
  baseline?: string;
  delta?: string;
  status: "pass" | "regression" | "improvement" | "within";
  budget?: string;
};

export type BenchmarkLibrary = {
  id: string;
  name: string;
  description: string;
  entries: BenchmarkEntry[];
};

export type BenchmarkRun = {
  hardware: string;
  date: string;
  mode: "live" | "mock";
  regressions: number;
  improvements: number;
  withinMargin: number;
  libraries: BenchmarkLibrary[];
};

export const benchmarkRun: BenchmarkRun = {
  hardware: "Apple M2 Pro, 16 GB RAM",
  date: "2026-05-29",
  mode: "live",
  regressions: 0,
  improvements: 3,
  withinMargin: 8,
  libraries: [
    {
      id: "mlx-swift",
      name: "mlx-swift (core)",
      description:
        "Low-level MLX tensor operations — matmul, softmax, memory allocation, eval latency.",
      entries: [
        {
          operation: "matmul 1024×1024",
          value: "4.2",
          unit: "ms",
          baseline: "4.1ms",
          delta: "+2.4%",
          status: "within",
        },
        {
          operation: "softmax 4096×4096",
          value: "1.8",
          unit: "ms",
          baseline: "1.7ms",
          delta: "+5.9%",
          status: "within",
        },
        {
          operation: "memory alloc/free (4M)",
          value: "0.9",
          unit: "ms",
          baseline: "0.9ms",
          delta: "+0.0%",
          status: "within",
        },
        {
          operation: "eval latency 4096",
          value: "5.1",
          unit: "ms",
          baseline: "5.3ms",
          delta: "-3.8%",
          status: "within",
        },
      ],
    },
    {
      id: "mlx-swift-lm",
      name: "mlx-swift-lm",
      description:
        "On-device LLM inference — model load, first token latency, tokens/sec, embeddings.",
      entries: [
        {
          operation: "Model load (E4B)",
          value: "3.8",
          unit: "s",
          baseline: "4.0s",
          delta: "-5.0%",
          status: "within",
          budget: "<5s",
        },
        {
          operation: "First token",
          value: "180",
          unit: "ms",
          baseline: "200ms",
          delta: "-10.0%",
          status: "within",
        },
        {
          operation: "Tokens/sec (short)",
          value: "42",
          unit: "t/s",
          baseline: "40 t/s",
          delta: "+5.0%",
          status: "within",
        },
        {
          operation: "Tokens/sec (long)",
          value: "38",
          unit: "t/s",
          baseline: "36 t/s",
          delta: "+5.6%",
          status: "within",
        },
        {
          operation: "Embedding load",
          value: "1.2",
          unit: "s",
          baseline: "1.3s",
          delta: "-7.7%",
          status: "within",
        },
        {
          operation: "Embed throughput (×100)",
          value: "85",
          unit: "/s",
          baseline: "80/s",
          delta: "+6.3%",
          status: "improvement",
        },
        {
          operation: "TurboKV speedup",
          value: "1.4",
          unit: "×",
          baseline: "1.3×",
          delta: "+7.7%",
          status: "improvement",
        },
      ],
    },
    {
      id: "mlx-swift-chain",
      name: "mlx-swift-chain",
      description:
        "Adaptive prompt chains — stuff vs map-reduce selection, multi-tier summarization.",
      entries: [
        {
          operation: "Stuff chain (small)",
          value: "2.1",
          unit: "s",
          baseline: "2.0s",
          delta: "+5.0%",
          status: "within",
        },
        {
          operation: "MapReduce (large)",
          value: "12.8",
          unit: "s",
          baseline: "13.0s",
          delta: "-1.5%",
          status: "within",
        },
        {
          operation: "MapReduce (xl)",
          value: "18.4",
          unit: "s",
          baseline: "19.0s",
          delta: "-3.2%",
          status: "within",
        },
        {
          operation: "Route accuracy",
          value: "100",
          unit: "%",
          status: "pass",
        },
      ],
    },
    {
      id: "mlx-whisper-swift",
      name: "mlx-whisper-swift",
      description:
        "On-device speech-to-text — Whisper Large V3 Turbo (8-bit quantized).",
      entries: [
        {
          operation: "Model load (cold)",
          value: "2.8",
          unit: "s",
          baseline: "3.0s",
          delta: "-6.7%",
          status: "within",
        },
        {
          operation: "Model load (warm)",
          value: "1.4",
          unit: "s",
          baseline: "1.5s",
          delta: "-6.7%",
          status: "within",
        },
        {
          operation: "RTF (15s audio)",
          value: "0.12",
          unit: "×",
          baseline: "0.13×",
          delta: "-7.7%",
          status: "pass",
          budget: "<0.5×",
        },
        {
          operation: "RTF (60s audio)",
          value: "0.11",
          unit: "×",
          baseline: "0.12×",
          delta: "-8.3%",
          status: "pass",
          budget: "<0.5×",
        },
        {
          operation: "RTF (5min audio)",
          value: "0.10",
          unit: "×",
          baseline: "0.11×",
          delta: "-9.1%",
          status: "improvement",
        },
        {
          operation: "WER",
          value: "4.2",
          unit: "%",
          baseline: "4.5%",
          delta: "-6.7%",
          status: "pass",
          budget: "<10%",
        },
      ],
    },
  ],
};

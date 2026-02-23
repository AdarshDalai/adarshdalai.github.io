---
title: "Urjja"
subtitle: "Vector Search Engine created using GO"
image: "project-three.jpg"
techStack: ["Astro", "Tailwind"]
githubUrl: "https://github.com/AdarshDalai/Urjja"
liveUrl: "https://project-three.vercel.app"
order: 3
---

# Urjja

Urjja is a high-performance, AI-native vector search engine engineered in pure Go. It is designed to bridge the gap between raw computational throughput and modern service architecture, providing a robust foundation for building scalable, agentic AI applications.

## Overview

Traditional vector databases often force a compromise between performance (C++ libraries like FAISS) and operational simplicity (managed services). Urjja eliminates this trade-off by leveraging Go's efficient concurrency model and implementing critical hot paths in assembly to achieve near-native performance without the complexity of CGO.

The system is purpose-built for "AI-Native" workloads, where vector search is just one component of a larger reasoning loop. Urjja integrates natively with multi-modal data structures, local inference runtimes (ONNX), and agentic tool-use patterns.

## Key Features

*   **Pure Go Architecture**: Compiles to a single static binary with no external runtime dependencies.
*   **Hardware Acceleration**: SIMD-optimized vector operations (AVX2 for x86_64, NEON for ARM64) implemented in Go Assembly.
*   **Zero-GC Request Path**: Custom slab-based Arena allocators eliminate garbage collection pauses during high-throughput query execution.
*   **Managed Concurrency**: A robust WorkerPool implementation maximizes core saturation while preventing resource exhaustion under load.
*   **Multi-Modal Fusion**: Native support for storing and fusing vectors from distinct modalities (Text, Image, Audio) using weighted strategies.
*   **Agentic Reasoning**: Integrated search engine capable of decomposing complex user goals into multi-stage execution plans (`Plan` -> `Execute` -> `Refine`).

## Architecture

Urjja follows a modular, layered architecture:

1.  **Vector Layer**: Optimized math operations (`pkg/vector`).
2.  **Memory Layer**: Arena memory management for reducing GC pressure (`pkg/memory`).
3.  **Concurrency Layer**: Task scheduling and worker management (`pkg/concurrency`).
4.  **Index Layer**: HNSW graph implementation for approximate nearest neighbor search (`pkg/index`).
5.  **Query Layer**: Intelligent query processing, fusion, and agent orchestration (`pkg/query`).

## Performance comparison

Urjja prioritizes query throughput (QPS) and service stability over raw offline indexing speed. Below is a comparison against industry standards.

### Serving Performance (Query Throughput)
*Higher is better*

| Engine | Query Latency (p99) | QPS (16 cores) | Architecture |
| :--- | :--- | :--- | :--- |
| **Urjja** | ~22.5 ms | ~3,554 | Goroutine Fan-out |
| **FAISS** | < 1 ms | varies | OS Threads / OpenMP |
| **Qdrant** | ~10 ms | varies | Rust / Tokio |

*Note: Benchmarks performed on Apple M3 Pro, 20k vector dataset, 128 dimensions.*

Urjja's latency profile is designed to fit comfortably within the window of Large Language Model (LLM) inference (~500ms), making the additional overhead negligible for RAG (Retrieval Augmented Generation) applications compared to the ease of deployment.

### Indexing Performance
*Higher is better*

| Engine | Throughput (Vectors/sec) | Notes |
| :--- | :--- | :--- |
| **FAISS** | ~5,500+ | Highly optimized C++ construction. Best for offline batching. |
| **Urjja** | ~318 | Go-native construction. detailed graph quality over speed. |

Urjja is optimized for incremental, real-time updates rather than massive one-time batch indexing.

## License

Copyright 2026 Adarsh Kumar Dalai. All Rights Reserved.

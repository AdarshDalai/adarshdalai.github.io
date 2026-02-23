---
title: "AlmaConnX"
subtitle: "Transformer based recommendation engine"
image: "project-two.jpg"
techStack: ["Python", "Word2Vec", "FAISS", "Milvus", "TF-IDF"]
githubUrl: "https://github.com/AdarshDalai/AlmaConnX"
featured: true
order: 2
---

AlmaConnX is a context‑aware recommendation engine developed using synthetic LinkedIn profile data.  The system leverages a combination of semantic embeddings (generated with **Word2Vec**), traditional text similarity (via **TF-IDF**), and high‑performance vector search (using **FAISS** and **Milvus**) to deliver personalized profile suggestions.

### Problem & Approach
The goal was to design a recommendation pipeline that understands both **user context** and **query intent**.  Rather than relying on static keywords, AlmaConnX dynamically detects textual features in user profiles (skills, experience, education, etc.), transforms them into numerical vectors, and combines these into a unified representation.  A hybrid retrieval strategy then matches users based on:

1. **Semantic proximity** – measured by cosine/L2 distance between profile embeddings
2. **Textual relevance** – calculated with TF-IDF over concatenated profile fields

Queries are parsed for keywords, and their embeddings are blended with a target user's vector to produce context‑aware results.

### Key Implementation Highlights
- **Data ingestion** from Hugging Face (`ilsilfverskiold/linkedin_profiles_synthetic`) and downstream filtering of synthetic users.
- **Embedding generation** using Gensim’s Word2Vec for each text column, followed by a mean‑pooling strategy to create a `combined_embedding`.
- **Normalization & indexing**: embeddings are normalized and stored in FAISS for in‑memory searches; Milvus provides a scalable alternative for production use.
- **Hybrid recommendation functions** (`get_top_matches`, `get_text_similarity_recommendations`, `get_contextual_recommendations`) demonstrating semantic, text‑based, and query‑aware results respectively.
- **Modular Python code** in `recommendation.py` with accompanying Jupyter notebooks for exploratory analysis and model development.

### Results & Usage
Example output from the code produces ranked lists of similar LinkedIn profiles for a given user and query.  The hybrid model returns sensible recommendations even when user intent is specified (e.g. "Looking for AI and Machine Learning experts").

### Future Work
- Train and validate on **real world data** (MongoDB, company DBs).
- Deploy the engine as a **FastAPI** service for live recommendations.
- Incorporate **reinforcement learning** or feedback loops for stronger personalization.

> The full source, notebooks and documentation are available on GitHub.  See the repository link above for details and to experiment with the system yourself.

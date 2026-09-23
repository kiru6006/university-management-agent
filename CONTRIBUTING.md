# Contributing to University AI Operations Platform (UniOps-AI)

Thank you for your interest in contributing to the **University AI Operations Platform (UniOps-AI)**! This open-source platform is designed to transform higher education administration through safe, multi-agent AI workflows.

---

## 1. Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment-free environment. All contributors are expected to adhere to standard professional conduct.

---

## 2. Getting Started
1. **Fork the Repository:** Create a fork of the repo on GitHub.
2. **Clone Locally:**
   ```bash
   git clone https://github.com/<your-username>/university-ai-agent.git
   cd university-ai-agent
   ```
3. **Set Up Environment:**
   ```bash
   cp .env.example .env
   docker-compose up -d
   ```

---

## 3. Development Standards & Guidelines

### Backend (Python / FastAPI / LangGraph)
- Code formatting: Use `black` and `ruff`.
- Type checking: Enforce strict `mypy` typing.
- Testing: Add unit and integration tests under `backend/tests/` using `pytest`.

### Frontend (Angular / TypeScript / TailwindCSS)
- Follow standalone component architecture with strict TypeScript types.
- Ensure all interactive elements have accessible labels and ARIA standards.

### AI & Prompt Engineering
- All prompts must be documented in `docs/03-prompt-playbook.md`.
- No hardcoded API keys or unmasked PII.
- Ensure high test coverage for tool-calling argument validation.

---

## 4. Submitting Pull Requests (PR)
1. Create a feature branch: `git checkout -b feature/agent-name-enhancement`.
2. Commit your changes with clear, semantic commit messages.
3. Push to your fork and open a Pull Request against the `main` branch.
4. Ensure all CI checks (pytest, linting, build) pass.

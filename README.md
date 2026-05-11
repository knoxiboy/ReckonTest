<div align="center">
  <img src="https://via.placeholder.com/1200x300/1e293b/ffffff?text=ReckonTest" alt="ReckonTest Banner">
</div>

# ReckonTest (Jira Evaluator Demo)

> **Automated Quality and Security Evaluation for Agile Development Workflows.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-00C7B7?style=for-the-badge&logo=vercel)](#)
[![Security](https://img.shields.io/badge/Security-Hardened-green?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge)](LICENSE)

---

## Preview

<div align="center">
  <img src="https://via.placeholder.com/800x400/334155/ffffff?text=Evaluation+Scenarios" alt="ReckonTest Scenarios">
  <p><i>Automated assessment of Jira tickets against PR deliverables.</i></p>
</div>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Demo Scenarios](#demo-scenarios)
- [System Architecture](#system-architecture)
- [Security & SDLC Best Practices](#security--sdlc-best-practices)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Performance Optimization](#performance-optimization)

---

## Problem Statement

Engineering managers and QA leads spend immense amounts of time manually verifying if a Pull Request actually satisfies the acceptance criteria of its linked Jira ticket. This manual review process is prone to human error, overlooks edge cases, and creates massive bottlenecks in the Software Development Life Cycle (SDLC).

---

## Solution Overview

**ReckonTest** is a demonstration repository for the Jira Evaluator project. It provides a standardized framework to automatically evaluate code submissions against specific Jira issue types (Feature Requests, Bug Fixes, Refactors). 

By acting as an automated gatekeeper, it ensures that code is only merged when it strictly adheres to the stated requirements and security standards.

---

## Demo Scenarios

This repository showcases three core evaluation scenarios:

### 1. Feature Request (AUTH-101)
- **Task**: Implement password reset functionality.
- **Evaluation**: The system validates that the secure token generation and email dispatch logic are present.
- **Expected Result**: **PASS**

### 2. Bug Fix (AUTH-202)
- **Task**: Fix email validation logic.
- **Evaluation**: The system checks if the regex or validation library properly catches edge cases (like missing domain validation).
- **Expected Result**: **PARTIAL** (The demo code intentionally misses domain validation to demonstrate the evaluator's strictness).

### 3. Refactor (AUTH-303)
- **Task**: Move token generation to a dedicated utilities folder.
- **Evaluation**: The system verifies the structural shift without logic regression.
- **Expected Result**: **PASS**

---

## System Architecture

<div align="center">
  <img src="https://via.placeholder.com/800x400/1e293b/ffffff?text=Evaluation+Pipeline" alt="Architecture Diagram">
</div>

### Data Flow
1. **Webhook Trigger**: Code is pushed to the repository.
2. **Payload Verification**: Strict HMAC signature verification ensures the webhook is authentic.
3. **Context Gathering**: The system pulls the associated Jira ticket criteria.
4. **Evaluation Engine**: Code diff is analyzed against the acceptance criteria.
5. **Status Report**: Results are posted back to the PR and Jira.

---

## Security & SDLC Best Practices (Crucial)

ReckonTest is built with enterprise-grade security at its core:

- **Strict Content-Type Validation**: All payload streams must pass signature verification using `crypto.timingSafeEqual`, which protects against timing attacks during HMAC verification.
- **DDoS & Rate Limiting Mitigation**: Generic IP tracking is implemented at the Node/Express middleware scope to throttle spam requests and protect webhook endpoints.
- **Zero-Trust Input**: All incoming payload data is rigorously sanitized before evaluation to prevent injection attacks.

---

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Core Logic** | Node.js, Express | Webhook ingestion and evaluation orchestration |
| **Security** | Native Crypto API | HMAC verification and timing-safe comparisons |
| **Integration** | Jira API, GitHub API | Issue tracking and PR management |

---

## Installation Guide

### 1. Prerequisites
- Node.js (v18+)

### 2. Clone & Install
```bash
git clone https://github.com/your-org/ReckonTest.git
cd ReckonTest
npm install
```

### 3. Environment Variables
Create a `.env` file:
```env
WEBHOOK_SECRET=your_secure_secret
JIRA_API_TOKEN=your_jira_token
```

### 4. Run Server
```bash
npm start
```

---

## Performance Optimization

- **Stream Parsing**: Webhook payloads are parsed as streams to handle massive PR diffs without crashing the Node process due to memory limits.
- **Asynchronous Evaluation**: The evaluation engine runs non-blocking, ensuring the API responds to the webhook provider instantly while processing occurs in the background.

---

## License

This project is licensed under the MIT License.

---
<div align="center">
<i>Enforcing quality and security at the speed of code.</i>
</div>

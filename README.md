# Jira Evaluator Demo Repo
This repo contains demo scenarios for the Jira Evaluator hackathon project.

## Demo Scenarios

1. **Feature Request (AUTH-101)**: Password reset functionality. Expected Result: PASS.
2. **Bug Fix (AUTH-202)**: Email validation logic. Expected Result: PARTIAL (Missing domain validation).
3. **Refactor (AUTH-303)**: Moving token generation to utils. Expected Result: PASS.

## Security & SDLC Best Practices Applied
- **Strict Content-Type Validation:** Ensured all payload streams pass signature verification via `crypto.timingSafeEqual` protecting HMAC timings.
- **DDoS/Rate Limiting Middleware:** Added generic IP tracking in node/express scope to throttle spam requests on webhook endpoints.

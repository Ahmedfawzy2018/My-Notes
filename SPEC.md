# Note Taking App — Technical Specification

## Product Overview

We are building a **Note Taking** web app.

A "note" is a rich text document created using a **TipTap** editor.

Authenticated users can:

- Create notes
- View notes
- Update notes
- Delete notes
- Share notes publicly
- Disable public sharing

---

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Frontend       | Next.js (App Router)                    |
| Runtime        | Bun                                     |
| Language       | TypeScript                              |
| Styling        | TailwindCSS                             |
| Authentication | better-auth                             |
| Editor         | TipTap                                  |
| Database       | SQLite (via Bun SQL client, raw SQL only) |

---

## Editor Features

Support the following formatting:

- Bold, Italic
- Headings (H1, H2, H3) + Paragraph
- Inline code + Code blocks
- Bullet lists
- Horizontal rules

---

## Data Storage

- Notes are stored as JSON (TipTap document format)
- Use SQLite with raw SQL queries (no ORM)

---

## Deliverables

### 1. System Architecture

- High-level architecture (frontend, backend, DB)
- Folder/module structure (Next.js oriented)
- Separation of concerns

### 2. Database Design

#### 2.1 better-auth Core Tables

better-auth requires the following tables. These are **managed by better-auth** and must match its expected schema exactly.

##### `user`

| Column          | Type      | Constraints           | Description                              |
| --------------- | --------- | --------------------- | ---------------------------------------- |
| `id`            | `TEXT`    | PRIMARY KEY           | Unique identifier for each user          |
| `name`          | `TEXT`    | NOT NULL              | User's display name                      |
| `email`         | `TEXT`    | NOT NULL, UNIQUE      | User's email address                     |
| `emailVerified` | `INTEGER` | NOT NULL, DEFAULT 0   | Whether the user's email is verified (boolean) |
| `image`         | `TEXT`    | NULLABLE              | User's avatar/image URL                  |
| `createdAt`     | `TEXT`    | NOT NULL              | ISO 8601 timestamp of account creation   |
| `updatedAt`     | `TEXT`    | NOT NULL              | ISO 8601 timestamp of last update        |

##### `session`

| Column      | Type   | Constraints                              | Description                        |
| ----------- | ------ | ---------------------------------------- | ---------------------------------- |
| `id`        | `TEXT` | PRIMARY KEY                              | Unique identifier for the session  |
| `userId`    | `TEXT` | NOT NULL, FOREIGN KEY → `user(id)`       | The user this session belongs to   |
| `token`     | `TEXT` | NOT NULL, UNIQUE                         | Unique session token               |
| `expiresAt` | `TEXT` | NOT NULL                                 | When the session expires           |
| `ipAddress` | `TEXT` | NULLABLE                                 | IP address of the client           |
| `userAgent` | `TEXT` | NULLABLE                                 | User agent string of the client    |
| `createdAt` | `TEXT` | NOT NULL                                 | Timestamp of session creation      |
| `updatedAt` | `TEXT` | NOT NULL                                 | Timestamp of last session update   |

##### `account`

| Column                  | Type   | Constraints                          | Description                                         |
| ----------------------- | ------ | ------------------------------------ | --------------------------------------------------- |
| `id`                    | `TEXT` | PRIMARY KEY                          | Unique identifier for the account                   |
| `userId`                | `TEXT` | NOT NULL, FOREIGN KEY → `user(id)`   | The user this account belongs to                    |
| `accountId`             | `TEXT` | NOT NULL                             | Provider-side account ID (or same as userId for credentials) |
| `providerId`            | `TEXT` | NOT NULL                             | Auth provider identifier (e.g. `"credential"`, `"github"`) |
| `accessToken`           | `TEXT` | NULLABLE                             | OAuth access token                                  |
| `refreshToken`          | `TEXT` | NULLABLE                             | OAuth refresh token                                 |
| `accessTokenExpiresAt`  | `TEXT` | NULLABLE                             | When the access token expires                       |
| `refreshTokenExpiresAt` | `TEXT` | NULLABLE                             | When the refresh token expires                      |
| `scope`                 | `TEXT` | NULLABLE                             | OAuth scope                                         |
| `idToken`               | `TEXT` | NULLABLE                             | ID token from the provider                          |
| `password`              | `TEXT` | NULLABLE                             | Hashed password (for email/password auth)            |
| `createdAt`             | `TEXT` | NOT NULL                             | Timestamp of account creation                       |
| `updatedAt`             | `TEXT` | NOT NULL                             | Timestamp of last account update                    |

##### `verification`

| Column       | Type   | Constraints | Description                              |
| ------------ | ------ | ----------- | ---------------------------------------- |
| `id`         | `TEXT` | PRIMARY KEY | Unique identifier for the verification   |
| `identifier` | `TEXT` | NOT NULL    | The identifier for the verification request |
| `value`      | `TEXT` | NOT NULL    | The value to be verified                 |
| `expiresAt`  | `TEXT` | NOT NULL    | When the verification expires            |
| `createdAt`  | `TEXT` | NOT NULL    | Timestamp of creation                    |
| `updatedAt`  | `TEXT` | NOT NULL    | Timestamp of last update                 |

> **Note:** Do not manually modify the structure of these tables. Use `npx auth@latest migrate` or `npx auth@latest generate` to manage schema changes for better-auth tables.

#### 2.2 Application Tables

- `note` table (app-specific)
- Any sharing-related tables

#### 2.3 Schema Details

- Full schema with fields, types, constraints
- Indexing strategy
- Raw SQL schema

### 3. Authentication & Authorization

- How better-auth is integrated
- Session handling (via better-auth's `session` table)
- Protecting routes and APIs

### 4. Note Domain Design

- Note entity structure
- JSON structure for TipTap content
- Versioning (if needed)
- Ownership rules

### 5. Sharing System

- Public sharing design
- Share token / slug strategy
- Enabling/disabling sharing
- Security considerations

### 6. API Design

Define all endpoints:

- Create note
- List notes
- Get single note
- Update note
- Delete note
- Share / Unshare note

Include:

- Request/response formats
- Validation rules
- Error handling

### 7. Frontend Structure

- Pages & routes (Next.js App Router)
- Component structure
- State management approach
- Editor integration (TipTap)

### 8. Caching Strategy (if applicable)

- Where caching makes sense
- Keys and invalidation strategy

### 9. Performance Considerations

- Handling large notes
- Efficient querying
- Pagination strategy

### 10. Security Best Practices

- Input sanitization (rich text!)
- XSS prevention
- Access control

### 11. Edge Cases

- Concurrent edits
- Deleted/shared note access
- Empty or malformed JSON

### 12. Step-by-Step Implementation Plan

- Clear phases to build the system from scratch

---

## Important Rules

- Be highly specific and technical
- Do NOT give vague suggestions
- Do NOT write full code implementations
- Focus on architecture, structure, and decisions
- Follow clean architecture and SOLID principles where applicable
- Optimize for scalability and maintainability

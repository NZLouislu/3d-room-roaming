# AI Assistant Rules and Guidelines

This document contains all rules and guidelines for AI assistants working on this project.

---

## Table of Contents

1. [Coding Rules](#coding-rules)
2. [Documentation Organization](#documentation-organization)
3. [Quick Reference](#quick-reference)

---

# Coding Rules

## 🎯 Core Principles

### 1. **NO COMMENTS IN CODE**

**RULE**: Do NOT add comments in the code unless absolutely necessary for complex algorithms.

❌ **BAD - Don't do this:**

```typescript
// Fetch user data from API
const fetchUser = async (id: string) => {
  // Make API call
  const response = await fetch(`/api/users/${id}`);
  // Parse JSON response
  const data = await response.json();
  // Return user data
  return data;
};
```

✅ **GOOD - Do this:**

```typescript
const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};
```

**Why?**

- Code should be self-explanatory through clear naming
- Comments become outdated and misleading
- Clean code is easier to read

**Exceptions:**

- Complex algorithms that need explanation
- TODO markers for future work
- JSDoc for public APIs (if required)

---

### 2. **ENGLISH ONLY FOR UI TEXT**

**RULE**: All user-facing text, labels, buttons, and messages MUST be in English.

❌ **BAD - Don't do this:**

```typescript
<button>保存</button>
<p>请输入您的名字</p>
const errorMsg = "用户名不能为空";
```

✅ **GOOD - Do this:**

```typescript
<button>Save</button>
<p>Please enter your name</p>
const errorMsg = "Username cannot be empty";
```

**This applies to:**

- Button labels
- Form labels and placeholders
- Error messages
- Success messages
- Tooltips and help text
- Modal titles and content
- Navigation items
- Any text visible to users

**Exceptions:**

- Internal variable names (can be descriptive)
- Console logs for debugging (can be in any language)
- Documentation files (can be in Chinese)

---

### 3. **CLEAN CODE PRACTICES**

#### Self-Documenting Code

Use clear, descriptive names instead of comments:

```typescript
// ❌ BAD
const d = new Date();
const x = u.filter((i) => i.a); // Filter active users

// ✅ GOOD
const currentDate = new Date();
const activeUsers = users.filter((user) => user.isActive);
```

#### Function Naming

Functions should clearly describe what they do:

```typescript
// ❌ BAD
function process(data) {}
function doStuff() {}

// ✅ GOOD
function validateUserInput(input) {}
function fetchUserProfile(userId) {}
function calculateTotalPrice(items) {}
```

#### Variable Naming

Variables should be descriptive:

```typescript
// ❌ BAD
const tmp = getUserData();
const x = 5;

// ✅ GOOD
const userData = getUserData();
const maxRetryAttempts = 5;
```

---

### 4. **CONSISTENT FORMATTING**

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings (unless template literals)
- Use arrow functions for callbacks
- Use async/await instead of .then()

```typescript
// ✅ GOOD
const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
```

---

### 5. **ERROR HANDLING**

Always handle errors with clear English messages:

```typescript
// ✅ GOOD
try {
  await saveData(data);
} catch (error) {
  console.error("Failed to save data:", error);
  throw new Error("Unable to save data. Please try again.");
}
```

---

### 6. **COMPONENT STRUCTURE**

React components should follow this order:

1. Imports
2. Type definitions
3. Component function
4. Return statement
5. Exports

```typescript
import React, { useState } from "react";

interface UserCardProps {
  name: string;
  email: string;
}

export default function UserCard({ name, email }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

---

### 7. **TYPESCRIPT USAGE**

- Always use TypeScript
- Define interfaces for props and data structures
- Avoid `any` type
- Use proper type annotations

```typescript
// ✅ GOOD
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

---

## Common Mistakes to Avoid

1. **Adding comments for obvious code**

   ```typescript
   // ❌ Don't do this
   const user = getUser(); // Get the user
   ```

2. **Using Chinese in UI**

   ```typescript
   // ❌ Don't do this
   <button>提交</button>
   ```

3. **Unclear variable names**

   ```typescript
   // ❌ Don't do this
   const d = new Date();
   const arr = [];
   ```

4. **Mixing languages**
   ```typescript
   // ❌ Don't do this
   const errorMessage = "错误：Invalid input";
   ```

---

## ✅ Code Examples

### Example 1: API Route

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await createUser(body);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
```

### Example 2: React Component

```typescript
import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

---

# Documentation Organization

## 📁 Directory Structure

All project documentation should be organized in the `docs/` directory:

```
docs/
├── blog/                    # Blog-related documentation
│   └── BLOG_CHAT_TESTING.md
├── stories/                 # Stories-related documentation
│   ├── STORIES_CHAT_IMPLEMENTATION.md
│   └── JIRA_PROJECT_SELECTION_ENHANCEMENT.md
├── chatbot/                 # Chatbot-related documentation
├── auth/                    # Authentication-related documentation
└── [general docs]           # General project documentation
    └── USER_AUTHENTICATION_ANALYSIS.md
```

---

## 📝 Documentation Rules

### 1. **Location Rules**

When creating new markdown documentation:

- **Blog feature docs** → `docs/blog/`
- **Stories feature docs** → `docs/stories/`
- **Chatbot feature docs** → `docs/chatbot/`
- **Authentication docs** → `docs/auth/`
- **API docs** → `docs/api/`
- **Database docs** → `docs/database/`
- **General/Cross-cutting docs** → `docs/` (root level)

### 2. **Naming Conventions**

- Use **UPPERCASE** with underscores for documentation files
- Be descriptive and specific
- Examples:
  - ✅ `BLOG_CHAT_TESTING.md`
  - ✅ `STORIES_CHAT_IMPLEMENTATION.md`
  - ✅ `USER_AUTHENTICATION_ANALYSIS.md`
  - ❌ `test.md`
  - ❌ `doc1.md`

### 3. **File Organization by Type**

#### Implementation Docs

- Location: Feature-specific folder (e.g., `docs/blog/`, `docs/stories/`)
- Naming: `[FEATURE]_IMPLEMENTATION.md`
- Example: `BLOG_CHAT_IMPLEMENTATION.md`

#### Testing Docs

- Location: Feature-specific folder
- Naming: `[FEATURE]_TESTING.md` or `[FEATURE]_TEST_GUIDE.md`
- Example: `BLOG_CHAT_TESTING.md`

#### Enhancement/Feature Docs

- Location: Feature-specific folder
- Naming: `[FEATURE]_[ENHANCEMENT_NAME].md`
- Example: `JIRA_PROJECT_SELECTION_ENHANCEMENT.md`

#### Analysis Docs

- Location: `docs/` root or relevant feature folder
- Naming: `[TOPIC]_ANALYSIS.md`
- Example: `USER_AUTHENTICATION_ANALYSIS.md`

#### API Documentation

- Location: `docs/api/`
- Naming: `[API_NAME]_API.md`
- Example: `CHAT_MESSAGES_API.md`

### 4. **Content Structure**

Every documentation file should include:

1. **Title** (H1)
2. **Overview** section
3. **Table of Contents** (for longer docs)
4. **Main content** with clear sections
5. **Code examples** (if applicable)
6. **References** (if applicable)

### 5. **Cross-References**

When referencing other docs:

- Use relative paths: `[See Blog Chat Implementation](./blog/BLOG_CHAT_IMPLEMENTATION.md)`
- Keep references up-to-date when moving files

---

## 📋 Documentation Checklist

Before creating a new doc, verify:

- [ ] Correct folder location chosen
- [ ] Filename follows naming conventions
- [ ] Has clear title and overview
- [ ] Code examples are properly formatted
- [ ] Cross-references are updated

---

# Quick Reference

## 📋 Pre-Submission Checklist

### For Code:

- [ ] No unnecessary comments
- [ ] All UI text is in English
- [ ] Variable and function names are descriptive
- [ ] Code is properly formatted
- [ ] TypeScript types are defined
- [ ] Error messages are in English
- [ ] No Chinese characters in UI

### For Documentation:

- [ ] Placed in correct folder
- [ ] Follows naming convention (UPPERCASE_WITH_UNDERSCORES.md)
- [ ] Has proper structure (title, overview, content)
- [ ] Content is clear and complete
- [ ] Cross-references are valid

---

## 🎯 Decision Tree

### When Writing Code:

```
Is this comment necessary?
├─ No → Remove it, use descriptive names instead
└─ Yes (complex algorithm) → Keep it minimal

Is this text visible to users?
├─ Yes → Must be in English
└─ No → Can be any language (internal use)

Is the variable name clear?
├─ Yes → Good!
└─ No → Rename to be more descriptive
```

### When Creating Documentation:

```
What feature does this document?
├─ Blog → docs/blog/
├─ Stories → docs/stories/
├─ Chatbot → docs/chatbot/
├─ Auth → docs/auth/
└─ General → docs/

What type of document?
├─ Implementation → [FEATURE]_IMPLEMENTATION.md
├─ Testing → [FEATURE]_TESTING.md
├─ Enhancement → [FEATURE]_[NAME].md
└─ Analysis → [TOPIC]_ANALYSIS.md
```

---

## 🚀 Getting Started

### For AI Assistants:

1. Read this document at the start of each session
2. Reference it when making decisions
3. Follow all rules strictly
4. Ask for clarification if rules conflict

### For Developers:

1. Point AI assistants to this file when needed
2. Update rules as project standards evolve
3. Use as a reference for code reviews

---

## 📞 Rule Priority

If rules conflict, follow this priority:

1. **Coding Rules** - For all code-related decisions
2. **Documentation Rules** - For all documentation decisions
3. **User Requirements** - As specified by the project owner

---

## 🎯 Remember

**The goal is to write:**

- Clean, self-explanatory code
- English-only user interfaces
- Well-organized documentation
- Properly typed TypeScript
- Code without unnecessary comments

**When in doubt, ask:**

1. Is this comment necessary, or is the code clear enough?
2. Is all UI text in English?
3. Are my variable names descriptive?
4. Is this documentation in the right folder?
5. Would another developer understand this without comments?

**These rules are MANDATORY for all AI-generated code and documentation in this project.**

---

## 🏠 3D Tour Debug Panel

### Overview

The 3D Room Roaming application includes a comprehensive debug panel for the automatic tour feature. This panel allows developers to:

1. **Select and preview any tour view** from a dropdown menu
2. **View real-time camera coordinates** (position and lookAt)
3. **Edit coordinates** and see changes immediately
4. **Fine-tune camera position** using WASD+QE keyboard controls
5. **Copy tour point code** to clipboard for easy updates

### Debug Panel Features

#### 1. View Selection

- Dropdown menu showing all tour points (Welcome, Backyard, Living Room, etc.)
- Selecting a view immediately jumps to that position
- Shows current view number and total count

#### 2. Coordinate Display & Editing

- **Position (X, Y, Z)**: Camera location in 3D space
- **Look At (X, Y, Z)**: Point the camera is looking at
- Toggle Edit Mode to modify coordinates
- Apply Changes button to preview modifications

#### 3. WASD Keyboard Controls

When tour is paused, use keyboard to fine-tune position:

- `W` - Move forward (+Z)
- `S` - Move backward (-Z)
- `A` - Move left (-X)
- `D` - Move right (+X)
- `Q` - Move up (+Y)
- `E` - Move down (-Y)
- `Shift` + Key - Faster movement (2x speed)

#### 4. Code Export

- Copy button generates ready-to-use TypeScript code
- Includes all tour point properties
- Paste directly into `tourPoints.ts`

### Usage Workflow

1. **Start Auto Tour** - Debug panel appears automatically
2. **Pause Tour** - Click pause button or select a specific view
3. **Fine-tune Position** - Use WASD+QE keys to adjust camera
4. **Edit Coordinates** - Enable Edit Mode for precise numerical adjustments
5. **Apply & Test** - See changes in real-time
6. **Copy Code** - Export finalized coordinates

### Technical Implementation

The debug panel integrates with:

- `AutoTourController` - Handles camera movement and keyboard input
- `TourDebugPanel` - UI component for controls and coordinate editing
- `App.tsx` - State management for debug mode and custom positions

### Best Practices

- Always pause before making adjustments
- Use WASD for quick positioning, then fine-tune with numerical inputs
- Test each view thoroughly before copying code
- Keep debug mode enabled only during development

---

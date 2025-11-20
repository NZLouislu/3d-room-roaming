## Backlog

- Story: JIRA-001 Install and Configure Dependencies
  Description: Install jira-md-sync and jira2md npm packages and verify compatibility with the existing Next.js TypeScript setup in AI Tasky project.
  Acceptance_Criteria:
  - [ ] Install jira-md-sync package (latest stable version)
  - [ ] Install jira2md package for rich text format conversion
  - [ ] Verify no dependency conflicts with existing Next.js packages
  - [ ] Run `npm install` successfully without errors
  - [ ] Verify TypeScript can resolve type definitions
  - [ ] Update package.json and package-lock.json
  - [ ] Write unit test to verify package imports work correctly
        Priority: High
        Labels: [dependencies, setup, jira]
        Assignees: Development Team
        Reporter: Project Manager

- Story: JIRA-002 Create Database-Driven Config Loader
  Description: Implement config-loader module to fetch Jira credentials from user_platform_configs table instead of .env files, with encryption/decryption support.
  Acceptance_Criteria:
  - [ ] Create `src/lib/stories/jira/config.ts` file
  - [ ] Implement `loadJiraConfig(userId, configName)` function
  - [ ] Define `JiraConfig` and `JiraSyncOptions` TypeScript interfaces
  - [ ] Integrate with taskyDb Supabase client
  - [ ] Implement API token decryption using existing decrypt() utility
  - [ ] Handle missing config gracefully with null return
  - [ ] Add comprehensive error logging
  - [ ] Write unit tests with mocked database calls (>90% coverage)
  - [ ] Write integration test with test database
        Priority: High
        Labels: [backend, database, security, jira]
        Assignees: Backend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: config.test.ts - Mock taskyDb.from().select().eq() chain
  - Integration: config.integration.test.ts - Test with real Supabase test instance
  - E2E: Verify config loading in full sync workflow

- Story: JIRA-003 Implement Markdown to Jira Sync Function
  Description: Create syncToJira() function that reads Markdown files, loads user config from database, and pushes stories to Jira using jira-md-sync package.
  Acceptance_Criteria:
  - [ ] Create `src/lib/stories/jira/sync.ts` file
  - [ ] Implement `syncToJira(options: JiraSyncOptions)` function
  - [ ] Call loadJiraConfig() to fetch user credentials
  - [ ] Integrate with jira-md-sync's mdToJira() method
  - [ ] Support dry-run mode for testing
  - [ ] Return structured result with created/skipped/errors counts
  - [ ] Handle errors with descriptive messages
  - [ ] Add logging for debugging
  - [ ] Write unit tests mocking jira-md-sync (>85% coverage)
  - [ ] Write integration test with sample Markdown file
        Priority: High
        Labels: [backend, sync, jira]
        Assignees: Backend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: sync.test.ts - Mock mdToJira, test all code paths
  - Integration: sync.integration.test.ts - Test with real MD file and mocked Jira API
  - E2E: Full workflow test with test Jira instance

- Story: JIRA-004 Implement Jira to Markdown Sync Function
  Description: Create syncFromJira() function that fetches issues from Jira and exports them as Markdown files for AI context awareness and status tracking.
  Acceptance_Criteria:
  - [ ] Implement `syncFromJira(options: JiraSyncOptions)` in sync.ts
  - [ ] Call loadJiraConfig() to fetch user credentials
  - [ ] Integrate with jira-md-sync's jiraToMd() method
  - [ ] Support JQL query customization
  - [ ] Return structured result with written files count
  - [ ] Handle pagination for large result sets
  - [ ] Preserve label order using inputDir parameter
  - [ ] Write unit tests mocking jira-md-sync (>85% coverage)
  - [ ] Write integration test verifying MD output format
        Priority: High
        Labels: [backend, sync, jira, ai-context]
        Assignees: Backend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: sync.test.ts - Mock jiraToMd, verify all parameters
  - Integration: sync.integration.test.ts - Verify MD file structure
  - E2E: Test with real Jira issues and verify AI can parse output

## In Progress

- Story: JIRA-005 Create Unified Sync API Route
  Description: Implement Next.js API route at /api/stories/jira/sync that handles both upload and download actions with user authentication.
  Acceptance_Criteria:
  - [ ] Create `src/app/api/stories/jira/sync/route.ts` file
  - [ ] Implement POST handler with auth() middleware
  - [ ] Parse action parameter (upload/download)
  - [ ] Route to syncToJira() or syncFromJira() based on action
  - [ ] Validate user session and return 401 if unauthorized
  - [ ] Return structured JSON responses
  - [ ] Handle errors with appropriate HTTP status codes
  - [ ] Add request/response logging
  - [ ] Write API route tests using Next.js testing utilities (>80% coverage)
        Priority: High
        Labels: [api, backend, jira]
        Assignees: Backend Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: route.test.ts - Mock auth, syncToJira, syncFromJira
  - Integration: route.integration.test.ts - Test with mock HTTP requests
  - E2E: Test via actual HTTP calls from frontend

- Story: JIRA-006 Update Document Generator for Dual Documents
  Description: Modify document-generator.ts to create both Report and Story documents when user creates a new project.
  Acceptance_Criteria:
  - [ ] Update `src/lib/stories/document-generator.ts`
  - [ ] Generate `[ProjectName]-stories.md` alongside report.md
  - [ ] Use Multi-Story Markdown template format
  - [ ] Include sample stories in template (Backlog section)
  - [ ] Preserve existing Report generation logic
  - [ ] Add metadata to Story document (project name, created date)
  - [ ] Write unit tests for dual document generation (>85% coverage)
  - [ ] Write integration test verifying both files are created
        Priority: High
        Labels: [backend, document-generation, jira]
        Assignees: Backend Team
        Reporter: Product Manager
        Test_Coverage:
  - Unit: document-generator.test.ts - Mock file system operations
  - Integration: Verify both files exist with correct content
  - E2E: Create project via UI and verify documents

- Story: JIRA-007 Create Jira Sync Panel UI Component
  Description: Build React component that provides Sync to Jira and Sync from Jira buttons with progress indicators and error handling.
  Acceptance_Criteria:
  - [ ] Create `src/components/stories/JiraSyncPanel.tsx`
  - [ ] Add "Sync to Jira" button with upload icon
  - [ ] Add "Sync from Jira" button with download icon
  - [ ] Implement loading states during sync operations
  - [ ] Display success/error messages with toast notifications
  - [ ] Show sync results (created/skipped counts)
  - [ ] Disable buttons during sync to prevent double-clicks
  - [ ] Add dry-run toggle for testing
  - [ ] Write React component tests using Testing Library (>80% coverage)
        Priority: High
        Labels: [frontend, ui, jira]
        Assignees: Frontend Team
        Reporter: UX Designer
        Test_Coverage:
  - Unit: JiraSyncPanel.test.tsx - Test button clicks, loading states
  - Integration: Test with mocked API calls
  - E2E: Test full sync workflow via Playwright

## Ready

- Story: JIRA-008 Integrate AI Chat with Story Documents
  Description: Extend existing AI Chat component to support Story documents with Multi-Story format awareness for intelligent editing.
  Acceptance_Criteria:
  - [ ] Update AI Chat to detect Story document type
  - [ ] Add Multi-Story format parsing to AI context
  - [ ] Enable AI to add/edit/delete stories while maintaining format
  - [ ] Implement status transition commands (e.g., "move to Done")
  - [ ] Add progress analysis commands (e.g., "generate progress report")
  - [ ] Preserve Markdown formatting in AI responses
  - [ ] Write unit tests for AI command parsing (>80% coverage)
  - [ ] Write integration tests for AI-document interaction
        Priority: Medium
        Labels: [ai, frontend, jira]
        Assignees: AI Team, Frontend Team
        Reporter: Product Manager
        Test_Coverage:
  - Unit: Test AI command recognition and format preservation
  - Integration: Test AI modifications maintain valid Multi-Story format
  - E2E: Test full AI chat workflow with Story documents

- Story: JIRA-009 Implement Progress Tracking and Analytics
  Description: Add AI-powered progress tracking that analyzes Story status changes and generates insights for project management.
  Acceptance_Criteria:
  - [ ] Parse Story statuses from Markdown (Backlog, In Progress, Done)
  - [ ] Calculate completion percentage
  - [ ] Identify blocked or stalled stories
  - [ ] Generate daily/weekly progress reports
  - [ ] Detect high-priority stories in Backlog
  - [ ] Provide AI recommendations for task prioritization
  - [ ] Write unit tests for analytics functions (>85% coverage)
  - [ ] Write integration tests with sample Story documents
        Priority: Medium
        Labels: [ai, analytics, jira]
        Assignees: AI Team, Backend Team
        Reporter: Product Manager
        Test_Coverage:
  - Unit: Test status parsing, percentage calculation, report generation
  - Integration: Test with various Story document states
  - E2E: Verify AI generates accurate progress reports

- Story: JIRA-010 Add Comprehensive Unit Tests for Config Loader
  Description: Create thorough unit test suite for config-loader module covering all success and failure scenarios.
  Acceptance_Criteria:
  - [ ] Create `src/lib/stories/jira/__tests__/config.test.ts`
  - [ ] Mock taskyDb using jest.mock()
  - [ ] Test successful config loading with valid data
  - [ ] Test null return when config not found
  - [ ] Test null return when user not authenticated
  - [ ] Test error handling for database failures
  - [ ] Test decryption error handling
  - [ ] Test multiple config names (Default, Production, etc.)
  - [ ] Achieve >90% code coverage for config.ts
  - [ ] Add edge case tests (empty strings, special characters)
        Priority: High
        Labels: [testing, unit-test, jira]
        Assignees: QA Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: config.test.ts - 15+ test cases covering all branches
  - Coverage: >90% statements, branches, functions, lines

- Story: JIRA-011 Add Comprehensive Unit Tests for Sync Functions
  Description: Build extensive unit test suite for syncToJira and syncFromJira functions with mocked dependencies.
  Acceptance_Criteria:
  - [ ] Create `src/lib/stories/jira/__tests__/sync.test.ts`
  - [ ] Mock jira-md-sync module using jest.mock()
  - [ ] Mock loadJiraConfig function
  - [ ] Test syncToJira with valid inputs
  - [ ] Test syncToJira with missing config
  - [ ] Test syncToJira with dry-run mode
  - [ ] Test syncFromJira with valid inputs
  - [ ] Test syncFromJira with JQL queries
  - [ ] Test error handling for API failures
  - [ ] Achieve >85% code coverage for sync.ts
  - [ ] Add performance tests for large file processing
        Priority: High
        Labels: [testing, unit-test, jira]
        Assignees: QA Team
        Reporter: Tech Lead
        Test_Coverage:
  - Unit: sync.test.ts - 20+ test cases for both functions
  - Coverage: >85% statements, branches, functions, lines

- Story: JIRA-012 Add Integration Tests for API Routes
  Description: Create integration tests for /api/stories/jira/sync endpoint testing full request/response cycle.
  Acceptance_Criteria:
  - [ ] Create `src/app/api/stories/jira/sync/__tests__/route.test.ts`
  - [ ] Test POST with upload action and valid auth
  - [ ] Test POST with download action and valid auth
  - [ ] Test 401 response for unauthenticated requests
  - [ ] Test 400 response for invalid action parameter
  - [ ] Test 500 response for sync function errors
  - [ ] Mock auth() middleware
  - [ ] Mock syncToJira and syncFromJira functions
  - [ ] Verify response JSON structure
  - [ ] Achieve >80% code coverage for route.ts
        Priority: High
        Labels: [testing, integration-test, api, jira]
        Assignees: QA Team
        Reporter: Tech Lead
        Test_Coverage:
  - Integration: route.test.ts - Test all HTTP scenarios
  - Coverage: >80% statements, branches

## Testing

- Story: JIRA-013 Create End-to-End Test Suite
  Description: Develop comprehensive E2E tests using Playwright to validate entire Jira sync workflow from UI to Jira API.
  Acceptance_Criteria:
  - [ ] Create `e2e/jira-sync.spec.ts` file
  - [ ] Set up test Jira project with sample issues
  - [ ] Test user connects to Jira via UI
  - [ ] Test user creates new project with Story document
  - [ ] Test AI adds stories to document
  - [ ] Test Sync to Jira button creates issues
  - [ ] Test Sync from Jira button updates local document
  - [ ] Verify issue formatting in Jira matches Markdown
  - [ ] Test error scenarios (invalid credentials, network failure)
  - [ ] Achieve >80% E2E coverage for critical user paths
        Priority: High
        Labels: [testing, e2e, jira]
        Assignees: QA Team
        Reporter: QA Lead
        Test_Coverage:
  - E2E: jira-sync.spec.ts - 10+ test scenarios
  - Coverage: All critical user workflows tested

- Story: JIRA-014 Add Performance and Load Tests
  Description: Create performance tests to ensure sync operations handle large documents and high concurrency without degradation.
  Acceptance_Criteria:
  - [ ] Create `tests/performance/jira-sync.perf.ts`
  - [ ] Benchmark syncToJira with 100 stories
  - [ ] Benchmark syncFromJira with 500 issues
  - [ ] Test concurrent sync operations (10 users)
  - [ ] Measure API response times (p50, p95, p99)
  - [ ] Test memory usage during large syncs
  - [ ] Identify and document performance bottlenecks
  - [ ] Set performance SLAs (e.g., <5s for 100 stories)
  - [ ] Add performance regression tests to CI/CD
        Priority: Medium
        Labels: [testing, performance, jira]
        Assignees: QA Team, DevOps Team
        Reporter: Tech Lead
        Test_Coverage:
  - Performance: jira-sync.perf.ts - Load and stress tests
  - Metrics: Response time, throughput, memory usage

- Story: JIRA-015 Security Audit and Penetration Testing
  Description: Conduct security review of Jira integration focusing on credential handling, API token security, and data encryption.
  Acceptance_Criteria:
  - [ ] Verify API tokens are never logged or exposed
  - [ ] Test encryption/decryption of stored credentials
  - [ ] Verify HTTPS enforcement for Jira API calls
  - [ ] Test for SQL injection in database queries
  - [ ] Test for XSS vulnerabilities in UI components
  - [ ] Verify proper authentication on all API routes
  - [ ] Run `npm audit` and fix critical vulnerabilities
  - [ ] Perform penetration testing on sync endpoints
  - [ ] Document security best practices in README
        Priority: High
        Labels: [security, testing, jira]
        Assignees: Security Team, QA Team
        Reporter: Security Lead
        Test_Coverage:
  - Security: Penetration tests, vulnerability scans
  - Compliance: OWASP Top 10 checklist

- Story: JIRA-016 Accessibility Testing for UI Components
  Description: Ensure Jira sync UI components meet WCAG 2.1 AA accessibility standards for inclusive user experience.
  Acceptance_Criteria:
  - [ ] Test JiraSyncPanel with screen readers (NVDA, JAWS)
  - [ ] Verify keyboard navigation works for all buttons
  - [ ] Test color contrast ratios meet WCAG AA standards
  - [ ] Add ARIA labels to all interactive elements
  - [ ] Test with browser zoom at 200%
  - [ ] Verify focus indicators are visible
  - [ ] Run axe-core automated accessibility tests
  - [ ] Fix all critical and serious accessibility issues
  - [ ] Document accessibility features
        Priority: Medium
        Labels: [accessibility, testing, ui, jira]
        Assignees: Frontend Team, QA Team
        Reporter: UX Designer
        Test_Coverage:
  - Accessibility: axe-core tests, manual screen reader tests
  - Compliance: WCAG 2.1 AA checklist

## Done

- Story: JIRA-017 Documentation and Developer Guide
  Description: Create comprehensive documentation for Jira integration including setup guide, API reference, and troubleshooting.
  Acceptance_Criteria:
  - [ ] Update main README.md with Jira integration overview
  - [ ] Document database schema for user_platform_configs
  - [ ] Create API documentation for sync endpoints
  - [ ] Document Multi-Story Markdown format specification
  - [ ] Add code examples for common use cases
  - [ ] Create troubleshooting guide for common errors
  - [ ] Document AI commands for Story management
  - [ ] Add architecture diagrams for data flow
  - [ ] Create video tutorial for end users
  - [ ] Update CHANGELOG.md with new features
        Priority: Medium
        Labels: [documentation, jira]
        Assignees: Technical Writer, Development Team
        Reporter: Product Manager
        Test_Coverage:
  - Documentation: Review by 3+ team members
  - Validation: Test all code examples work correctly

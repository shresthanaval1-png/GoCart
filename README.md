[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22306481&assignment_repo_type=AssignmentRepo)
# Project Name: [Insert Project Name Here]
### Team ID: [e.g., Group-05]

## 🏢 Corporate Simulation Guidelines
**Approved by:** Prof. Anushrav Mudgal
**Objective:** To develop a production-grade software solution using industry-standard DevOps and Agile methodologies.

---

## 👥 The Team
| Role | Name | GitHub Username | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Team Lead** | [Name] | [@user] | Architecture & Merge Approvals |
| **Developer** | [Name] | [@user] | Backend / API |
| **Developer** | [Name] | [@user] | Frontend / UI |
| **Developer** | [Name] | [@user] | Database & Testing |
| **DevOps** | [Name] | [@user] | CI/CD & Documentation |

---

## 🛠 Project Management (The "Top View")
We use **GitHub Projects** for task tracking.
* **The Golden Rule:** *If a task is not on the Board, it does not exist.*
* **Columns:**
    1.  **Backlog:** All intended features.
    2.  **Todo:** Tasks selected for the current sprint.
    3.  **In Progress:** Currently being coded.
    4.  **In Review:** PR is open and waiting for peer review.
    5.  **Done:** Merged into `main` and tested.

---

## ⚙️ Development Workflow (Git Flow)
We strictly follow **Branch Protection Rules**. Direct pushes to `main` are **FORBIDDEN**.

### 1. Branching Strategy
* `main`: Production-ready code. (Protected: No direct commits).
* `dev`: Integration branch. All features merge here first.
* `feature/feature-name`: Working branch for a specific task.
    * *Example:* `feature/login-page`, `fix/database-connection`

### 2. The Cycle
1.  **Pull** latest changes: `git pull origin main`
2.  **Create** a branch: `git checkout -b feature/my-new-feature`
3.  **Code** & Commit: `git commit -m "Added login validation logic"`
4.  **Push**: `git push origin feature/my-new-feature`
5.  **Open Pull Request (PR):**
    * Go to GitHub.
    * Open PR from `feature/...` to `main` (or `dev`).
    * **Review Requirement:** At least 1 other team member MUST review the code and approve it.
    * **Faculty Review:** Tag @[Your-GitHub-Username] for major architectural changes.

---

## 📝 Coding Standards
* **Commits:** Must be descriptive.
    * ❌ Bad: "Fixed stuff"
    * ✅ Good: "Refactored UserAuthService to handle JWT tokens"
* **Formatting:** Code must be indented and commented.
* **Cleanliness:** No commented-out dead code. No hardcoded passwords/API keys (Use `.env` files).

---

## 📊 Evaluation & Attendance
Grading is based on **Digital Footprint** in this repository.
1.  **Contributions:** The "Insights -> Contributors" graph will be used to verify individual effort.
2.  **Consistency:** Regular commits are required. Dumping code 1 day before the deadline results in a penalty.
3.  **Collaboration:** Evidence of Code Reviews (comments on PRs) counts towards the "Teamwork" grade.

---

## 🚀 Setup Instructions
1.  Clone the repo.
2.  Run `[command to install dependencies]` (e.g., `npm install` or `mvn clean install`).
3.  Configure `.env` file (see `.env.example`).
4.  Run the application: `[command to run app]`.

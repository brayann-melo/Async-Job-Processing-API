# Async Job Processing API (Email Worker)
This project simulates how real-world backends handle asynchronous tasks such as email delivery.

Instead of executing heavy operations during the request lifecycle, the API creates jobs and processes them in the background. This keeps the system responsive while allowing potentially unstable operations to be retried safely.

The goal of this project is to demonstrate how a simple job lifecycle with retries and status tracking can be implemented using NestJS.

--- 

## 🚀 Purpose

In production systems, operations like sending emails, generating reports or processing files should not block the request-response cycle.

Running them synchronously increases latency and reduces reliability.

This project explores a lightweight architecture that offloads these operations into background jobs while maintaining visibility over execution status and failures.

---

## 🧱 Architecture

The system follows a job-based flow: Client → API → Job Creation → Background Processing → Status Tracking

It is structured into four main layers:

---

### 1. Controller Layer

Handles HTTP requests.

Responsible for:

- Creating jobs
- Allowing job status tracking

Endpoints:
POST /jobs/email → creates a new email job
GET /jobs/:id → returns job status

---

### 2. Service Layer

Contains the core execution logic.

Responsible for:

- Creating jobs
- Controlling retry attempts
- Tracking execution time
- Updating job state
- Handling failures

This layer centralizes execution control and retry strategy.

--- ### 3. Processor Layer

Executes jobs outside the request lifecycle.

Example:

EmailProcessor → simulates email delivery

The controller delegates execution instead of performing the task directly.

---

### 4. Repository Layer

Acts as a persistence layer (in-memory).

Stores:

- job status
- retry attempts
- timestamps
- execution errors

In a production scenario, this would be replaced by a database or queue system.

---

## 🔁 Job Lifecycle

Each job follows this execution flow:

1. Job is created → status: pending
2. Processor starts execution → status: processing
3. Email sending is attempted
4. On success → status becomes completed
5. On failure:
- retries until max attempts
- final status becomes failed if limit is reached

--- ## 📊 Job States

| State | Meaning                 |
|-------------|----------------------|
| pending | Waiting for execution | 
| processing | Currently being executed |
| completed | Finished successfully |
| failed | Failed after max retries |


---

## 🧪 Example Usage

### Create Email Job

POST /jobs/email Body:

json
{
  "to": "user@email.com",
  "subject": "Hello",
  "body": "Test email"
}
Check Job Status

GET /jobs/{id}

⚙️ Retry Strategy

Each job:

has a max attempt limit of 3

retries automatically on failure

Failures are simulated to demonstrate retry behavior.

🧠 Concepts Demonstrated

This project showcases:

Background job execution

Retry logic

Async system design

Separation of concerns

Job lifecycle tracking

Service-oriented architecture

🛠 Tech Stack

NestJS

TypeScript

UUID

In-memory storage

📦 Possible Improvements

Future evolutions could include:

Redis-based queues

BullMQ integration

Persistent storage (PostgreSQL)

Exponential backoff retry

Observability / monitoring

👨‍💻 Author

Brayann Melo
Computer Science Student (6th Semester)
Backend & Data Engineering Focus

LinkedIn: https://linkedin.com/in/brayann-melo-4140b2341

GitHub: https://github.com/brayann-melo

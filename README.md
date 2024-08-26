# reactivities_v2

*Reactivities is a social media web application that is centered around events, as each user can create and account and have the possibility of creating or attending an event.
The application is made using .NET 8 (backend) + React 18 (frontend). Other used technologies are listed below:*

**Architecture Used:** Clean Architecture
**Design Patterns Used:** CQRS + Mediator Pattern

### Backend Technologies:
  - ASP.NET Core Identity
  - Entity Framework Core
  - AutoMapper
  - FluentValidation
  - MediatR
  - Cloudinary
  - SignalR
  - Microsoft SQL Server
 
### Frontend Technologies:
  - Vite
  - React
  - React Router
  - MobX
  - Semantic UI
  - Axios
  - Formik
  - SignalR
  - Yup
  - date-fns
  - React Calendar
  - React Datepicker

## Steps to run the application
### DB Configuration
Since the SQL Server database is locally hosted via Docker for development, there is a **docker-compose.yml** file included for that.
Open the solution folder in the termminal and run the *docker compose up -d* command.

### Backend Setup
Since the application is a simple monolith, there are no extra necessary steps in order to run the application.
Open the solution file in one of your preffered IDEs (Visual Studio 2022, Rider, etc.), build the application and run it as it is.

### Frontend Setup
In order to run the react application, follow the next steps:
Open the client-app folder inside one of your favorite code editors or IDEs (VS Code, WebStorm, etc.)
In the integrated terminal, run the following commands:
- npm install
- npm run dev
The frontend application can be later on accessed on localhost:3000.

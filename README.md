Ì≥ö Bookshelf App (FECapstoneProject)

A full-stack Bookshelf application built with a decoupled frontend (React) and backend (C#/.NET). The project manages books in a tile-based UI, supports pagination, and lays the foundation for authentication, authorization, and user book history.

Ì¥ó GitHub Repository: edwardalx/FECapstoneProject

‚úÖ Work Completed

Backend

Implemented pagination API to return books in chunks of 10.

Decoupled BE from FE for scalability.

Frontend

Built Tile component to display books in grid format.

Integrated API fetch helper for clean data fetching.

‚ÄúMy Bookshelf‚Äù view now shows first 10 books with Next / Previous navigation.

Setup

VS Code C# environment configured.

React frontend connected to backend APIs.

Ì≥å Backlog / Roadmap
Task 2

Implement Authentication & Authorization.

Add a User table in the backend (fields: username, password, email, isAdmin, booksRead[], isRead).

Create Registration & Login functions on the frontend.

Task 3

Restrict Add Book button visibility to admins only.

Task 4

Users should be able to access:

Book history

Books read history

Ì≤° Suggestions / Enhancements

External API Integration: Consider integrating the Open Library API for real-world book data (covers, authors, publishers, ISBN).

Search Functionality: Add a search bar to filter books by title, author, or keywords.

Responsive UI: Use TailwindCSS (or similar) for clean, responsive design.

Error Handling: Show user-friendly messages for network errors or empty results.

Stretch Goals:

User reading list & progress tracking.

Reviews and ratings per book.

Dark mode support.

Deployment on Netlify/Vercel (frontend) and Azure/Heroku (backend).

ÌøóÔ∏è Tech Stack

Frontend: React, JavaScript (Tiles UI, API integration).

Backend: C# / .NET (Pagination, Authentication, Data storage).

Styling: TailwindCSS (planned).

Deployment: Netlify / Vercel (planned for FE), Azure / Render (planned for BE).

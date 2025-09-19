# Overview

JobSearch Pro is a React-based web application that helps users search for jobs across 44+ job platforms using advanced Google search integration. The application provides an intelligent filtering system with multi-site search capabilities, allowing users to search across major job boards simultaneously with customizable location, timeline, and remote work filters.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript in a single-page application (SPA) architecture
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Hook Form for form state with Zod schema validation
- **Data Fetching**: TanStack React Query for server state management and caching
- **Animations**: Framer Motion for smooth UI transitions and interactions

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **Development**: Hot module replacement with Vite middleware integration
- **Database Migrations**: Drizzle Kit for schema management and migrations

## Core Features
- **Job Search Interface**: Advanced form with job title, site selection, location filters, remote work options, timeline filtering, and regional preferences
- **Multi-Platform Search**: Supports 44+ job platforms including major ATS providers (Workday, Greenhouse, Lever, etc.) and job boards
- **Google Search Integration**: Builds optimized Google search URLs with site operators, location parameters, and timeline filters
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interactions

## Data Models
- **User Schema**: Basic user management with username/password authentication stored in PostgreSQL
- **Search Parameters**: Form validation schemas for job search criteria including site selection, location filtering, and timeline preferences
- **Job Sites Configuration**: Hardcoded list of 44+ supported job platforms and ATS providers

## Development Architecture
- **Monorepo Structure**: Shared TypeScript schemas between client and server
- **Path Aliases**: Organized imports with @ aliases for components, utils, and shared code
- **Error Handling**: Centralized error boundaries with development-friendly error overlays
- **Code Quality**: TypeScript strict mode with comprehensive type checking

# External Dependencies

## Database & Storage
- **PostgreSQL**: Primary database with Neon serverless PostgreSQL provider
- **Drizzle ORM**: Type-safe database access with PostgreSQL dialect
- **Session Storage**: PostgreSQL-backed session management

## UI & Design System
- **Shadcn/ui**: Complete component library with 40+ pre-built components
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Consistent icon system with 1000+ SVG icons
- **Framer Motion**: Production-ready motion library for React

## Development Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **TypeScript**: Strong typing throughout the application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Hookform/Resolvers**: Integration between React Hook Form and Zod

## Search Integration
- **Google Search API**: Custom URL building for advanced job search queries
- **Site Operators**: Advanced Google search syntax for multi-platform queries
- **Location & Timeline Filtering**: Geographic and temporal search refinement
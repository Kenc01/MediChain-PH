# MediChain-PH

## Overview

MediChain-PH is a decentralized healthcare records management platform designed for the Philippines. The application enables patients to own and control their medical data through blockchain technology, specifically using NFT-based medical records. The platform connects patients, doctors, and hospitals in a secure, privacy-focused ecosystem where medical records are portable, verifiable, and accessible in emergency situations.

The system supports three primary user roles: patients who manage their health data, doctors who access patient records with permission, and hospitals that integrate with the platform to issue and verify medical records. A unique emergency access feature allows first responders to access critical patient information during life-threatening situations through a time-limited access mechanism.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: The frontend is built with React 18+ using TypeScript, with Vite as the build tool and development server. The application uses a Single Page Application (SPA) architecture with client-side routing via React Router.

**UI Framework**: The interface is built with shadcn/ui components based on Radix UI primitives, styled with Tailwind CSS. The design system uses CSS variables for theming and supports a "new-york" style variant. All components are located in `client/src/components/ui/` with additional custom components in role-specific directories (patient, doctor, hospital, common, layout).

**State Management**: The application uses TanStack Query (React Query) for server state management, API caching, and data synchronization. Client-side state is managed through React hooks and context.

**Routing Structure**: The app implements role-based routing with separate portals for patients (`/patient/*`), doctors (`/doctor/*`), and hospitals (`/hospital/*`). Each portal has its own dashboard, sidebar navigation, and nested routes for specific functionality. A shared emergency access route (`/emergency`) is available to all users.

**Offline Support**: The application includes offline caching capabilities for critical patient data using localStorage. The `offlineCache.ts` utility provides a 24-hour cache expiry mechanism, allowing emergency access to patient records even without network connectivity. Online/offline status is tracked throughout the application with visual indicators.

**Mobile-First Design**: The application is responsive with dedicated mobile components including a bottom navigation bar (`BottomNav.tsx`) that replaces the desktop navigation on smaller screens, and a floating emergency access button (`EmergencyFAB.tsx`). Touch targets are optimized for mobile interactions.

### Backend Architecture

**Framework**: The backend uses Express.js with TypeScript running on Node.js. The server is configured for both development (with Vite middleware) and production modes.

**API Structure**: RESTful API endpoints are defined in `server/routes.ts`. Current endpoints include:
- `GET /api/patient/:nftId` - Retrieve patient record by NFT ID
- `POST /api/emergency-access/log` - Create emergency access log
- `GET /api/emergency-access/active/:patientRecordId` - Check active emergency access

**Middleware Configuration**: The server uses express.json() for JSON parsing with raw body preservation for potential webhook verification, and express.urlencoded() for form data. Custom logging middleware tracks request duration and provides formatted timestamps.

**Static File Serving**: In production, the backend serves the pre-built Vite frontend from the `dist/public` directory with fallback to `index.html` for client-side routing.

**Development Setup**: The development environment uses Vite's middleware mode with HMR over the HTTP server. Replit-specific plugins provide runtime error overlays, cartographer mapping, and development banners.

### Data Storage

**Database**: The application uses PostgreSQL with Drizzle ORM for type-safe database access. The database URL is configured via environment variable `DATABASE_URL`.

**Schema Design**: Three main tables are defined in `shared/schema.ts`:

1. **users**: Basic user authentication with username/password
   - Uses UUID primary keys
   - Unique username constraint

2. **patient_records**: Core medical data storage
   - Links to blockchain via `nft_id` (unique)
   - Stores patient demographics (name, blood type)
   - Uses PostgreSQL arrays for allergies and medications
   - Uses JSONB for structured data (emergency contacts, medical records, hospital history)
   - Includes doctor notes as text array

3. **emergency_access_logs**: Audit trail for emergency access
   - References patient_records
   - Tracks who accessed, when, and expiration time
   - Optional blockchain transaction hash for verification
   - Stores IP address for security

**Data Validation**: Drizzle-zod integration provides runtime validation through Zod schemas derived from database schema definitions.

**In-Memory Storage**: During development, a `MemStorage` class provides in-memory data storage with mock seed data for testing purposes. This implements the `IStorage` interface which can be swapped with a production database implementation.

### Authentication and Authorization

**Current Implementation**: Basic user authentication structure is in place with username/password credentials stored in the users table. Login and registration UI components exist but are not yet connected to a full authentication flow.

**Planned Enhancement**: The authentication system is designed to integrate with Web3 wallet-based authentication (MetaMask/WalletConnect) as indicated by the `blockchain.ts` utility and wallet connection references throughout the UI.

**Access Control**: Role-based access is implemented at the UI level with separate portals for patients, doctors, and hospitals. Each role has distinct permissions and data access patterns. Emergency access uses a time-based expiration model with audit logging.

### External Dependencies

**Blockchain Integration**: The application is designed to integrate with Ethereum-compatible blockchains for NFT-based medical records:
- **ethers.js**: Web3 library for wallet connections and smart contract interactions
- **Contract Addresses**: Placeholder addresses in `client/src/contracts/addresses.ts` for PatientRecord and DataMarketplace contracts
- **Wallet Connection**: MetaMask integration for wallet authentication via window.ethereum

**UI Component Library**:
- **Radix UI**: Comprehensive collection of accessible, unstyled React components (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling
- **Framer Motion**: Animation library for enhanced UX

**Form Handling**:
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Validation resolver for Zod schemas
- **Zod**: Schema validation for form inputs and API requests

**Data Fetching**: TanStack Query v5 for server state management, caching, and synchronization

**QR Code Functionality**: html5-qrcode library for scanning patient QR codes in emergency situations

**Date Utilities**: date-fns for date manipulation and formatting

**Development Tools**:
- **Replit Plugins**: Development environment enhancements (runtime error modal, cartographer, dev banner)
- **ESBuild**: Production bundling for server code with selective dependency bundling
- **Drizzle Kit**: Database migrations and schema management

**Session Management**: 
- **express-session**: Session middleware (referenced in dependencies)
- **connect-pg-simple**: PostgreSQL session store for production deployments

**File Upload**: Multer middleware for handling file uploads (likely for medical document attachments)

**API Communication**: Axios for HTTP requests from the frontend

**Type Safety**: The application maintains full type safety between frontend and backend through shared TypeScript types defined in the `shared/` directory, accessible via the `@shared/*` path alias.
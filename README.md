# GlobeGuru Holidays

Next.js travel website with MongoDB content management and a protected admin workspace at `/admin`.

## Local setup

Install dependencies with `npm install`. Configure `.env.local` using `.env.example`, then run:

```bash
npm run db:setup
npm run dev
```

Database setup creates indexes and imports existing packages, destinations and blogs on the first run. Later runs preserve content edits and the existing admin password. Initial login details for this workspace are in `.admin-credentials.local`; this file and `.env.local` are ignored by Git.

For a fresh installation, `npm run admin:password` generates a password and its scrypt hash. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` before database setup. Admins can change their password under Settings. Password changes revoke all sessions.

## Content and reviews

Packages, destinations and blogs support adding, editing, publishing, ordering and deleting. MongoDB changes appear on public pages without rebuilding. Image fields accept paths to assets in `public/` or HTTPS images from `images.unsplash.com`.

Travelers can submit reviews with 1-5 star ratings from the home page or `/Reviews`, linked from the Contact page and footer. The Reviews page shows the average rating and paginated approved reviews. Reviews stay pending until approved. Admins can add, approve, hide or delete reviews. Reviewer emails are visible only to admins.

Sessions use an HTTP-only cookie and MongoDB records with eight-hour expiry. Every admin endpoint checks authentication. Mutations check request origin. TTL indexes remove expired sessions and rate-limit records.

## Contact options

The Contact page offers direct phone, email and WhatsApp links, plus a link to write a review. It does not have an enquiry form or a server email-sending integration.

## Validation and deployment

```bash
npm test
npm run lint
npm run build
npm start
```

Set the server environment variables on your hosting provider and allow that server in Atlas network access. Run database setup once for a new database. Use HTTPS in production for secure session cookies. Never use browser-prefixed variables for these credentials.

Implementation references: [MongoDB connection pools](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/connection-pools/) and [Next.js server cookies](https://nextjs.org/docs/app/api-reference/functions/cookies).

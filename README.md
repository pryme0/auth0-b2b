# SaaStart: B2B SaaS Starter with Auth0 by Okta

A streamlined starting point for building secure and scalable B2B SaaS web applications using Auth0.

---

## Quick Navigation

- [Target Use Case](#target-use-case)
- [Getting Started](#getting-started)
- [B2B Identity Features](#b2b-identity-features)
- [Learn More](#learn-more)

---

## Target Use Case

This starter project is designed to:

- Enable multi-tenancy with a shared user database.
- Support sign-up with organization creation.
- Provide user management, roles, and RBAC features.
- Offer Single Sign-On (SSO) via OIDC and SAML integrations.
- Configure MFA and other security policies.

---

## Getting Started

### Prerequisites

1. **Node.js v20+**: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.
2. **Auth0 Account**: Sign up at [auth0.com/signup](https://auth0.com/signup).
3. **Auth0 Tenant**: Create a new tenant to avoid conflicts with existing configurations.

### Step 1: Clone the Repository

```bash
git clone https://github.com/auth0-developer-hub/auth0-b2b-saas-starter.git
cd auth0-b2b-saas-starter
npm install
```

### Step 2: Set Up Your Auth0 Tenant

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com/).
2. Create an **Application**:
   - Navigate to **Applications > Applications > Create Application**.
   - Choose **Regular Web Application** and note the `Client ID` and `Client Secret`.

3. Configure the **API**:
   - Navigate to **Applications > APIs > Create API**.
   - Enter a name and identifier (e.g., `https://api.example.com`).

4. Set up **Organizations**:
   - Go to **Manage > Organizations > Create Organization**.
   - Configure organization settings and enable it for your application.

5. Set up **Connections**:
   - Navigate to **Authentication > Database > Create Connection**.
   - Enable the connection for your application.

6. Enable **Roles and Permissions**:
   - Go to **Authorization > Roles** and create roles (e.g., `Admin`, `User`).
   - Assign roles to users under **User Management**.

7. Configure **Environment Variables**:
   - Create a `.env.local` file in the project root with the following keys:

     ```
     AUTH0_DOMAIN=your-auth0-domain
     AUTH0_CLIENT_ID=your-client-id
     AUTH0_CLIENT_SECRET=your-client-secret
     AUTH0_API_IDENTIFIER=your-api-identifier
     NEXTAUTH_URL=http://localhost:3000
     ```

### Step 3: Run the Application

Start the development server:

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## B2B Identity Features

### Organization Management

- Create and manage organizations directly from the app.
- Invite users and assign roles.

### Single Sign-On (SSO)

- Enable SSO with external identity providers using OIDC or SAML.
- Configure SSO connections via the Auth0 dashboard.

### Security Policies

- Enforce MFA and configure session lifetimes.
- Manage user profiles, passwords, and MFA enrollments.

---

## Learn More

Explore additional resources:

- [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations/organizations-overview)
- [Customizing Auth0](https://auth0.com/docs/customize)

For questions or feedback, visit the [Auth0 Community](https://community.auth0.com).

# Security Specification: Aura Executive AI

## Data Invariants
1. A Dashboard must belong to an Organization.
2. A User can only access Dashboards and Analytics if they are members of the same Organization.
3. AI Insights must be linked to a valid Dashboard.
4. User profiles are restricted to the owner for write operations.

## The Dirty Dozen Payloads (Conceptual)
1. **Org Spoofing**: Attempting to create a dashboard for an organization the user doesn't belong to.
2. **Ghost Admin**: Attempting to update `role` in user profile to 'admin'.
3. **Data Poisoning**: Injecting 1MB strings into chart label fields.
4. **Cross-Tenant Read**: Trying to read analytics of another organization.
5. **Orphaned Write**: Creating insights for a non-existent dashboard.
6. **Immutable Tampering**: Changing `orgId` on an existing dashboard.
7. **Bypass Master Gate**: Reading subcollection `analytics` without access to parent `dashboard`.
8. **Invalid State**: Setting dashboard type to a non-existent category like 'hacker_data'.
9. **Timestamp Spoofing**: Setting `createdAt` to a future date from the client.
10. **Shadow Field**: Adding `isVerified: true` to a user profile update.
11. **Query Scraping**: Listing all dashboards without organization filtering.
12. **PII Leak**: Non-owner trying to 'get' a user profile.

## Verification
I will implement `firestore.rules` that enforce:
- `isSignedIn()`
- `isValidOrgMember()`
- `isValid[Entity]()` checks for all writes.
- `affectedKeys().hasOnly()` for updates.

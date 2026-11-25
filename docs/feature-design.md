# Home Services Platform (Urban Company–style): Design

Status: draft for approval. Items marked **(my call)** are proposals, open to change.

## Intent and why

HALO Studio sells ready-built, white-label platforms to founders (Bingo for ride hailing, Coworking Space for coworking operators). This is the next one: a platform for founders who want to launch a home and personal services business, in the style of Urban Company. It is sold to the founder, branded as theirs, and launched by HALO.

The plan comes first. A clickable demo of all apps, a halostudio.in case page and ads follow later, the same way Coworking Space was done. The demo is **not** part of this document's build.

## Market basis (research, Nov 2026)

- **Booked services** (Urban Company core): fixed-price services in categories such as salon at home, spa, cleaning, AC and appliance repair, electrician, plumbing, carpentry, painting, pest control. Independent professionals use a partner app; the platform takes a commission.
- **Instant help** (Urban Company InstaHelp, Snabbit, Pronto): housekeeping (cleaning, dishes, laundry, cooking help) within 10–15 minutes. Workers sit in dense micro-markets and are paid per shift or on contract, not per job. InstaHelp passed 1M monthly bookings (Mar 2026) and 100k in a day (Aug 2026); Snabbit reports ~1.5M jobs a month (Jun 2026).
- Instant help is expensive to run: InstaHelp moved Urban Company from profit (FY25) to loss (FY26). Press expects it to stay in India's top 10–15 cities.
- The moat in this category is operations (training, standard kits, quality scores, rework guarantees), not the app. The platform must give founders tools for these, or it is just a booking app.

## Goals

1. A complete, sellable platform plan: every feature and function a founder needs to run booked home and personal services in one or more cities.
2. Instant help as an add-on module a founder switches on per city.
3. Configurable enough that different founders (categories, worker models, prices, brand) use the same product without custom code.
4. A plan concrete enough to build a clickable demo from next, then the real product.

## Non-goals

- Building the demo now.
- A multi-tenant SaaS (one server for many founders). Rejected below.
- Marketplace for multiple vendor companies under one founder (agencies reselling) in v1 **(my call)**; listed as a later module.
- Hardware, IoT or smart-home integrations.

## Anti-goals

- A generic booking app with no quality or professional-management tools.
- Instant help on by default, pushing founders into the most expensive model before they have demand.
- Code HALO doesn't control (clone scripts).

## Constraints

- One install per founder (decided). Each founder owns their server, database, domain and store listings.
- India first: rupee pricing, GST invoices, Indian payment gateways, SMS with DLT registration, Aadhaar/PAN-style KYC for professionals.
- Must fit HALO's delivery model: Sprint (branded pilot), Build (full launch), Orbit (monthly care).

## Approaches considered

1. **One install per founder (chosen).** One codebase; each founder gets their own deployment and branded apps. Matches how Bingo and Coworking Space are delivered, fits one-off pricing, founders own data and apps. Cost: each install is hosted and updated separately, covered by Orbit.
2. **One shared platform (SaaS).** One backend, many founders. Cheaper at scale and one update reaches all, but more upfront work on data isolation, founders don't own their stack, and it doesn't match one-off pricing. Rejected.
3. **Reskinned clone script.** Cheap, but code HALO can't vouch for. Dropped (anti-goal).

## Decided how

- Four surfaces: Customer app, Professional app, Admin console, Instant add-on (inside the same apps, switched on per city).
- Separate install per founder, branded per founder.
- **(my call)** Flutter for customer and professional apps (same as Bingo), web admin console, one backend API. Builder may revise.

---

## 1. Customer app

### Onboarding and account
- Phone number sign-in with OTP; optional email.
- Saved addresses with map pin, house/flat, landmark, address type (home, office, other).
- Location detection; city/zone check ("we're not in your area yet" with a notify-me list).
- Profile: name, gender preference for professional (where the category allows), language.

### Discovery
- Home: city-specific categories, banners, offers, recently booked, "book again".
- Category pages with sub-categories (e.g. Salon for women → waxing, facials, manicure).
- Service cards: fixed price, duration, what's included and excluded, photos, rating, number of bookings.
- Add-ons and packages ("build your package": pick items, price updates live).
- Search across services.
- Service detail: process steps, products used, FAQs, reviews with photos.

### Cart and booking
- Cart across services in the same category; minimum order value per category.
- Slot picker: date and time slots from real professional availability in that zone; surge or peak pricing flags **(configurable)**.
- Price breakdown: item total, visit fee, taxes, discounts, tip, total.
- Coupons, wallet credits, membership discounts applied automatically.
- Special instructions and photos of the problem (for repair categories).
- Inspection-first categories (repairs): book a visit at an inspection fee; the professional adds a quote in the app; customer approves before work starts.

### Payment
- Pay now (UPI, cards, net banking, wallets) or pay after service (cash or online).
- Invoices with GST, downloadable.
- Refunds to source or wallet.

### During the job
- Assigned professional: name, photo, rating, jobs done, verified badge, vaccination/hygiene badges if configured.
- Live status: assigned, on the way (live map and ETA), arrived, started, completed.
- Start-job OTP the customer shares on arrival.
- Call and chat with the professional through masked numbers.
- Reschedule or cancel with the founder's cancellation policy and fee rules.
- SOS / safety button for both sides.

### After the job
- Rating (overall plus aspects such as punctuality, quality, behaviour), review with photos, tip.
- Warranty / rework claim within the category's warranty window (e.g. 7 or 30 days); creates a rework job at no cost.
- Complaint flow with categories, photos and status tracking.
- Booking history with "book again" and invoice download.

### Retention
- Membership plan (like UC Plus): paid plan with a discount percentage and benefits, configurable price and term.
- Referral: invite code, rewards to both sides.
- Wallet credits and cashback.
- Push, SMS and WhatsApp notifications; reminders for recurring needs (e.g. AC service every 6 months).
- Favourite professional: request a past professional for the next booking, subject to availability.

### Instant add-on (customer side, when switched on)
- "Help in 15 minutes" entry on home with the live ETA for the customer's micro-market.
- Book by time block (e.g. 1 hour, 2 hours) and task checklist (cleaning, dishes, laundry, cooking prep).
- Instant assignment, live tracking, extend time from the app.
- Clear message when no one is free nearby, with a fallback to the next booked slot.

## 2. Professional app

### Onboarding
- Sign-up with phone OTP, city, categories and skills.
- KYC: identity and address documents, selfie match, bank account, PAN; police verification status **(configurable)**.
- Skill assessment: in-app quiz plus a practical test booked at a training centre or by video.
- Training modules: videos, quizzes, certification per service; must pass before that service is unlocked.
- Agreement acceptance and onboarding fee or kit deposit **(configurable)**.

### Work
- Online/offline toggle; working hours and service area (zones).
- Job alerts with price, distance, duration, customer rating, and an accept window (countdown); auto-decline on timeout.
- Accepted jobs list and calendar; leave/day-off requests.
- Navigation to the customer; arrived, start (enter customer OTP), complete.
- Checklist per service; before and after photos; add-on upsell with customer approval in-app.
- Quote builder for inspection-first jobs (parts and labour).
- Collect cash and mark payment; or customer pays online.
- Call/chat with the customer through masked numbers; SOS.

### Earnings and money
- Earnings by day/week, per job, tips, incentives and penalties shown separately.
- Commission and fee breakdown per job.
- Payouts schedule and history; cash-in-hand ledger (cash collected minus amount owed to the platform).
- Incentives: weekly targets, peak-hour bonuses, rating bonuses.

### Kits and products
- Store for standard kits and consumables (oils, chemicals, tools) at founder-set prices.
- Order, pay from earnings or online, delivery or pickup at a hub.
- Stock usage per job for product-based services **(configurable)**.

### Quality and growth
- Ratings, rating trend and feedback.
- Quality score with clear rules: rework rate, cancellations, punctuality, complaints.
- Warnings, suspension notices, appeal flow.
- Refresher training assigned automatically when the score drops.
- Tier levels (e.g. Silver/Gold/Platinum) with better job priority **(configurable)**.

### Instant add-on (professional side)
- Shift booking: choose shifts in a micro-market; check in/out with location.
- Auto-assigned jobs during the shift; no accept/decline window **(configurable)**.
- Pay per shift or per hour, plus incentives.
- Break timer and idle-time tracking.

## 3. Admin console (web)

### Setup and configuration
- Brand: name, logo, colours, app store assets, support contacts, policies.
- Cities and zones: draw zones on a map; set which categories run in each zone.
- Service catalogue: categories, sub-categories, services, add-ons, packages, durations, prices per city, images, inclusions/exclusions, FAQs.
- Pricing rules: visit fees, minimum order values, peak/surge rules, inspection fees, cancellation and reschedule fees.
- Taxes: GST rates per service; invoice templates.
- Worker model per category: independent partners on commission, or the founder's own staff on salary **(configurable)**.
- Commission rules: percentage or flat, per category or per professional tier.
- Warranty windows per category.

### Supply (professionals)
- Applicant pipeline: applied → KYC → assessment → training → active, with reviewer actions.
- Professional profiles: documents, skills, zones, ratings, quality score, earnings, history.
- Training content management: upload videos, quizzes, certification rules.
- Shift and availability views; capacity per zone per slot.
- Suspend, reactivate, change tier; bulk messages.

### Demand and operations
- Live board: today's bookings by status, unassigned jobs, late arrivals, ongoing jobs on a map.
- Matching and dispatch rules: nearest, best rated, fewest jobs today, favourite professional, gender preference; manual reassign.
- Booking detail: timeline, call recording metadata (if enabled), notes, refunds, rework creation.
- Complaints and rework queue with SLAs.
- Customer profiles, wallet adjustments, blocklist.

### Money
- Payment reconciliation by gateway.
- Professional payouts: calculation, approval, batch payout, cash-in-hand settlement.
- Refunds and wallet credits.
- Kit store orders and inventory per hub.
- Membership plan management and revenue.

### Growth
- Coupons and offers (by city, category, new users, first order).
- Banners and home layout per city.
- Referral programme settings.
- Push, SMS, WhatsApp campaigns to segments.

### Reports
- Bookings, GMV, take rate, cancellations, repeat rate by city, category and period.
- Professional utilisation, earnings, quality, churn.
- Funnel: app open → search → cart → booked → completed.
- Exports to CSV.

### Access
- Roles: super admin, city manager, operations, finance, support, trainer **(my call: 6 roles)**.
- Audit log of every change.

### Instant add-on (admin side)
- Switch on per city; draw micro-markets.
- Shift planner: required workers per micro-market per hour; fill rate.
- Live supply map: idle, busy, on break.
- Auto-assignment settings (max distance, target ETA).
- Shift pay rules and attendance.
- Unit economics view: cost per shift vs revenue per shift per micro-market.

## 4. Booking lifecycle (shared states)

`requested → (inspection_quoted → quote_approved) → assigned → en_route → arrived → started → completed → rated`, with side branches `rescheduled`, `cancelled_by_customer`, `cancelled_by_professional`, `reassigned`, `no_show`, `rework_requested → rework_completed`, `complaint_open → complaint_resolved`.

Instant jobs use the same states without the slot and quote steps.

## 5. Integrations (India first)

- Payment gateway with UPI, cards, net banking, wallets; payouts API for professionals **(provider left to builder)**.
- SMS with DLT registration; WhatsApp Business API for notifications.
- Maps and routing; geofencing for zones.
- Push notifications.
- Masked calling.
- KYC verification APIs.
- Crash reporting and analytics.

## 6. Data model (main entities)

City, Zone, MicroMarket; Category, Service, AddOn, Package, PriceRule; Customer, Address, Wallet, Membership; Professional, Document, Skill, Training, Certification, QualityScore, Tier; Booking, BookingItem, Slot, Assignment, Quote, Payment, Invoice, Refund; Rating, Complaint, Rework; Payout, CashLedger; KitProduct, KitOrder, Hub; Shift, ShiftAttendance (instant); Coupon, Referral, Campaign; AdminUser, Role, AuditLog.

## 7. Release plan for founders

- **Sprint (branded pilot):** one city, a few categories, test server. In: catalogue, slot booking, automatic assignment, online and cash payment with the gateway split, KYC via provider, basic training gate, earnings and cash ledger, ratings, complaints and rework. Out (move to Build): coupons, membership, referrals, kit store, campaigns, full quality-score rules.
- **Build (full launch):** everything in sections 1–3 except the instant add-on; production server, store listings, integrations.
- **Instant add-on:** separate module, switched on per city once a founder has demand.

## 8. Decided after builder check (by the founder-facing owner)

- **Money flow:** the founder is merchant of record. Customers pay into the founder's own payment gateway account; the gateway's marketplace split (e.g. Razorpay Route) settles each professional's share automatically and keeps the founder's commission. The founder issues the customer GST invoice; professionals receive a commission statement. HALO never holds funds. Cash jobs go through the cash-in-hand ledger and are netted against payouts.
- **Salaried staff:** in v1, "own staff on salary" means no commission is deducted; monthly pay is recorded but paid through the founder's own payroll. Full payroll (PF/ESI, TDS, attendance-based pay) is a later add-on. Instant add-on shift pay follows the same rule: shifts and amounts are recorded and exported, not run as payroll.
- **Sprint scope:** as listed in section 7.

## 9. Builder-check decisions (my calls)

- **Codebase:** one shared codebase for all founders. Differences live in configuration (brand, cities, catalogue, rules) and feature flags, not forks. Orbit updates ship to every install from the same release.
- **Platforms:** Android and iOS for both apps from day one (Flutter makes the cost small). A lightweight web booking page (catalogue and booking only) is a later module, not v1.
- **KYC:** integrate a KYC provider for ID, PAN, bank and selfie match. Admin gets a review queue for manual checks, police verification status and the practical-test result. No in-house document verification.
- **Quality score:** configurable rules with thresholds per founder. Warnings and refresher-training assignment are automatic. Suspension and tier changes are proposed automatically but need an admin to approve.
- **Rework cost:** a per-category rule the founder sets. Default: the original professional does the rework unpaid when the fault is theirs; the founder absorbs it otherwise, decided by support when closing the complaint.

## What's left to the builder

- Backend language and database; payment, SMS, maps and KYC providers.
- Exact matching algorithm weights.
- Notification copy and templates.
- Demo scope selection (which screens) when the demo is planned.

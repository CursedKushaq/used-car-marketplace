import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  smallint,
  serial,
  boolean,
  timestamp,
  decimal,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ─── Enums ──────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", [
  "buyer",
  "seller",
  "dealer_staff",
  "moderator",
  "admin",
]);

export const dealerVerifiedStatusEnum = pgEnum("dealer_verified_status", [
  "unverified",
  "pending",
  "verified",
  "suspended",
]);

export const dealerMemberRoleEnum = pgEnum("dealer_member_role", [
  "owner",
  "manager",
  "staff",
]);

export const bodyTypeEnum = pgEnum("body_type", [
  "hatchback",
  "sedan",
  "suv",
  "mpv",
  "coupe",
  "convertible",
  "pickup",
  "van",
]);

export const fuelTypeEnum = pgEnum("fuel_type", [
  "petrol",
  "diesel",
  "cng",
  "electric",
  "hybrid",
]);

export const transmissionEnum = pgEnum("transmission", [
  "manual",
  "automatic",
]);

export const accidentHistoryEnum = pgEnum("accident_history", [
  "none",
  "minor",
  "major",
  "unknown",
]);

export const serviceHistoryEnum = pgEnum("service_history", [
  "full",
  "partial",
  "none",
  "unknown",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "pending_review",
  "live",
  "changes_requested",
  "sold",
  "expired",
  "removed",
]);

export const mediaKindEnum = pgEnum("media_kind", ["photo", "video"]);

export const mediaStatusEnum = pgEnum("media_status", [
  "uploading",
  "processing",
  "ready",
  "failed",
]);

export const checkItemEnum = pgEnum("check_item", [
  "identity",
  "ownership",
  "insurance",
  "odometer",
  "inspection",
]);

export const checkLevelEnum = pgEnum("check_level", [
  "declared",
  "document_seen",
  "partner_checked",
]);

export const inspectionStatusEnum = pgEnum("inspection_status", [
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
]);

export const inspectionItemRatingEnum = pgEnum("inspection_item_rating", [
  "good",
  "fair",
  "poor",
  "needs_repair",
  "replaced",
]);

export const priceRatingEnum = pgEnum("price_rating", [
  "great_price",
  "good_price",
  "fair_price",
  "above_market",
  "overpriced",
]);

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "new",
  "contacted",
  "visit",
  "negotiating",
  "won",
  "lost",
  "spam",
]);

export const leadEventTypeEnum = pgEnum("lead_event_type", [
  "created",
  "status_changed",
  "note_added",
  "call_logged",
  "visit_scheduled",
  "offer_made",
  "closed",
]);

export const consentPurposeEnum = pgEnum("consent_purpose", [
  "marketing_sms",
  "marketing_email",
  "marketing_push",
  "data_processing",
  "analytics",
  "third_party_sharing",
]);

export const consentChannelEnum = pgEnum("consent_channel", [
  "web",
  "app",
  "sms",
  "phone",
]);

export const reportReasonEnum = pgEnum("report_reason", [
  "fake_listing",
  "wrong_info",
  "scam",
  "duplicate",
  "offensive",
  "other",
]);

export const reportStatusEnum = pgEnum("report_status", [
  "pending",
  "under_review",
  "resolved",
  "dismissed",
]);

export const moderationActionTypeEnum = pgEnum("moderation_action_type", [
  "listing_approved",
  "listing_rejected",
  "listing_removed",
  "listing_restored",
  "user_warned",
  "user_suspended",
  "user_banned",
  "dealer_verified",
  "dealer_suspended",
  "report_resolved",
  "report_dismissed",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "create",
  "update",
  "delete",
  "login",
  "logout",
  "status_change",
  "moderation",
  "export",
]);

// ─── Tables ─────────────────────────────────────────────────────────

// Users
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    phoneE164: varchar("phone_e164", { length: 20 }).unique(),
    email: varchar("email", { length: 255 }).unique(),
    name: varchar("name", { length: 200 }),
    role: userRoleEnum("role").notNull().default("buyer"),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("users_phone_idx").on(t.phoneE164),
    uniqueIndex("users_email_idx").on(t.email),
  ]
);

// Dealers
export const dealers = pgTable(
  "dealers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).unique().notNull(),
    name: varchar("name", { length: 300 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    address: text("address"),
    verifiedStatus: dealerVerifiedStatusEnum("verified_status")
      .notNull()
      .default("unverified"),
    logoUrl: text("logo_url"),
    about: text("about"),
    hours: text("hours"),
    yearsActive: smallint("years_active"),
    responseTimeP50: integer("response_time_p50"),
    accuracyScore: decimal("accuracy_score", { precision: 3, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("dealers_slug_idx").on(t.slug),
    index("dealers_city_idx").on(t.city),
  ]
);

// Dealer Members (composite PK)
export const dealerMembers = pgTable(
  "dealer_members",
  {
    dealerId: uuid("dealer_id")
      .notNull()
      .references(() => dealers.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: dealerMemberRoleEnum("role").notNull().default("staff"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.dealerId, t.userId] })]
);

// Catalog: Makes
export const catalogMakes = pgTable(
  "catalog_makes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).unique().notNull(),
    logoUrl: text("logo_url"),
  },
  (t) => [uniqueIndex("catalog_makes_slug_idx").on(t.slug)]
);

// Catalog: Models
export const catalogModels = pgTable(
  "catalog_models",
  {
    id: serial("id").primaryKey(),
    makeId: integer("make_id")
      .notNull()
      .references(() => catalogMakes.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    bodyType: bodyTypeEnum("body_type").notNull(),
  },
  (t) => [
    index("catalog_models_make_idx").on(t.makeId),
    uniqueIndex("catalog_models_make_slug_idx").on(t.makeId, t.slug),
  ]
);

// Catalog: Variants
export const catalogVariants = pgTable(
  "catalog_variants",
  {
    id: serial("id").primaryKey(),
    modelId: integer("model_id")
      .notNull()
      .references(() => catalogModels.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 300 }).notNull(),
    fuel: fuelTypeEnum("fuel").notNull(),
    transmission: transmissionEnum("transmission").notNull(),
    engineCc: integer("engine_cc"),
    powerPs: integer("power_ps"),
    seats: smallint("seats"),
    fromYear: smallint("from_year"),
    toYear: smallint("to_year"),
  },
  (t) => [index("catalog_variants_model_idx").on(t.modelId)]
);

// Listings
export const listings = pgTable(
  "listings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 300 }).unique().notNull(),
    sellerUserId: uuid("seller_user_id")
      .notNull()
      .references(() => users.id),
    dealerId: uuid("dealer_id").references(() => dealers.id),
    variantId: integer("variant_id")
      .notNull()
      .references(() => catalogVariants.id),
    yearMfg: smallint("year_mfg").notNull(),
    yearReg: smallint("year_reg"),
    regState: varchar("reg_state", { length: 5 }),
    regNumberHash: varchar("reg_number_hash", { length: 64 }),
    owners: smallint("owners").notNull().default(1),
    odometerKm: integer("odometer_km").notNull(),
    priceInr: integer("price_inr").notNull(),
    negotiable: boolean("negotiable").notNull().default(true),
    city: varchar("city", { length: 100 }).notNull(),
    locality: varchar("locality", { length: 200 }),
    geoLat: decimal("geo_lat", { precision: 9, scale: 6 }),
    geoLng: decimal("geo_lng", { precision: 9, scale: 6 }),
    accidentHistory: accidentHistoryEnum("accident_history")
      .notNull()
      .default("unknown"),
    floodDamage: boolean("flood_damage").notNull().default(false),
    serviceHistory: serviceHistoryEnum("service_history")
      .notNull()
      .default("unknown"),
    description: text("description"),
    specs: jsonb("specs"),
    status: listingStatusEnum("status").notNull().default("draft"),
    listedAt: timestamp("listed_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("listings_status_city_price_idx").on(t.status, t.city, t.priceInr),
    index("listings_variant_idx").on(t.variantId),
    index("listings_listed_at_desc_idx").on(t.listedAt),
    index("listings_seller_idx").on(t.sellerUserId),
    index("listings_dealer_idx").on(t.dealerId),
    index("listings_live_idx")
      .on(t.city, t.priceInr, t.listedAt)
      .where(sql`status = 'live'`),
  ]
);

// Listing Media
export const listingMedia = pgTable(
  "listing_media",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    kind: mediaKindEnum("kind").notNull().default("photo"),
    angle: varchar("angle", { length: 50 }),
    storageKey: text("storage_key").notNull(),
    width: integer("width"),
    height: integer("height"),
    position: smallint("position").notNull().default(0),
    status: mediaStatusEnum("status").notNull().default("uploading"),
  },
  (t) => [index("listing_media_listing_idx").on(t.listingId, t.position)]
);

// Listing Checks
export const listingChecks = pgTable(
  "listing_checks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    item: checkItemEnum("item").notNull(),
    level: checkLevelEnum("level").notNull().default("declared"),
    source: varchar("source", { length: 200 }),
    evidenceRef: text("evidence_ref"),
    checkedAt: timestamp("checked_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("listing_checks_listing_idx").on(t.listingId)]
);

// Inspections
export const inspections = pgTable(
  "inspections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    inspectorUserId: uuid("inspector_user_id").references(() => users.id),
    status: inspectionStatusEnum("status").notNull().default("scheduled"),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    overallScore: decimal("overall_score", { precision: 4, scale: 2 }),
    summary: text("summary"),
    reportUrl: text("report_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("inspections_listing_idx").on(t.listingId)]
);

// Inspection Items
export const inspectionItems = pgTable(
  "inspection_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    inspectionId: uuid("inspection_id")
      .notNull()
      .references(() => inspections.id, { onDelete: "cascade" }),
    category: varchar("category", { length: 100 }).notNull(),
    component: varchar("component", { length: 200 }).notNull(),
    rating: inspectionItemRatingEnum("rating").notNull(),
    notes: text("notes"),
    photoKey: text("photo_key"),
  },
  (t) => [index("inspection_items_inspection_idx").on(t.inspectionId)]
);

// Price History
export const priceHistory = pgTable(
  "price_history",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    oldPriceInr: integer("old_price_inr").notNull(),
    newPriceInr: integer("new_price_inr").notNull(),
    changedAt: timestamp("changed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("price_history_listing_idx").on(t.listingId, t.changedAt)]
);

// Price Ratings
export const priceRatings = pgTable(
  "price_ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    rating: priceRatingEnum("rating").notNull(),
    estimatedMinInr: integer("estimated_min_inr"),
    estimatedMaxInr: integer("estimated_max_inr"),
    computedAt: timestamp("computed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("price_ratings_listing_idx").on(t.listingId),
  ]
);

// Enquiries
export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    buyerUserId: uuid("buyer_user_id")
      .notNull()
      .references(() => users.id),
    sellerUserId: uuid("seller_user_id")
      .notNull()
      .references(() => users.id),
    dealerId: uuid("dealer_id").references(() => dealers.id),
    status: enquiryStatusEnum("status").notNull().default("new"),
    message: text("message"),
    offerPriceInr: integer("offer_price_inr"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("enquiries_listing_created_idx").on(t.listingId, t.createdAt),
    index("enquiries_buyer_idx").on(t.buyerUserId),
    index("enquiries_seller_idx").on(t.sellerUserId),
    index("enquiries_status_idx").on(t.status),
  ]
);

// Lead Events
export const leadEvents = pgTable(
  "lead_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    enquiryId: uuid("enquiry_id")
      .notNull()
      .references(() => enquiries.id, { onDelete: "cascade" }),
    eventType: leadEventTypeEnum("event_type").notNull(),
    actorUserId: uuid("actor_user_id").references(() => users.id),
    oldStatus: enquiryStatusEnum("old_status"),
    newStatus: enquiryStatusEnum("new_status"),
    note: text("note"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("lead_events_enquiry_idx").on(t.enquiryId, t.createdAt)]
);

// Consents
export const consents = pgTable(
  "consents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subjectUserId: uuid("subject_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    purpose: consentPurposeEnum("purpose").notNull(),
    noticeVersion: varchar("notice_version", { length: 20 }).notNull(),
    grantedAt: timestamp("granted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    withdrawnAt: timestamp("withdrawn_at", { withTimezone: true }),
    channel: consentChannelEnum("channel").notNull().default("web"),
  },
  (t) => [
    index("consents_user_purpose_idx").on(t.subjectUserId, t.purpose),
  ]
);

// Saved Cars
export const savedCars = pgTable(
  "saved_cars",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    savedAt: timestamp("saved_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.listingId] })]
);

// Saved Searches
export const savedSearches = pgTable(
  "saved_searches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 200 }),
    filters: jsonb("filters").notNull(),
    notifyEmail: boolean("notify_email").notNull().default(false),
    notifyPush: boolean("notify_push").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("saved_searches_user_idx").on(t.userId)]
);

// Dealer Reviews
export const dealerReviews = pgTable(
  "dealer_reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dealerId: uuid("dealer_id")
      .notNull()
      .references(() => dealers.id, { onDelete: "cascade" }),
    reviewerUserId: uuid("reviewer_user_id")
      .notNull()
      .references(() => users.id),
    rating: smallint("rating").notNull(), // 1-5
    title: varchar("title", { length: 200 }),
    body: text("body"),
    purchaseVerified: boolean("purchase_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("dealer_reviews_dealer_idx").on(t.dealerId),
    index("dealer_reviews_reviewer_idx").on(t.reviewerUserId),
  ]
);

// Reports
export const reports = pgTable(
  "reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    reporterUserId: uuid("reporter_user_id")
      .notNull()
      .references(() => users.id),
    targetType: varchar("target_type", { length: 50 }).notNull(), // 'listing' | 'user' | 'review'
    targetId: uuid("target_id").notNull(),
    reason: reportReasonEnum("reason").notNull(),
    description: text("description"),
    status: reportStatusEnum("status").notNull().default("pending"),
    resolvedByUserId: uuid("resolved_by_user_id").references(() => users.id),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("reports_target_idx").on(t.targetType, t.targetId),
    index("reports_status_idx").on(t.status),
  ]
);

// Moderation Actions
export const moderationActions = pgTable(
  "moderation_actions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moderatorUserId: uuid("moderator_user_id")
      .notNull()
      .references(() => users.id),
    actionType: moderationActionTypeEnum("action_type").notNull(),
    targetType: varchar("target_type", { length: 50 }).notNull(),
    targetId: uuid("target_id").notNull(),
    reason: text("reason"),
    reportId: uuid("report_id").references(() => reports.id),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("moderation_actions_target_idx").on(t.targetType, t.targetId),
    index("moderation_actions_moderator_idx").on(t.moderatorUserId),
  ]
);

// Audit Log
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorUserId: uuid("actor_user_id").references(() => users.id),
    action: auditActionEnum("action").notNull(),
    entityType: varchar("entity_type", { length: 50 }).notNull(),
    entityId: varchar("entity_id", { length: 100 }).notNull(),
    oldData: jsonb("old_data"),
    newData: jsonb("new_data"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("audit_log_entity_idx").on(t.entityType, t.entityId),
    index("audit_log_actor_idx").on(t.actorUserId),
    index("audit_log_created_idx").on(t.createdAt),
  ]
);

// Outbox (transactional outbox pattern)
export const outbox = pgTable(
  "outbox",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    aggregateType: varchar("aggregate_type", { length: 100 }).notNull(),
    aggregateId: varchar("aggregate_id", { length: 100 }).notNull(),
    eventType: varchar("event_type", { length: 200 }).notNull(),
    payload: jsonb("payload").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("outbox_unpublished_idx")
      .on(t.createdAt)
      .where(sql`published_at IS NULL`),
  ]
);

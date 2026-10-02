import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, hashToken } from "../app/lib/auth-crypto.js";
import { contentSchemas } from "../app/lib/content-schema.js";
import { reviewSchema } from "../app/lib/review-schema.js";
import { PACKAGES } from "../app/data/packages.js";
import { DESTINATIONS } from "../app/data/destinations.js";
import { BLOG_POSTS } from "../app/data/blogPosts.js";

test("passwords use unique salts and reject incorrect credentials", () => {
  const first = hashPassword("a-test-password-123");
  const second = hashPassword("a-test-password-123");
  assert.notEqual(first, second);
  assert.equal(verifyPassword("a-test-password-123", first), true);
  assert.equal(verifyPassword("incorrect-password", first), false);
  assert.equal(verifyPassword("test", "malformed"), false);
  assert.equal(hashToken("token").length, 64);
  assert.notEqual(hashToken("token"), hashToken("another-token"));
});

test("all existing content can be edited without losing structured blog blocks", () => {
  for (const [type, records] of Object.entries({ packages: PACKAGES, destinations: DESTINATIONS, blogs: BLOG_POSTS })) {
    for (const record of records) {
      const parsed = contentSchemas[type].parse(record);
      if (type === "blogs") assert.deepEqual(parsed.sections, record.sections);
    }
  }
});

test("invalid slugs, unsafe links, missing fields and impossible dates are rejected", () => {
  assert.equal(contentSchemas.packages.safeParse({ ...PACKAGES[0], id: "$invalid" }).success, false);
  assert.equal(contentSchemas.destinations.safeParse({ ...DESTINATIONS[0], image: "//malicious.example/image.png" }).success, false);
  assert.equal(contentSchemas.blogs.safeParse({ ...BLOG_POSTS[0], relatedPackage: "javascript:alert(1)" }).success, false);
  assert.equal(contentSchemas.blogs.safeParse({ ...BLOG_POSTS[0], date: "2026-02-30" }).success, false);
  assert.equal(contentSchemas.packages.safeParse({ title: "Incomplete" }).success, false);
  assert.equal(contentSchemas.packages.parse({ ...PACKAGES[0], _id: "untrusted", passwordHash: "untrusted" }).passwordHash, undefined);
});

test("reviews require a valid rating and contact details", () => {
  const review = { name: "Traveler", email: "traveler@example.com", destination: "Bali", rating: 5, message: "A wonderful travel experience." };
  assert.equal(reviewSchema.safeParse(review).success, true);
  assert.equal(reviewSchema.safeParse({ ...review, rating: 6 }).success, false);
  assert.equal(reviewSchema.safeParse({ ...review, email: "not-an-email" }).success, false);
  assert.equal(reviewSchema.safeParse({ ...review, message: "short" }).success, false);
});

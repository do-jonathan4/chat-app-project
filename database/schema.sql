set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"id" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"room" TEXT NOT NULL
);

CREATE TABLE "messages" (
	"username" TEXT NOT NULL,
	"text" TEXT NOT NULL,
	"room" TEXT NOT NULL,
	"createdAt" TIMESTAMP(6) NOT NULL default now()
);

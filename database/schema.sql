set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "users" (
	"id"			text		not null,
	"name"		text		not null,
	"room"		text		not null,
	primary key ("name")
);

create table "messages" (
	"user"		text		not null,
	"text"		text		not null,
	"room"		text		not null,
	"created_at"	timestamptz(6)	not null default now(),
	foreign key ("user")
	references "users" ("name")
);

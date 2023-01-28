create database saltsystem;

drop table if exists user;
drop table if exists contacts;
drop table if exists messages;

create table users(
    id serial primary key,
    name text not null,
    email text unique,
    password text not null
);

create table contacts (
    id serial primary key,
    name text not null,
    phone_number text not null
);

create table messages(
    id serial primary key,
    user_id integer references contacts(id),
    message text,
    data_message timestamp default now()
);

create table chatbot(
    id serial primary key,
    id_origem integer default 0,
    id_destino integer default 0,
    message text
    data_message timestamp default now()
);
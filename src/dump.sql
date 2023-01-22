create database saltsystem;

drop table if exists contacts;
drop table if exists messages;

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
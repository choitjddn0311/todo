create table user (
    id varchar(30) not null primary key,
    pw varchar(255) not null,
    uname varchar(255)
);

create table todolist (
    id varchar(30) not null primary key,
    category varchar(5) not null,
    todo varchar(500) not null,
    todostatus boolean 
);
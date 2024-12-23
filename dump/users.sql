create table users
(
    id         integer not null
        primary key,
    created_at timestamp(6),
    email      varchar(255)
        constraint user_email_unique
            unique,
    password   varchar(255),
    role       varchar(255)
        constraint users_role_check
            check ((role)::text = ANY ((ARRAY ['TEACHER'::character varying, 'STUDENT'::character varying])::text[])),
    username   varchar(255)
        constraint user_username_unique
            unique
);

alter table users
    owner to postgres;

INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (1, null, 'student@ubs.com', 'password', 'STUDENT', 'student');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (2, null, 'teacher@ubs.com', 'password', 'TEACHER', 'teacher');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (3, null, 'yigitcanyontem@ubs.com', 'password', 'STUDENT', 'yigitcanyontem');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (4, null, 'denizutkuates@ubs.com', 'password', 'STUDENT', 'denizutkuates');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (5, null, 'yalcinboradincer@ubs.com', 'password', 'STUDENT', 'yalcinboradincer');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (6, null, 'enistaylandurmaz@ubs.com', 'password', 'STUDENT', 'enistaylandurmaz');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (7, null, 'furkanerdalsumra@ubs.com', 'password', 'STUDENT', 'furkanerdalsumra');
INSERT INTO public.users (id, created_at, email, password, role, username) VALUES (8, null, 'zahra@ubs.com', 'password', 'TEACHER', 'zahra');

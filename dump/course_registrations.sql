create table course_registrations
(
    id            integer not null
        primary key,
    registered_at timestamp(6),
    lesson_id     integer
        constraint course_registration_lesson_fk
            references lessons,
    user_id       integer
        constraint course_registration_user_fk
            references users,
    constraint user_lesson_unique
        unique (user_id, lesson_id)
);

alter table course_registrations
    owner to postgres;

INSERT INTO public.course_registrations (id, registered_at, lesson_id, user_id) VALUES (1, null, 1, 3);
INSERT INTO public.course_registrations (id, registered_at, lesson_id, user_id) VALUES (2, null, 1, 4);
INSERT INTO public.course_registrations (id, registered_at, lesson_id, user_id) VALUES (3, null, 1, 5);
INSERT INTO public.course_registrations (id, registered_at, lesson_id, user_id) VALUES (4, null, 1, 6);
INSERT INTO public.course_registrations (id, registered_at, lesson_id, user_id) VALUES (5, null, 1, 7);

create table attendance
(
    id             integer not null
        primary key,
    recorded_at    timestamp(6),
    status         varchar(255)
        constraint attendance_status_check
            check ((status)::text = ANY
                   ((ARRAY ['PRESENT'::character varying, 'ABSENT'::character varying, 'EXCUSED'::character varying])::text[])),
    lesson_time_id integer
        constraint attendance_lesson_fk
            references lesson_times,
    user_id        integer
        constraint attendance_user_fk
            references users
);

alter table attendance
    owner to postgres;

INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (17, '2024-12-21 17:00:50.995000', 'PRESENT', 1, 3);
INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (18, '2024-12-21 17:02:18.115000', 'PRESENT', 2, 3);
INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (19, '2024-12-21 17:42:51.912000', 'PRESENT', 1, 3);
INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (20, '2024-12-21 17:43:03.810000', 'PRESENT', 1, 3);
INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (21, '2024-12-21 17:50:55.562000', 'PRESENT', 1, 3);
INSERT INTO public.attendance (id, recorded_at, status, lesson_time_id, user_id) VALUES (22, '2024-12-21 17:51:09.170000', 'PRESENT', 1, 3);

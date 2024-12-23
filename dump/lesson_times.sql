create table lesson_times
(
    id         integer not null
        primary key,
    date       timestamp(6),
    end_time   timestamp(6),
    start_time timestamp(6),
    lesson_id  integer
        constraint lesson_time_lesson_fk
            references lessons,
    teacher_id integer
        constraint lesson_time_teacher_fk
            references users
);

alter table lesson_times
    owner to postgres;

INSERT INTO public.lesson_times (id, date, end_time, start_time, lesson_id, teacher_id) VALUES (1, '2024-12-21 15:33:12.000000', '2024-12-21 17:00:00.000000', '2024-12-21 15:00:00.000000', 1, 8);
INSERT INTO public.lesson_times (id, date, end_time, start_time, lesson_id, teacher_id) VALUES (2, '2024-12-24 15:33:12.000000', '2024-12-21 17:00:00.000000', '2024-12-21 15:00:00.000000', 1, 8);

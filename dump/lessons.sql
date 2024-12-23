create table lessons
(
    id          integer not null
        primary key,
    description varchar(255),
    name        varchar(255)
);

alter table lessons
    owner to postgres;

INSERT INTO public.lessons (id, description, name) VALUES (1, 'Digital Image Processing', 'CS443');

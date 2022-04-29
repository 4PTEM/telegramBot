create table users(
    id bigserial primary key,
    created_at timestamp,
    last_message timestamp
);

create table categories(
    id bigserial primary key,
    user_id bigint,
    category_name varchar(35),
    created_at timestamp,
    constraint categories_fkey foreign key (user_id) references users(id)
);

create table expenses(
    categorie_id bigint,
    created_at timestamp,
    cost int,
    constraint expenses_pkey primary key (categorie_id, created_at),
    constraint expenses_fkey foreign key (categorie_id) references categories(id)
);
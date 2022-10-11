-- subject to change possibly
insert into users
     (email, password)
values
    ('kelly@email.com', crypt('kellyspassword', gen_salt('bf')),
    ('annie@email.com', crypt('anniespassword', gen_salt('bf')),
    ('taylor@email.com', crypt('taylorspassword', gen_salt('bf')),
    ('elouisa@email.com', crypt('elouisaspassword', gen_salt('bf')),
    ('Alicia@email.com', crypt('aliciaspassword', gen_salt('bf')),
    ('Jawann@gmail.com', crypt('jawaanspassword', gen_salt('bf'));


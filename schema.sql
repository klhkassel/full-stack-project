create table newsletters. users (
    id serial primary key,
    name varchar(50) not null,
    email varchar(50) not null unique,
    password_digest text not null
);


-- CREATE TABLE newsletter . users (
--   id BIGINT NOT NULL AUTO_INCREMENT,
--   firstName VARCHAR(50) NULL DEFAULT NULL,
--   lastName VARCHAR(50) NULL DEFAULT NULL,
--   mobile VARCHAR(15) NULL,
--   email VARCHAR(50) NULL,
--   passwordHash VARCHAR(32) NOT NULL,
--   admin TINYINT(1) NOT NULL DEFAULT 0,
--   customer TINYINT(1) NOT NULL DEFAULT 0,
--   registeredAt DATETIME NOT NULL,
--   lastLogin DATETIME NULL DEFAULT NULL,
--   intro TINYTEXT NULL DEFAULT NULL,
--   profile TEXT NULL DEFAULT NULL,
--   PRIMARY KEY (id),
-- );

--   CREATE TABLE newsletter. newsletter (
--    id BIGINT NOT NULL AUTO_INCREMENT,
--   `userId` BIGINT NOT NULL,
--   `title` VARCHAR(75) NOT NULL,
--   `createdAt` DATETIME NOT NULL,
--   `updatedAt` DATETIME NULL DEFAULT NULL,
--   `publishedAt` DATETIME NULL DEFAULT NULL,
--   `content` TEXT NULL DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   INDEX `idx_newsletter_user` (`userId` ASC),
--   CONSTRAINT `fk_newsletter_user`
--     FOREIGN KEY (`userId`)
--     REFERENCES `newsletter`.`user` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);

-- create table posts (
--     id serial primary key,
--     url text not null,
--     user_id integer references users (id)
-- );

-- create table tags (
--     id serial primary key,
--     tag varchar(50) not null
-- );

-- create table tags_posts (
--     tag_id integer references tags (id),
--     post_id integer references posts (id)
-- );

-- create table likes (
--     user_id integer references users (id),
--     post_id integer references posts (id)
-- );

-- create table comments (
--     id serial primary key,
--     comment text not null,
--     created_at timestamp set default now(),
--     post_id integer references posts (id),
--     user_id integer references users (id)
-- );
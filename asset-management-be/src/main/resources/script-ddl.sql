CREATE TABLE category
(
    id              int AUTO_INCREMENT
        PRIMARY KEY,
    category_name   varchar(30) NOT NULL,
    category_prefix varchar(3)  NOT NULL,
    CONSTRAINT UK_4fy0cvnsy6k1yky6kjs5frkra
        UNIQUE (category_prefix),
    CONSTRAINT UK_lroeo5fvfdeg4hpicn4lw7x9b
        UNIQUE (category_name)
);

CREATE TABLE location
(
    id            int AUTO_INCREMENT
        PRIMARY KEY,
    location_name varchar(20) NOT NULL
);

CREATE TABLE asset
(
    id             int AUTO_INCREMENT
        PRIMARY KEY,
    asset_code     varchar(9)   NULL,
    asset_name     varchar(50)  NOT NULL,
    installed_date datetime(6)  NOT NULL,
    specification  varchar(300) NOT NULL,
    state          varchar(30)  NOT NULL,
    category_id    int          NOT NULL,
    location_id    int          NOT NULL,
    CONSTRAINT UK_qn47dne4f1vrw5sy5o4b9yvgl
        UNIQUE (asset_code),
    CONSTRAINT FKe69ydkxgcthslax73274q33fs
        FOREIGN KEY (category_id) REFERENCES category (id),
    CONSTRAINT FKoo11h2f4j12wv0axk6d8u1wy0
        FOREIGN KEY (location_id) REFERENCES location (id)
);

# generate asset code
CREATE TRIGGER TR_ASSET_INSERT
    BEFORE INSERT
    ON asset
    FOR EACH ROW
BEGIN
    DECLARE prefix varchar(3);
    SET prefix = (SELECT category_prefix
                  FROM category
                  WHERE category.id = NEW.category_id);
    SET NEW.asset_code = CONCAT(prefix, LPAD(NEW.id, 6, '0'));
END;

CREATE TABLE user
(
    id          int AUTO_INCREMENT
        PRIMARY KEY,
    birth_date  datetime(6) NOT NULL,
    disable     bit         NOT NULL,
    first_name  varchar(50) NOT NULL,
    gender      varchar(10) NOT NULL,
    joined_date datetime(6) NOT NULL,
    last_name   varchar(50) NOT NULL,
    password    varchar(30) NOT NULL,
    staff_code  varchar(6)  NULL,
    type        varchar(10) NOT NULL,
    username    varchar(30) NULL,
    location_id int         NOT NULL,
    CONSTRAINT UK_ibuvfps1ce8o2hxuluo4pr68g
        UNIQUE (staff_code),
    CONSTRAINT UK_sb8bbouer5wak8vyiiy4pf2bx
        UNIQUE (username),
    CONSTRAINT FKneyhvoj17hax43m8dq3u7gbic
        FOREIGN KEY (location_id) REFERENCES location (id)
);

# generate staff code
CREATE TRIGGER TR_USER_INSERT
    BEFORE INSERT
    ON user
    FOR EACH ROW
BEGIN
    SET NEW.staff_code = CONCAT('SD', LPAD(NEW.id, 4, '0'));
END;

CREATE TABLE assignment
(
    id            int AUTO_INCREMENT
        PRIMARY KEY,
    assigned_date datetime(6)  NOT NULL,
    note          varchar(300) NULL,
    returned_date datetime(6)  NULL,
    state         varchar(30)  NOT NULL,
    accepted_by   int          NULL,
    asset_id      int          NOT NULL,
    assign_by     int          NOT NULL,
    assign_to     int          NOT NULL,
    request_by    int          NULL,
    CONSTRAINT FK8babodn7ebvytymxa2gebw0sa
        FOREIGN KEY (assign_to) REFERENCES user (id),
    CONSTRAINT FKa4ac45yc4dgn6mkxpk4elb03m
        FOREIGN KEY (request_by) REFERENCES user (id),
    CONSTRAINT FKc9u2f8jjh7d7mdjlo8742q3xt
        FOREIGN KEY (assign_by) REFERENCES user (id),
    CONSTRAINT FKfdurtvgn6ksekwqxtieb2h3wr
        FOREIGN KEY (accepted_by) REFERENCES user (id),
    CONSTRAINT FKp4xufrrwsc72xaffg2yv1hiu1
        FOREIGN KEY (asset_id) REFERENCES asset (id)
);

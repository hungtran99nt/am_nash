CREATE TABLE category
(
    id              int AUTO_INCREMENT
        PRIMARY KEY,
    category_name   varchar(30) NOT NULL,
    category_prefix varchar(3)  NOT NULL,
    CONSTRAINT UK_Category_CategoryName
        UNIQUE (category_name),
    CONSTRAINT UK_Category_CategoryPrefix
        UNIQUE (category_prefix)
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
    CONSTRAINT UK_Asset_AssetCode
        UNIQUE (asset_code),
    CONSTRAINT FK_Asset_Category
        FOREIGN KEY (category_id) REFERENCES category (id),
    CONSTRAINT FK_Asset_Location
        FOREIGN KEY (location_id) REFERENCES location (id)
);

CREATE TABLE user
(
    id          int AUTO_INCREMENT
        PRIMARY KEY,
    birth_date  datetime(6) NOT NULL,
    status      tinyint     NOT NULL,
    first_name  varchar(50) NOT NULL,
    gender      varchar(10) NOT NULL,
    joined_date datetime(6) NOT NULL,
    last_name   varchar(50) NOT NULL,
    password    varchar(75) NOT NULL,
    staff_code  varchar(6)  NULL,
    type        varchar(10) NOT NULL,
    username    varchar(30) NULL,
    location_id int         NOT NULL,
    CONSTRAINT UK_User_StaffCode
        UNIQUE (staff_code),
    CONSTRAINT UK_User_Username
        UNIQUE (username),
    CONSTRAINT FK_User_Location
        FOREIGN KEY (location_id) REFERENCES location (id)
);

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
    CONSTRAINT FK_Assignment_Asset
        FOREIGN KEY (asset_id) REFERENCES asset (id),
    CONSTRAINT FK_Assignment_User_AcceptedBy
        FOREIGN KEY (accepted_by) REFERENCES user (id),
    CONSTRAINT FK_Assignment_User_AssignBy
        FOREIGN KEY (assign_by) REFERENCES user (id),
    CONSTRAINT FK_Assignment_User_AssignTo
        FOREIGN KEY (assign_to) REFERENCES user (id),
    CONSTRAINT FK_Assignment_User_RequestBy
        FOREIGN KEY (request_by) REFERENCES user (id)
);

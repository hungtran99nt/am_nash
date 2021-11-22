SELECT MAX(CAST(REPLACE(UPPER(username), UPPER('binhnv'), '') AS UNSIGNED)) AS numbers
FROM user
WHERE username LIKE CONCAT('binhnv', '%');

SELECT *
FROM user
WHERE id = 59;

SELECT AUTO_INCREMENT, TABLE_NAME
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE();

INSERT INTO user ( birth_date, status, first_name, gender, joined_date, last_name
                 , type, username, location_id)
VALUES ( '1991-12-22 03:59:31', 0, 'An', 'Female', '2019-09-11 12:56:54', 'Nguyen Thuy'
       , 'Staff', 'annt1', 1);

SELECT LAST_INSERT_ID()
FROM user;
SELECT *
FROM user
ORDER BY id DESC
LIMIT 1;
SET @@GLOBAL.information_schema_stats_expiry = 86400;
SET PERSIST information_schema_stats_expiry = 86400;
SHOW SESSION VARIABLES LIKE '%information_schema_stats_expiry%';
SET @@SESSION.information_schema_stats_expiry = 0;
SELECT AUTO_INCREMENT
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'user';

CREATE TRIGGER TR_USER_INSERT_Password
    BEFORE INSERT
    ON user
    FOR EACH ROW
BEGIN
    SET NEW.password = CONCAT(NEW.username, '@', DAY(NEW.birth_date), MONTH(NEW.birth_date),
                              YEAR(NEW.birth_date));
END;

CREATE PROCEDURE SP_USER_INSERT_StaffCode(OUT code VARCHAR(6))
BEGIN
    START TRANSACTION;
    SET code = CONCAT('SD', LPAD(LAST_INSERT_ID(), 4, '0'));
    UPDATE user
    SET staff_code = code
    WHERE id = LAST_INSERT_ID();
    COMMIT;
END;

CALL SP_USER_INSERT_StaffCode(@code);
SELECT @code;

# generate asset code
CREATE PROCEDURE SP_ASSET_INSERT_AssetCode(OUT code VARCHAR(9))
BEGIN
    DECLARE prefix varchar(3);
    START TRANSACTION;
    SELECT category_prefix
    INTO prefix
    FROM category
    WHERE category.id =
          (SELECT category_id
           FROM asset
           WHERE id = LAST_INSERT_ID());
    SET code = CONCAT(prefix, LPAD(LAST_INSERT_ID(), 6, '0'));
    UPDATE asset
    SET asset_code = code
    WHERE id = LAST_INSERT_ID();
    COMMIT;
END;


INSERT INTO asset (asset_name, installed_date, specification, state, category_id, location_id)
VALUES ( 'Dell Inspiron 15 3511', '2021-10-25 00:00:00', 'Persistent heuristic paradigm'
       , 'Available', 1, 3);
CALL SP_ASSET_INSERT_AssetCode(@code);
SELECT @code;

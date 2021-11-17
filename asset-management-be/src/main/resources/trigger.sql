# generate staff code
CREATE TRIGGER TR_USER_INSERT
    BEFORE INSERT
    ON user
    FOR EACH ROW
BEGIN
    SET NEW.staff_code = CONCAT('SD', LPAD(NEW.id, 4, '0'));
END;

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

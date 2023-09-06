-- Active: 1694002178412@@127.0.0.1@3306@delta_app
USE delta_app;

SELECT * FROM user;

SELECT COUNT(*) FROM user;

SELECT * FROM user WHERE id="fcd05f1e-8352-4215-911b-a759991992d9"

UPDATE user SET username="newname" WHERE id="fcd05f1e-8352-4215-911b-a759991992d9";
-- CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS satellite;
CREATE TABLE satellite (
    satID INT NOT NULL PRIMARY KEY,
    satname Varchar(60) NOT NULL,
    launchDate DATE,
    coordinate POINT,
    altitude FLOAT,
    time TIMESTAMP
);

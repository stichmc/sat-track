DROP TABLE IF EXISTS satellite;
CREATE TABLE satellite (
    satID INT NOT NULL PRIMARY KEY,
    satname Varchar(60) NOT NULL,
    launchDate DATE DEFAULT CURRENT_DATE,
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    altitude FLOAT,
    time INT
);

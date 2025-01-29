create table message (
    id long AUTO_INCREMENT,
    author varchar(255),
    message varchar(8000),
    type varchar(50),
    PRIMARY KEY (id)
);
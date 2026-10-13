CREATE TABLE parents (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id  UNSIGNED NULL,
    father_name VARCHAR(150),
    mother_name VARCHAR(150),
    mobile VARCHAR(20),
    alternate_mobile VARCHAR(20),
    email VARCHAR(150),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_parent_user
        FOREIGN KEY (user_id) REFERENCES users(id)
);
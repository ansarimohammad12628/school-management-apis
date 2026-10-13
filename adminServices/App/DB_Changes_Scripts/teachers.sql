CREATE TABLE teachers (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id  UNSIGNED NULL,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NOT NULL,

    mobile VARCHAR(20),
    email VARCHAR(150),
    profile_image VARCHAR(500),
    address TEXT,

    joining_date DATE NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_teacher_user
        FOREIGN KEY (user_id) REFERENCES users(id)
);
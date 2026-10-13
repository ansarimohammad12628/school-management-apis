CREATE TABLE subjects (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    class_id  UNSIGNED NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    subject_code VARCHAR(50) NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_subject_class
        FOREIGN KEY (class_id) REFERENCES classes(id)
);
CREATE TABLE divisions (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    class_id  UNSIGNED NOT NULL,
    division_name VARCHAR(50) NOT NULL,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_division_class
        FOREIGN KEY (class_id) REFERENCES classes(id)
);
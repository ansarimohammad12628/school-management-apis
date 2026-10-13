CREATE TABLE notices (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    class_id  UNSIGNED NULL,

    is_global BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,

    attachment VARCHAR(500) NULL,

    created_by  UNSIGNED NOT NULL,

    published_at DATETIME NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
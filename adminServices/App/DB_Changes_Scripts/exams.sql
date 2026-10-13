CREATE TABLE exams (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    exam_name VARCHAR(150) NOT NULL,
    class_id  UNSIGNED NOT NULL,

    start_date DATE NULL,
    end_date DATE NULL,

    status ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (class_id) REFERENCES classes(id)
);
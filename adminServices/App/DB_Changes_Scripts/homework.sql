CREATE TABLE homework (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    class_id  UNSIGNED NOT NULL,
    division_id  UNSIGNED NULL,
    subject_id  UNSIGNED NOT NULL,
    teacher_id  UNSIGNED NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    file_path VARCHAR(500) NULL,
    file_type VARCHAR(100) NULL,

    homework_date DATE NOT NULL,
    submission_date DATE NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (division_id) REFERENCES divisions(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
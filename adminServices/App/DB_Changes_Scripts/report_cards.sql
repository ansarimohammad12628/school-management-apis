CREATE TABLE report_cards (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id  UNSIGNED NOT NULL,
    exam_id  UNSIGNED NOT NULL,

    total_marks DECIMAL(10,2) DEFAULT 0,
    obtained_marks DECIMAL(10,2) DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0,

    grade VARCHAR(10) NULL,
    rank_number INT NULL,

    teacher_remarks TEXT NULL,

    published_at DATETIME NULL,

    status ENUM('draft','published') DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);
CREATE TABLE exam_subjects (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    exam_id  UNSIGNED NOT NULL,
    subject_id  UNSIGNED NOT NULL,

    exam_date DATE NULL,
    start_time TIME NULL,
    end_time TIME NULL,

    total_marks DECIMAL(10,2) DEFAULT 100,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (exam_id) REFERENCES exams(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
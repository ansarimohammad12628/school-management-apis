CREATE TABLE marks (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id  UNSIGNED NOT NULL,
    exam_id  UNSIGNED NOT NULL,
    exam_subject_id  UNSIGNED NOT NULL,
    subject_id  UNSIGNED NOT NULL,

    marks_obtained DECIMAL(10,2) NOT NULL,
    total_marks DECIMAL(10,2) NOT NULL,

    grade VARCHAR(10) NULL,
    remarks VARCHAR(255) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id),
    FOREIGN KEY (exam_subject_id) REFERENCES exam_subjects(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
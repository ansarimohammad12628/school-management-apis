CREATE TABLE attendance (
    id UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id UNSIGNED NOT NULL,
    class_id UNSIGNED NOT NULL,
    division_id UNSIGNED NULL,

    attendance_date DATE NOT NULL,

    status ENUM('present','absent','late','leave') NOT NULL,

    remarks VARCHAR(255) NULL,

    marked_by UNSIGNED NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    UNIQUE KEY unique_student_attendance
        (student_id, attendance_date),

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (division_id) REFERENCES divisions(id),
    FOREIGN KEY (marked_by) REFERENCES teachers(id)
);
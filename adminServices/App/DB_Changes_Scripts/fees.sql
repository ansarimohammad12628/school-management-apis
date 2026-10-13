CREATE TABLE fees (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id  UNSIGNED NOT NULL,
    class_id  UNSIGNED NOT NULL,

    fee_name VARCHAR(150) NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    pending_amount DECIMAL(10,2) DEFAULT 0,

    due_date DATE NULL,

    status ENUM(
        'pending',
        'partial',
        'paid',
        'overdue'
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
CREATE TABLE notifications (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,

    notification_type ENUM(
        'homework',
        'attendance',
        'fees',
        'exam',
        'result',
        'notice',
        'event',
        'holiday',
        'chat',
        'general'
    ) NOT NULL,

    sender_id  UNSIGNED NULL,

    class_id  UNSIGNED NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
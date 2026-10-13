CREATE TABLE user_notifications (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    notification_id  UNSIGNED NOT NULL,
    user_id  UNSIGNED NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (notification_id) REFERENCES notifications(id),
    FOREIGN KEY (user_id) REFERENCES users(id),

    UNIQUE KEY unique_user_notification
        (notification_id, user_id)
);
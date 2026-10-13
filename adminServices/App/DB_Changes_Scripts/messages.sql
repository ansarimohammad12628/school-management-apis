CREATE TABLE messages (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    chat_id  UNSIGNED NOT NULL,
    sender_id  UNSIGNED NOT NULL,

    message TEXT NULL,

    file_path VARCHAR(500) NULL,
    file_type VARCHAR(100) NULL,

    is_seen BOOLEAN DEFAULT FALSE,
    seen_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
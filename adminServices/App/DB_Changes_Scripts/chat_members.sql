CREATE TABLE chat_members (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    chat_id  UNSIGNED NOT NULL,
    user_id  UNSIGNED NOT NULL,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (user_id) REFERENCES users(id),

    UNIQUE KEY unique_chat_member
        (chat_id, user_id)
);
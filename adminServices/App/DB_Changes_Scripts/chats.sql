CREATE TABLE chats (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    chat_type ENUM('individual','group') NOT NULL,

    group_name VARCHAR(150) NULL,
    group_image VARCHAR(500) NULL,

    created_by  UNSIGNED NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id)
);
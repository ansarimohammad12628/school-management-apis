CREATE TABLE events (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    event_type ENUM(
        'school',
        'sports',
        'annual_function',
        'exam',
        'holiday',
        'parent_meeting',
        'seminar',
        'competition',
        'picnic',
        'cultural',
        'farewell',
        'freshers',
        'independence_day',
        'republic_day',
        'festival',
        'extra_class',
        'result',
        'announcement'
    ) NOT NULL,

    start_date DATETIME NOT NULL,
    end_date DATETIME NULL,

    location VARCHAR(255) NULL,

    created_by  UNSIGNED NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (created_by) REFERENCES users(id)
);
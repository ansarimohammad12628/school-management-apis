CREATE TABLE students (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id  UNSIGNED NULL,
    parent_id  UNSIGNED NULL,

    student_image VARCHAR(500) NULL,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NOT NULL,

    mobile VARCHAR(20) NULL,
    alternate_mobile VARCHAR(20) NULL,

    class_id  UNSIGNED NOT NULL,
    division_id  UNSIGNED NULL,

    gender ENUM('male','female','other') NULL,
    roll_number INT NULL,

    admission_number VARCHAR(100) UNIQUE NOT NULL,
    admission_date DATE NULL,

    date_of_birth DATE NULL,
    address TEXT NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT fk_student_parent
        FOREIGN KEY (parent_id) REFERENCES parents(id),

    CONSTRAINT fk_student_class
        FOREIGN KEY (class_id) REFERENCES classes(id),

    CONSTRAINT fk_student_division
        FOREIGN KEY (division_id) REFERENCES divisions(id)
);
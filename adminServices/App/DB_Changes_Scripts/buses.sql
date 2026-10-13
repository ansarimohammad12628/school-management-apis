CREATE TABLE buses (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    bus_number VARCHAR(50) UNIQUE NOT NULL,

    driver_id  UNSIGNED NULL,
    conductor_id  UNSIGNED NULL,

    capacity INT NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    FOREIGN KEY (conductor_id) REFERENCES conductors(id)
);
CREATE TABLE bus_routes (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    bus_id  UNSIGNED NOT NULL,

    route_name VARCHAR(150) NOT NULL,

    pickup_time TIME NULL,
    drop_time TIME NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (bus_id) REFERENCES buses(id)
);
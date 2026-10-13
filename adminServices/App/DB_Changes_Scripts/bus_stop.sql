CREATE TABLE bus_stops (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    route_id  UNSIGNED NOT NULL,

    stop_name VARCHAR(150) NOT NULL,
    address TEXT NULL,

    pickup_time TIME NULL,
    drop_time TIME NULL,

    stop_order INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (route_id) REFERENCES bus_routes(id)
);
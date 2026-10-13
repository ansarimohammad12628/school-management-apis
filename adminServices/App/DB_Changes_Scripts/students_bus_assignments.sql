CREATE TABLE student_bus_assignments (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id  UNSIGNED NOT NULL,
    bus_id  UNSIGNED NOT NULL,
    route_id  UNSIGNED NOT NULL,
    stop_id  UNSIGNED NOT NULL,

    start_date DATE NULL,
    end_date DATE NULL,

    status ENUM('active','inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (bus_id) REFERENCES buses(id),
    FOREIGN KEY (route_id) REFERENCES bus_routes(id),
    FOREIGN KEY (stop_id) REFERENCES bus_stops(id)
);
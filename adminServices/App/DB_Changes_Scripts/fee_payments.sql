CREATE TABLE fee_payments (
    id  UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    fee_id  UNSIGNED NOT NULL,
    student_id  UNSIGNED NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    payment_method ENUM(
        'cash',
        'upi',
        'card',
        'bank_transfer',
        'online'
    ) NOT NULL,

    transaction_id VARCHAR(150) NULL,
    receipt_number VARCHAR(100) UNIQUE NOT NULL,

    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    receipt_pdf VARCHAR(500) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fee_id) REFERENCES fees(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);
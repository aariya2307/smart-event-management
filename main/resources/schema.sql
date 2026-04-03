-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(200) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(200),
    description TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin(admin_id)
);

-- Participant Table
CREATE TABLE IF NOT EXISTS participant (
    participant_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    "year" INT,
    email VARCHAR(100),
    phone VARCHAR(20),
    registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Volunteer Table
CREATE TABLE IF NOT EXISTS volunteer (
    volunteer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    skills VARCHAR(255),
    registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    participant_id INT NOT NULL,
    status VARCHAR(50),
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES event(event_id),
    FOREIGN KEY (participant_id) REFERENCES participant(participant_id)
);

-- Duty Table
CREATE TABLE IF NOT EXISTS duty (
    duty_id INT PRIMARY KEY AUTO_INCREMENT,
    volunteer_id INT NOT NULL,
    event_id INT NOT NULL,
    role VARCHAR(100),
    status VARCHAR(50),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (volunteer_id) REFERENCES volunteer(volunteer_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);

-- User Table
CREATE TABLE IF NOT EXISTS "user" (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Participant Performance Table
CREATE TABLE IF NOT EXISTS participant_performance (
    performance_id INT PRIMARY KEY AUTO_INCREMENT,
    participant_id INT NOT NULL,
    event_id INT NOT NULL,
    score DECIMAL(5, 2),
    feedback TEXT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES participant(participant_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);

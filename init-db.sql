CREATE DATABASE IF NOT EXISTS jobSite;
USE jobSite;

CREATE TABLE IF NOT EXISTS job(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_url VARCHAR(255) NOT NULL,
    apply_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO job(title, description, location, date, company, company_url, apply_url) VALUES ('Software Engineer', 'We are looking for a software engineer to join our team.', 'New York, NY', '2021-01-01', 'Google', 'https://www.google.com', 'https://www.google.com');
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  report_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- TheLens Database Schema
-- Run: mysql -u YOUR_USER -p thelens_db < schema.sql

CREATE DATABASE IF NOT EXISTS `thelens_db`;
USE `thelens_db`;

-- Authors table
CREATE TABLE `authors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `initials` VARCHAR(10) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `bio` TEXT,
  `avatar_bg` VARCHAR(50) DEFAULT '#f3f4f6',
  `avatar_text` VARCHAR(50) DEFAULT '#374151',
  `accent_color` VARCHAR(50) DEFAULT '#3b82f6',
  `location` VARCHAR(255),
  `joined_year` YEAR,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Topics table
CREATE TABLE `topics` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `slug` VARCHAR(100) UNIQUE NOT NULL,
  `description` TEXT,
  `icon` VARCHAR(10),
  `color` VARCHAR(50),
  `gradient_from` VARCHAR(50),
  `gradient_to` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE `articles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) UNIQUE NOT NULL,
  `excerpt` TEXT,
  `content` LONGTEXT,  -- Full article content (add later)
  `category` VARCHAR(100) NOT NULL,
  `author_id` INT NOT NULL,
  `publish_date` DATE NOT NULL,
  `read_time` VARCHAR(20) DEFAULT '5 min',
  `image_color` VARCHAR(50),
  `gradient` VARCHAR(100),
  `featured` BOOLEAN DEFAULT FALSE,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE CASCADE,
  INDEX idx_category (`category`),
  INDEX idx_author (`author_id`),
  INDEX idx_publish_date (`publish_date`),
  INDEX idx_featured (`featured`)
);

-- Sample data (seed)
INSERT INTO `authors` (`name`, `initials`, `role`, `bio`, `avatar_bg`, `avatar_text`, `accent_color`, `location`, `joined_year`) VALUES
('Sophia Hartwell', 'SH', 'Editor in Chief', 'Former NYT journalist covering culture and technology.', '#fef3c7', '#92400e', '#f59e0b', 'New York, NY', 2018),
('Marcus Liu', 'ML', 'Senior Writer', 'Investigative reporter covering AI and tech.', '#dbeafe', '#1d4ed8', '#3b82f6', 'San Francisco, CA', 2019),
('Priya Menon', 'PM', 'Design & Visual Editor', 'Visual storyteller and data journalist.', '#fce7f3', '#9d174d', '#ec4899', 'London, UK', 2020),
('James Okafor', 'JO', 'Technology Editor', 'Engineer turned writer on AI ethics.', '#d1fae5', '#065f46', '#10b981', 'Lagos, Nigeria', 2021);

INSERT INTO `topics` (`name`, `slug`, `description`, `icon`, `color`, `gradient_from`, `gradient_to`) VALUES
('Technology', 'technology', 'AI, open source, the web, and tools reshaping how we build.', '⚡', '#0ea5e9', '#0ea5e9', '#6366f1'),
('Culture', 'culture', 'Art, music, architecture, and stories we tell.', '🎨', '#ec4899', '#ec4899', '#f97316'),
('Science', 'science', 'Biology, climate, space, discoveries.', '🔬', '#10b981', '#10b981', '#06b6d4'),
('Society', 'society', 'Policy, inequality, urban life.', '🏙️', '#8b5cf6', '#8b5cf6', '#06b6d4'),
('Opinion', 'opinion', 'Perspectives and essays.', '✍️', '#f59e0b', '#f59e0b', '#ef4444'),
('Work', 'work', 'Careers, remote work, future of office.', '💼', '#64748b', '#64748b', '#334155');

-- Note: Add articles after authors exist, or run separate seed script.

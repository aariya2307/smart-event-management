-- Admin Users (Credentials: admin@test.com / password123)
MERGE INTO admin KEY(admin_id) VALUES
(1, 'Admin User', 'admin@test.com', 'password123', 'ADMIN', CURRENT_TIMESTAMP());

-- Events
MERGE INTO event (event_id, event_name, event_date, location, description, created_by) KEY(event_id) VALUES
(1, 'Tech Conference 2026', '2026-04-15', 'Convention Center', 'Annual technology conference featuring keynotes and workshops', 1);
MERGE INTO event (event_id, event_name, event_date, location, description, created_by) KEY(event_id) VALUES
(2, 'Student Orientation', '2026-03-20', 'Main Auditorium', 'New student orientation and campus tour', 1);
MERGE INTO event (event_id, event_name, event_date, location, description, created_by) KEY(event_id) VALUES
(3, 'Sports Day', '2026-05-10', 'Sports Complex', 'Inter-college sports competition', 1);
MERGE INTO event (event_id, event_name, event_date, location, description, created_by) KEY(event_id) VALUES
(4, 'Cultural Fest', '2026-06-01', 'Open Grounds', 'College cultural festival with performances and exhibitions', 1);
MERGE INTO event (event_id, event_name, event_date, location, description, created_by) KEY(event_id) VALUES
(5, 'Leadership Workshop', '2026-03-25', 'Conference Room A', 'Workshop on leadership and team management', 1);

-- Sample Participants
MERGE INTO participant KEY(participant_id) VALUES
(1, 'Aariya K', 'Computer Science', 3, 'aariyakulothumangan2307@gmail.com', '06374291986', CURRENT_TIMESTAMP());
MERGE INTO participant KEY(participant_id) VALUES
(2, 'Rahul Kumar', 'Information Technology', 2, 'rahul.kumar@college.edu', '9876543210', CURRENT_TIMESTAMP());
MERGE INTO participant KEY(participant_id) VALUES
(3, 'Priya Singh', 'Computer Science', 3, 'priya.singh@college.edu', '9123456789', CURRENT_TIMESTAMP());
MERGE INTO participant KEY(participant_id) VALUES
(4, 'Amit Patel', 'Electronics', 1, 'amit.patel@college.edu', '9988776655', CURRENT_TIMESTAMP());
MERGE INTO participant KEY(participant_id) VALUES
(5, 'Neha Desai', 'Mechanical', 4, 'neha.desai@college.edu', '9111222333', CURRENT_TIMESTAMP());


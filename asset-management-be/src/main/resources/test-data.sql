-- location data
insert into location (id, location_name) 
values (1, 'Ha Noi'), (2, 'Da Nang'), (3, 'HCM');

-- categogy data
insert into category (id, category_name, category_prefix) 
values (1, 'Laptop', 'LA'), (2, 'Monitor', 'MO'), (3, 'Personal Computer', 'PC'), (4, 'Iphone', 'IP');

-- asset data
insert into asset (id, asset_code, asset_name, installed_date, specification, state, category_id, location_id) 
values 
(1, 'LA000001', 'Dell Inspiron 15 3511', '2021-10-25 00:00:00', 'Persistent heuristic paradigm', 'Available', 1, 3),
(2, 'LA000002', 'Dell Inspiron 14', '2021-07-30 00:00:00', 'Networked non-volatile data-warehouse', 'Available', 2, 2),
(3, 'LA000003', 'Dell Alienware x17 R1', '2021-10-08 00:00:00', 'Virtual object-oriented middleware', 'Available', 1, 2),
(4, 'IP000004', 'iPhone 8 Plus', '2020-12-02 00:00:00', 'Switchable static help-desk', 'Not Available', 3, 2),
(5, 'IP000005', 'iPhone X', '2021-04-11 00:00:00', 'Enterprise-wide system-worthy infrastructure', 'Not Available', 1, 1),
(6, 'IP000006', 'iPhone XR', '2021-06-12 00:00:00', 'Fully-configurable zero defect forecast', 'Not Available', 1, 3),
(7, 'LA000007', 'ThinkPad E15 (Gen 2)', '2021-08-09 00:00:00', 'Profound secondary utilisation', 'Available', 2, 3),
(8, 'LA000008', 'ThinkPad X1 Carbon Gen 9', '2021-07-02 00:00:00', 'Function-based human-resource instruction set', 'Available', 4, 1),
(9, 'MO000009', '4K Hub: Samsung S80A', '2021-03-12 00:00:00', 'Networked 6th generation groupware', 'Available', 1, 1),
(10, 'MO000010', 'Samsung SD850', '2021-09-20 00:00:00', 'User-centric bandwidth-monitored challenge', 'Available', 4, 3),
(11, 'PC000011', 'HP Z4 G4 workstation', '2021-03-12 00:00:00', 'Optional bandwidth-monitored hierarchy', 'Not Available', 2, 1),
(12, 'PC000012', 'Dell XPS 8940', '2021-07-15 00:00:00', 'Team-oriented solution-oriented solution', 'Not Available', 4, 3);

-- user data
insert into user (id, birth_date, disable, first_name, gender, joined_date, last_name, staff_code, type, password, username, location_id) 
values
(1, '1991-12-22 03:59:31', 0, 'An', 'Female', '2019-09-11 12:56:54', 'Nguyen Thuy', 'SD001', 'Staff', 'staff', 'annt', 1),
(2, '1991-10-10 00:54:30', 1, 'An', 'Female', '2019-08-21 19:18:44', 'Tran Van', 'SD002','Staff',  'staff', 'antv', 2),
(3, '1991-02-09 16:36:01', 1, 'Binh', 'Male', '2019-08-31 01:45:51', 'Nguyen Van', 'SD003','Admin',  'admin', 'binhnv', 3),
(4, '1994-11-05 23:18:59', 0, 'Binh', 'Female', '2019-11-23 18:02:10', 'Nguyen Van', 'SD004','Staff',  'staff', 'binhnv1', 1),
(5, '1992-01-05 14:23:13', 1, 'Binh', 'Male', '2019-10-09 23:58:08', 'Nguyen Van', 'SD005','Staff',  'staff', 'binhnv2', 3),
(6, '1998-06-12 17:00:28', 1, 'Binh', 'Female', '2019-09-14 05:49:36', 'Nguyen Van', 'SD006','Staff',  'staff', 'binhnv3', 1),
(7, '1998-07-04 13:23:05', 0, 'Binh', 'Female', '2019-11-02 07:22:17', 'Nguyen Van', 'SD007','Staff',  'staff', 'binhnv4', 2),
(8, '1997-05-03 18:14:20', 0, 'Binh', 'Male', '2019-09-26 17:02:54', 'Nguyen Van','SD008','Staff',  'staff', 'binhnv5', 2),
(9, '2000-09-10 16:10:40', 0, 'Binh', 'Female', '2019-08-20 01:06:25', 'Nguyen Van', 'SD009','Staff',  'staff', 'binhnv6', 1),
(10, '1993-06-21 07:19:24', 1, 'Binh', 'Male', '2019-05-07 18:46:13', 'Nguyen Van', 'SD0010','Staff',  'staff', 'binhnv7', 1),
(11, '1992-09-12 02:33:12', 0, 'Binh', 'Female', '2019-03-09 08:08:18', 'Nguyen Van', 'SD0011','Staff',  'staff', 'binhnv8', 1),
(12, '1992-08-16 06:47:29', 1, 'Binh', 'Female', '2019-04-11 02:23:18', 'Nguyen Van', 'SD0012', 'Staff', 'staff', 'binhnv9', 1),
(13, '2000-03-15 00:17:52', 1, 'Binh', 'Female', '2019-07-19 23:40:21', 'Nguyen Van', 'SD0013','Staff',  'staff', 'binhnv10', 2),
(14, '1994-11-25 17:13:28', 1, 'Binh', 'Female', '2019-11-07 04:34:40', 'Nguyen Van', 'SD0014','Staff',  'staff', 'binhnv11', 2),
(15, '1997-12-31 15:02:17', 0, 'Binh', 'Female', '2019-07-11 17:45:01', 'Nguyen Van', 'SD0015','Staff',  'staff', 'binhnv12', 3),
(16, '1996-04-06 07:05:55', 0, 'Binh', 'Female', '2019-01-03 08:57:41', 'Nguyen Van', 'SD0016','Staff',  'staff', 'binhnv13', 2),
(17, '1998-07-20 02:52:41', 1, 'Binh', 'Female', '2019-09-06 09:41:55', 'Nguyen Van', 'SD0017', 'Staff', 'staff', 'binhnv14', 1),
(18, '1992-03-02 09:46:45', 0, 'Binh', 'Male', '2019-12-23 18:22:36', 'Nguyen Van', 'SD0018','Staff',  'staff', 'binhnv15', 2),
(19, '1996-02-08 17:47:40', 0, 'Binh', 'Male', '2018-07-30 01:01:25', 'Nguyen Van','SD0019','Staff',  'staff', 'binhnv16', 3),
(20, '1998-01-20 11:51:22', 0, 'Binh', 'Male', '2018-11-30 07:46:34', 'Nguyen Van', 'SD0020','Staff',  'staff', 'binhnv17', 2),
(21, '1993-07-12 11:12:15', 1, 'Binh', 'Female', '2018-06-27 00:56:07', 'Nguyen Van', 'SD0021','Staff',  'staff', 'binhnv18', 2),
(22, '1994-11-05 18:17:42', 0, 'Binh', 'Male', '2018-07-10 09:24:36', 'Nguyen Van', 'SD0022','Staff',  'staff', 'binhnv19', 3),
(23, '1995-10-25 02:31:37', 0, 'Binh', 'Female', '2018-08-28 04:45:06', 'Nguyen Van', 'SD0023','Staff',  'staff', 'binhnv20', 3),
(24, '1994-10-27 14:13:56', 0, 'Binh', 'Female', '2018-12-06 01:12:18', 'Nguyen Van', 'SD0024','Staff',  'staff', 'binhnv21', 3),
(25, '1995-10-12 20:23:18', 1, 'Binh', 'Female', '2018-05-30 11:46:56','Nguyen Van', 'SD0025','Staff',  'staff', 'binhnv22', 3),
(26, '1993-01-16 18:41:27', 1, 'Binh', 'Male', '2018-03-26 07:09:16', 'Nguyen Van', 'SD0026','Staff',  'staff', 'binhnv23', 1),
(27, '1993-01-04 07:41:52', 1, 'Binh', 'Female', '2018-11-04 19:52:45', 'Nguyen Van', 'SD0027','Staff',  'staff', 'binhnv24', 2),
(28, '1996-06-16 21:38:38', 0, 'Binh', 'Female', '2018-02-13 20:17:09', 'Nguyen Van', 'SD0028','Staff',  'staff', 'binhnv25', 3),
(29, '1997-04-12 22:24:04', 1, 'Binh', 'Female', '2018-03-04 06:36:50', 'Nguyen Van', 'SD0029','Staff',  'staff', 'binhnv26', 1),
(30, '1996-02-19 09:40:49', 1, 'Binh', 'Female', '2018-05-11 09:13:53', 'Nguyen Van', 'SD0030','Staff',  'staff', 'binhnv27', 2);

-- assignment data 
insert into assignment (id, assigned_date, note, returned_date, state, accepted_by, asset_id, assign_by, assign_to, request_by) 
values
(1, '2021-02-22 10:16:51', 'Diverse cohesive superstructure', '2021-04-16 10:27:07', 'Accepted', null, 1, 3, 1, null),
(2, '2021-01-15 08:23:00', 'Down-sized analyzing interface', '2021-03-19 14:46:31', 'Waiting for acceptance', null, 9, 3, 2, null),
(3, '2021-01-15 08:23:00', 'Down-sized analyzing interface', '2021-03-19 14:46:31', 'Waiting for returning', null, 10, 2, 2, 6),
(4, '2021-01-15 08:23:00', 'Down-sized analyzing interface', '2021-03-19 14:46:31', 'Completed', 2, 11, 3, 2, 3);






-- Tạo bảng RegisterForm (Đăng ký)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RegisterForm')
BEGIN
    CREATE TABLE RegisterForm (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã đăng ký
        full_name NVARCHAR(255) NOT NULL,             -- Họ và tên
        gender NVARCHAR(50),                         -- Giới tính
        birth_date DATE,                             -- Ngày sinh
        birth_place NVARCHAR(255),                   -- Nơi sinh
        address NVARCHAR(255),                       -- Địa chỉ
        phone NVARCHAR(50),                          -- Số điện thoại
        email NVARCHAR(255),                         -- Email
        facebook NVARCHAR(255),                      -- Facebook
        school NVARCHAR(255),                        -- Trường học
        course NVARCHAR(255),                        -- Khóa học (lưu dưới dạng chuỗi)
        study_time NVARCHAR(255),                    -- Thời gian học
        test_date DATE,                              -- Ngày thi
        start_date DATE,                             -- Ngày bắt đầu
        referral NVARCHAR(255)                       -- Người giới thiệu
    );
END;
GO

-- Tạo bảng Posts (Bài viết)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Posts')
BEGIN
    CREATE TABLE Posts (
        id INT IDENTITY(1,1) PRIMARY KEY,         -- Mã bài viết
        title NVARCHAR(255) NOT NULL,              -- Tiêu đề bài viết
        content NVARCHAR(MAX) NOT NULL,           -- Nội dung bài viết
        summary NVARCHAR(MAX),                    -- Tóm tắt bài viết
        category NVARCHAR(255),                   -- Danh mục bài viết
        image VARBINARY(MAX),                     -- Ảnh (nếu có)
        created_at DATETIME DEFAULT GETDATE()     -- Thời gian tạo
    );
END;
GO

-- Tạo bảng giới thiệu về trung tâm
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'introduce')
BEGIN
    CREATE TABLE introduce (
        id INT IDENTITY(1,1) PRIMARY KEY,            -- Mã giới thiệu
        content NVARCHAR(MAX) NOT NULL,              -- Nội dung giới thiệu
        created_at DATETIME DEFAULT GETDATE(),       -- Thời gian tạo
        updated_at DATETIME DEFAULT GETDATE()        -- Thời gian cập nhật
    );
END;
GO

-- Bảng sự kiện thể thao, vui chơi của trung tâm
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'event_centre')
BEGIN
    CREATE TABLE event_centre (
        id INT IDENTITY(1,1) PRIMARY KEY,         -- Mã bài viết
        title NVARCHAR(255) NOT NULL,              -- Tiêu đề bài viết
        content NVARCHAR(MAX) NOT NULL,           -- Nội dung bài viết
        summary NVARCHAR(MAX),                    -- Tóm tắt bài viết
        image VARBINARY(MAX),                     -- Ảnh (nếu có)
        created_at DATETIME DEFAULT GETDATE()     -- Thời gian tạo
    );
END;
GO

-- Bảng chính sách du học
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'studyabroad_info')
BEGIN
    CREATE TABLE studyabroad_info (
        id INT IDENTITY(1,1) PRIMARY KEY,         -- Mã bài viết
        title NVARCHAR(255) NOT NULL,              -- Tiêu đề bài viết
        content NVARCHAR(MAX) NOT NULL,           -- Nội dung bài viết
        summary NVARCHAR(MAX),                    -- Tóm tắt bài viết
        category NVARCHAR(255),                   -- Danh mục bài viết
        image VARBINARY(MAX),                     -- Ảnh (nếu có)
        created_at DATETIME DEFAULT GETDATE()     -- Thời gian tạo
    );
END;
GO

-- Bảng English 24/7
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'english')
BEGIN
    CREATE TABLE english (
        id INT IDENTITY(1,1) PRIMARY KEY,         -- Mã bài viết
        title NVARCHAR(255) NOT NULL,              -- Tiêu đề bài viết
        content NVARCHAR(MAX) NOT NULL,           -- Nội dung bài viết
        summary NVARCHAR(MAX),                    -- Tóm tắt bài viết
        category NVARCHAR(255),                   -- Danh mục bài viết
        image VARBINARY(MAX),                     -- Ảnh (nếu có)
        fileData VARBINARY(MAX),                   -- Dữ liệu tệp đính kèm (nếu có)
        created_at DATETIME DEFAULT GETDATE()     -- Thời gian tạo
    );
END;
GO

-- Bảng thông tin lịch khai giảng, lịch học
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ielts_journey')
BEGIN
    CREATE TABLE ielts_journey (
        id INT IDENTITY(1,1) PRIMARY KEY,             -- Mã bài viết
        title NVARCHAR(255) NOT NULL,                 -- Tiêu đề bài viết
        content NVARCHAR(MAX) NOT NULL,              -- Nội dung bài viết
        summary NVARCHAR(255),                       -- Tóm tắt bài viết
        category NVARCHAR(255),                      -- Danh mục bài viết
        created_at DATETIME DEFAULT GETDATE()        -- Thời gian tạo
    );
END;
GO

-- Bảng ảnh liên kết với IELTS journey
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ielts_journey_images')
BEGIN
    CREATE TABLE ielts_journey_images (
        id INT IDENTITY(1,1) PRIMARY KEY,        -- Mã ảnh
        journey_id INT NOT NULL,                  -- Liên kết với bài viết
        image VARBINARY(MAX) NOT NULL,            -- Ảnh
        created_at DATETIME DEFAULT GETDATE(),   -- Thời gian tạo
        FOREIGN KEY (journey_id) REFERENCES ielts_journey(id)  -- Khóa ngoại đến bảng ielts_journey
    );
END;
GO

select * from ielts_journey_images

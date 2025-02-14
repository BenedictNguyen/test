const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const config = {
    user: 'sa',
    password: '123456',
    server: 'HP-LAPTOP',
    database: 'UNIGLOBE',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let pool;

mssql.connect(config)
    .then(p => {
        pool = p;
        console.log('Kết nối thành công đến SQL Server!');
    })
    .catch(err => {
        console.error('Lỗi kết nối đến SQL Server:', err);
    });

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 

app.post('/register', async (req, res) => {
    const formData = req.body;

    try {
        const request = pool.request();
        request.input('fullName', mssql.NVarChar, formData.fullName);
        request.input('gender', mssql.NVarChar, formData.gender);
        request.input('birthDate', mssql.Date, formData.birthDate);
        request.input('birthPlace', mssql.NVarChar, formData.birthPlace);
        request.input('address', mssql.NVarChar, formData.address);
        request.input('phone', mssql.NVarChar, formData.phone);
        request.input('email', mssql.NVarChar, formData.email);
        request.input('facebook', mssql.NVarChar, formData.facebook);
        request.input('school', mssql.NVarChar, formData.school);
        request.input('course', mssql.NVarChar, formData.course.join(', '));
        request.input('studyTime', mssql.NVarChar, formData.studyTime);
        request.input('testDate', mssql.Date, formData.testDate);
        request.input('startDate', mssql.Date, formData.startDate);
        request.input('referral', mssql.NVarChar, formData.referral);

        const query = `INSERT INTO RegisterForm (full_name, gender, birth_date, birth_place, address, phone, email, facebook, school, course, study_time, test_date, start_date, referral)
                       VALUES (@fullName, @gender, @birthDate, @birthPlace, @address, @phone, @email, @facebook, @school, @course, @studyTime, @testDate, @startDate, @referral)`;

        await request.query(query);

        res.status(200).json({ message: 'Đăng ký thành công!' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.' });
    }
});

app.post('/api/posts', async (req, res) => {
    const { title, content, summary, category, image_url } = req.body;

    try {
        let imageBinary = null;
        if (image_url) {
            imageBinary = Buffer.from(image_url, 'base64');
        }

        const request = pool.request()
            .input('title', mssql.NVarChar, title)
            .input('content', mssql.NVarChar, content)
            .input('summary', mssql.NVarChar, summary)
            .input('category', mssql.NVarChar, category)
            .input('image', mssql.VarBinary, imageBinary);

        await request.query('INSERT INTO Posts (Title, Content, Summary, Category, image) VALUES (@title, @content, @summary, @category, @image)');
        res.status(200).send({ message: 'Bài viết đã được đăng!' });
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi đăng bài viết!' });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM Posts');

        // Chuyển đổi dữ liệu ảnh sang Base64 để gửi về frontend
        const postsWithBase64Image = result.recordset.map(post => {
            if (post.image) {
                post.image_url = `data:image/jpeg;base64,${post.image.toString('base64')}`;
            }
            return post;
        });

        res.status(200).json(postsWithBase64Image);
    } catch (error) {
        console.error('Error fetching posts from SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết!' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        await request.query('DELETE FROM Posts WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được xóa thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa bài viết!' });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);
        await request.query('UPDATE Posts SET content = @content WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được cập nhật thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài viết!' });
    }
});

app.post('/api/introduce', async (req, res) => {
    const { content } = req.body;

    try {
        const request = pool.request()
            .input('content', mssql.NVarChar, content);

        await request.query('INSERT INTO introduce (Content) VALUES (@content)');
        res.status(200).send({ message: 'Bài viết đã được đăng!' });
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi đăng bài viết!' });
    }
});

app.get('/api/introduce', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM introduce ORDER BY created_at DESC');

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching intro content', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết giới thiệu!' });
    }
});


app.delete('/api/introduce/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        await request.query('DELETE FROM introduce WHERE id = @id');
        res.status(200).json({ message: 'Bài viết giới thiệu đã được xóa thành công!' });
    } catch (error) {
        console.error('Error deleting intro content', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết giới thiệu!' });
    }
});

app.put('/api/introduce/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);

        await request.query('UPDATE introduce SET content = @content, updated_at = GETDATE() WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được cập nhật!' });
    } catch (error) {
        console.error('Error updating intro content', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật bài viết!' });
    }
});

// Các bài viết tiếng anh
app.post('/api/english', async (req, res) => {
    const { title, content, summary, category, image_url, fileData } = req.body;

    try {
        let imageBinary = null;
        if (image_url) {
            imageBinary = Buffer.from(image_url, 'base64');
        }

        const request = pool.request()
            .input('title', mssql.NVarChar, title)
            .input('content', mssql.NVarChar, content)
            .input('summary', mssql.NVarChar, summary)
            .input('category', mssql.NVarChar, category)
            .input('image', mssql.VarBinary, imageBinary)
            .input('fileData', mssql.VarBinary, fileDataBinary)

        await request.query('INSERT INTO english (title, content, summary, category, image, fileData) VALUES (@title, @content, @summary, @category, @image, @fileData)');
        res.status(200).send({ message: 'Bài viết đã được đăng!' });
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi đăng bài viết!' });
    }
});

app.get('/api/english', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM english');

        // Chuyển đổi dữ liệu ảnh sang Base64 để gửi về frontend
        const postsWithBase64Image = result.recordset.map(post => {
            if (post.image) {
                post.image_url = `data:image/jpeg;base64,${post.image.toString('base64')}`;
            }
            return post;
        });

        res.status(200).json(postsWithBase64Image);
    } catch (error) {
        console.error('Error fetching posts from SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết!' });
    }
});

app.delete('/api/english/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        await request.query('DELETE FROM english WHERE id = @id');
        res.status(200).json({ message: 'English post has been successfully deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while deleting English post!' });
    }
});

app.put('/api/english/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);
        await request.query('UPDATE english SET content = @content WHERE id = @id');
        res.status(200).json({ message: 'English post has been successfully updated!' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while updating English post!' });
    }
});

// Các bài viết về sự kiện của trung tâm: Vui chơi, thể thao
app.post('/api/event_centre', async (req, res) => {
    const {title, content, summary, image_url } = req.body;

    try {
        let imageBinary = null;
        if (image_url) {
            imageBinary = Buffer.from(image_url, 'base64');
        }

        const request = pool.request()
            .input('title', mssql.NVarChar, title)
            .input('content', mssql.NVarChar, content)
            .input('summary', mssql.NVarChar, summary)
            .input('image', mssql.VarBinary, imageBinary)
        
        await request.query('INSERT INTO event_centre (title, content, summary , image) VALUES (@title, @content, @summary, @image)');   
        res.status(200).send({message: 'Bài viết đã được đăng!'});
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Error occurred while creating English post!' });
    }
});

app.get('/api/event_centre', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM event_centre');

        // Chuyển đổi dữ liệu ảnh sang Base64 để gửi về frontend
        const postsWithBase64Image = result.recordset.map(post => {
            if (post.image) {
                post.image_url = `data:image/jpeg;base64,${post.image.toString('base64')}`;
            }
            return post;
        });

        res.status(200).json(postsWithBase64Image);
    } catch (error) {
        console.error('Error fetching event_centre from SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết!' });
    }
});

app.put('/api/event_centre/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);
        await request.query('UPDATE event_centre SET content = @content WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được cập nhật thành công!' });
    } catch (error) {
        console.error('Error updating article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật bài viết!' });
    }
});

app.delete('/api/event_centre/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        await request.query('DELETE FROM event_centre WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được xóa thành công!' });
    } catch (error) {
        console.error('Error deleting article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết!' });
    }
});

// Các bài viết về chính sách du học các nước
app.post('/api/studyabroad_info', async (req, res) => {
    const {title, content, summary,category, image_url } = req.body;

    try {
        let imageBinary = null;
        if (image_url) {
            imageBinary = Buffer.from(image_url, 'base64');
        }

        const request = pool.request()
            .input('title', mssql.NVarChar, title)
            .input('content', mssql.NVarChar, content)
            .input('summary', mssql.NVarChar, summary)
            .input('category', mssql.NVarChar, category)
            .input('image', mssql.VarBinary, imageBinary)
        
        await request.query('INSERT INTO studyabroad_info (title, content, summary, category , image) VALUES (@title, @content, @summary, @category, @image)');   
        res.status(200).send({message: 'Bài viết đã được đăng!'});
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Error occurred while creating English post!' });
    }
});

app.get('/api/studyabroad_info', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM studyabroad_info');

        // Chuyển đổi dữ liệu ảnh sang Base64 để gửi về frontend
        const postsWithBase64Image = result.recordset.map(post => {
            if (post.image) {
                post.image_url = `data:image/jpeg;base64,${post.image.toString('base64')}`;
            }
            return post;
        });

        res.status(200).json(postsWithBase64Image);
    } catch (error) {
        console.error('Error fetching articles from SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết!' });
    }
});

app.put('/api/studyabroad_info/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);
        await request.query('UPDATE studyabroad_info SET content = @content WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được cập nhật thành công!' });
    } catch (error) {
        console.error('Error updating article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật bài viết!' });
    }
});

app.delete('/api/studyabroad_info/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        await request.query('DELETE FROM studyabroad_info WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được xóa thành công!' });
    } catch (error) {
        console.error('Error deleting article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết!' });
    }
});

// Các bài viết về lịch khai giảng
app.post('/api/ielts_journey', async (req, res) => {
    const { title, content, summary, category, image_url } = req.body;

    try {
        let imageBinary = null;
        if (image_url) {
            imageBinary = Buffer.from(image_url, 'base64');
        }

        // Thêm bài viết vào bảng ielts_journey
        const request = pool.request()
            .input('title', mssql.NVarChar, title)
            .input('content', mssql.NVarChar, content)
            .input('summary', mssql.NVarChar, summary)
            .input('category', mssql.NVarChar, category);

        const result = await request.query('INSERT INTO ielts_journey (title, content, summary, category) OUTPUT INSERTED.id VALUES (@title, @content, @summary, @category)');

        const journeyId = result.recordset[0].id;

        // Thêm ảnh vào bảng ielts_journey_images nếu có
        if (imageBinary) {
            const imageRequest = pool.request()
                .input('journey_id', mssql.Int, journeyId)
                .input('image', mssql.VarBinary, imageBinary);

            await imageRequest.query('INSERT INTO ielts_journey_images (journey_id, image) VALUES (@journey_id, @image)');
        }

        res.status(200).send({ message: 'Bài viết đã được đăng!' });
    } catch (error) {
        console.error('Error posting data to SQL Server', error);
        res.status(500).send({ message: 'Error occurred while creating IELTS journey post!' });
    }
});

// Lấy tất cả các bài viết về lịch khai giảng
app.get('/api/ielts_journey', async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM ielts_journey');

        // Lấy ảnh liên kết với từng bài viết
        const postsWithImages = await Promise.all(result.recordset.map(async (post) => {
            const imageRequest = pool.request();
            const imageResult = await imageRequest.input('journey_id', mssql.Int, post.id)
                .query('SELECT image FROM ielts_journey_images WHERE journey_id = @journey_id');

            if (imageResult.recordset.length > 0) {
                post.image_url = `data:image/jpeg;base64,${imageResult.recordset[0].image.toString('base64')}`;
            }

            return post;
        }));

        res.status(200).json(postsWithImages);
    } catch (error) {
        console.error('Error fetching articles from SQL Server', error);
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy dữ liệu bài viết!' });
    }
});

// Cập nhật bài viết
app.put('/api/ielts_journey/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        request.input('content', mssql.NVarChar, content);
        await request.query('UPDATE ielts_journey SET content = @content WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được cập nhật thành công!' });
    } catch (error) {
        console.error('Error updating article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật bài viết!' });
    }
});

// Xóa bài viết
app.delete('/api/ielts_journey/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = pool.request();
        request.input('id', mssql.Int, id);
        // Xóa ảnh liên quan đến bài viết
        await request.query('DELETE FROM ielts_journey_images WHERE journey_id = @id');
        // Xóa bài viết
        await request.query('DELETE FROM ielts_journey WHERE id = @id');
        res.status(200).json({ message: 'Bài viết đã được xóa thành công!' });
    } catch (error) {
        console.error('Error deleting article', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết!' });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});

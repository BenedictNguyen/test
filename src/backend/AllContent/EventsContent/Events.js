import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Create, Delete } from '@mui/icons-material';
import apiUrls from '../../mockAPI';
import '../EventsContent/Events.css';

const SchoolSystem = () => {
    const [intro, setIntro] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        const fetchIntro = async () => {
            try {
                const response = await axios.get(apiUrls.otherContent);
                setIntro(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchIntro();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrls.otherContent}/${id}`);
            setIntro(intro.filter(post => post.id !== id));
            alert("Bài viết đã được xóa!");
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };

    const handleEdit = (post) => {
        setIsEditing(true);
        setEditPost(post);
    };

    const handleUpdate = async () => {
        if (editPost.content.trim() === "") {
            alert("Nội dung không được để trống!");
            return;
        }

        try {
            await axios.put(`${apiUrls.otherContent}/${editPost.id}`, { content: editPost.content });
            setIntro(intro.map(post => post.id === editPost.id ? { ...post, content: editPost.content } : post));
            alert("Bài viết đã được cập nhật!");
            setIsEditing(false);
            setEditPost(null);
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    };

    return (
        <div className="postList">
            {isEditing ? (
                <div className="editPost">
                    <textarea
                        placeholder="Sửa bài viết..."
                        value={editPost.content}
                        onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                    />
                    <div className="buttonGroup">
                        <button onClick={handleUpdate} className="updateButton">Cập Nhật</button>
                        <button onClick={() => { setIsEditing(false); setEditPost(null); }} className="cancelButton">Hủy</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="postItem headerRow">
                        <div className="postColumn idColumn">ID</div>
                        <div className="postColumn titleColumn">TIÊU ĐỀ</div> {/* Thêm cột tiêu đề */}
                        <div className="postColumn contentColumn1">HÌNH ẢNH</div>
                        <div className="postColumn contentColumn1">TÓM TẮT</div>
                        <div className="postColumn actionsColumn">CẬP NHẬT</div>
                    </div>
    
                    {intro.length > 0 ? (
                        intro.map((post) => (
                            <div key={post.id} className="postItem">
                                <div className="postColumn idColumn">{post.id}</div>
                                <div className="postColumn titleColumn">{post.title}</div> {/* Thêm dữ liệu cho tiêu đề */}
                                <div className="postColumn contentColumn1">
                                    <img src={post.image_url} alt="Post Image" style={{ maxWidth: "100px", height: "auto" }} />
                                </div>
                                <div className="postColumn contentColumn1">{post.summary}</div>
                                <div className="postColumn actionsColumn">
                                    <button onClick={() => handleEdit(post)} className="editButton">
                                        <Create />
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="deleteButton">
                                        <Delete />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có bài viết nào.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SchoolSystem;
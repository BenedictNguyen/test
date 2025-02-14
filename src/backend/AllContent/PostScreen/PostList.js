import React from 'react';
import './PostList.css';

const PostList = ({ posts }) => {
    return (
        <div className="postList">
            <div className="postItem headerRow">
                <div className="postColumn titleColumn">TIÊU ĐỀ</div>
                <div className='postColumn contentColumn1'>NỘI DUNG</div>
                <div className="postColumn imageColumn">ẢNH</div>
                <div className="postColumn categoryColumn">CHUYÊN MỤC</div>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="postItem">
                        <div className="postColumn titleColumn">{post.title}</div>
                        <div className="postColumn contentColumn1">{post.content}</div>
                        <div className="postColumn imageColumn">
                            {post.image ? <img src={post.image} alt="post" /> : 'Không có ảnh'}
                        </div>
                        <div className="postColumn categoryColumn">{post.category}</div>
                    </div>
                ))
            ) 
            : (
                <p>Không có bài viết nào.</p>
            )}
        </div>
    );
};

export default PostList;

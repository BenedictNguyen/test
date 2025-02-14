import axios from 'axios';
import apiUrls from '../../../backend/mockAPI';

export const handleEventSubmit = async (postData, fetchPosts) => {
    if (!postData.title && !postData.content) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    try {
        await axios.post(apiUrls.otherContent, postData);
        alert('Bài viết đã được đăng!');
        fetchPosts();
    } catch (error) {
        console.error('Error posting data', error);
    }
};

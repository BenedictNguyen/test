import axios from 'axios';
import apiUrls from '../../../backend/mockAPI';  // Cấu trúc apiUrls tùy thuộc vào ứng dụng của bạn

export const handleSaveIntro = async (postData, fetchPosts) => {
    if (postData.content) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    try {
        await axios.post(apiUrls.introCentre, postData);
        alert('Bài viết đã được đăng!');
        fetchPosts();
    } catch (error) {
        console.error('Error posting data', error);
    }
};

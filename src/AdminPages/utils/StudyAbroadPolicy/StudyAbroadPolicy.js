import axios from 'axios';
import apiUrls from '../../../backend/mockAPI';

export const handleStudyAbroadPolicy = async (postData, fetchPosts) => {
    try {
        await axios.post(apiUrls.studyAbroadPolicy, postData);
        alert('Bài viết đã được đăng!');
        fetchPosts();
    } catch (error) {
        console.error('Error posting data', error);
    }
};

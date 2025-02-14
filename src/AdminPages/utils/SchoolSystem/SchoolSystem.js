import axios from 'axios';
import apiUrls from '../../../backend/mockAPI'; 

export const handleSchoolSystem = async (postData, fetchPosts) => {
    try {
        await axios.post(apiUrls.schoolSystem, postData);
        alert('Bài viết đã được đăng!');
        fetchPosts();
    } catch (error) {
        console.error('Error posting data', error);
    }
};

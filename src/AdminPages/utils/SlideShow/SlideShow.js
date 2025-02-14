import axios from 'axios';
import apiUrls from '../../../backend/mockAPI';

export const uploadImage = async (selectedImage, setImageData) => {
    if (!selectedImage) {
        alert("Chọn hình ảnh để tải lên.");
        return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
        const response = await fetch(apiUrls.otherContent, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const imageInfo = await response.json();
            setImageData((prevImageData) => [...prevImageData, imageInfo]);
            alert("Hình ảnh đã được tải lên thành công!");
        } else {
            alert("Tải hình ảnh lên thất bại.");
        }
    } catch (error) {
        alert("Có lỗi xảy ra khi tải hình ảnh lên.");
        console.error(error);
    }
};

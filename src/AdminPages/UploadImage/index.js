// Convert to Base64
export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);  // Trả về phần Base64
        reader.onerror = reject;
        reader.readAsDataURL(file);; 
});
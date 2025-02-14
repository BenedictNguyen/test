function changeSeason() {
    const date = new Date();
    const month = date.getMonth(); // Tháng (0-11)
  
    // Xóa lớp mùa cũ (nếu có)
    document.body.classList.remove('spring', 'summer', 'autumn', 'winter');
  
    let seasonClass = '';
  
    // Xác định mùa dựa trên tháng
    if (month >= 2 && month <= 4) {
      seasonClass = 'spring'; // Xuân: tháng 3-5
    } else if (month >= 5 && month <= 7) {
      seasonClass = 'summer'; // Hạ: tháng 6-8
    } else if (month >= 8 && month <= 10) {
      seasonClass = 'autumn'; // Thu: tháng 9-11
    } else {
      seasonClass = 'winter'; // Đông: tháng 12-2
      createSnowflakes(); // Tạo hiệu ứng tuyết rơi
    }
  
    // Thêm lớp mùa hiện tại vào body
    document.body.classList.add(seasonClass);
  }
  
  function createSnowflakes() {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.classList.add('snowflakes');
    document.body.appendChild(snowflakesContainer);
  
    // Tạo 100 bông tuyết ngẫu nhiên
    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Thời gian rơi ngẫu nhiên
      snowflake.style.animationDelay = `${Math.random() * 10}s`; // Thời gian trễ ngẫu nhiên
      snowflakesContainer.appendChild(snowflake);
    }
  }
  
  // Gọi hàm changeSeason khi tải trang
  window.addEventListener('load', changeSeason);  
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Menu/menu.css';

const Menu = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(null);

    const handleMenuItemClick = (index) => {
        setIsSubmenuVisible(index === isSubmenuVisible ? null : index);
    };

    return (
        <div className="menuColumn">
            {/* Menu Item 1 */}
            <div className="menuItem">
                <button
                    className="menuButton"
                    onClick={() => handleMenuItemClick(1)}
                >
                    Giới thiệu
                    <span className="arrowDown">&#9662;</span>
                </button>
                {isSubmenuVisible === 1 && (
                    <div className="submenu">
                        <Link to="/gioithieu/Vechungtoi">
                            <button className="submenuButton">Uniglobe</button>
                        </Link>
                        <Link to="/">
                            <button className="submenuButton">Trang chủ</button>
                        </Link>
                        <button className="submenuButton">Tầm nhìn</button>
                    </div>
                )}
            </div>

            {/* Menu Item 2 */}
            <div className="menuItem">
                <button
                    className="menuButton"
                    onClick={() => handleMenuItemClick(2)}
                >
                    Du học
                    <span className="arrowDown">&#9662;</span>
                </button>
                {isSubmenuVisible === 2 && (
                    <div className="submenu">
                        <Link to="/du-hoc-my">
                            <button className="submenuButton">Du học Mỹ</button>
                        </Link>
                        <Link to="/du-hoc-canada">
                            <button className="submenuButton">Du học Canada</button>
                        </Link>
                        <Link to="/du-hoc-uc">
                            <button className="submenuButton">Du học Úc</button>
                        </Link>
                        <Link to="/du-hoc-singapore">
                            <button className="submenuButton">Du học Singapore</button>
                        </Link>
                    </div>
                
                )}
            </div>

            {/* Menu Item 3 */}
            <div className="menuItem">
                <button
                    className="menuButton"
                    onClick={() => handleMenuItemClick(3)}
                >
                    English 247
                    <span className="arrowDown">&#9662;</span>
                </button>
                {isSubmenuVisible === 3 && (
                    <div className="submenu">
                        <Link to="/khoa-hoc">
                            <button className="submenuButton">English Courses</button>
                        </Link>
                        <Link to="/detail/reading">
                            <button className="submenuButton">English Grammar</button>
                        </Link>
                        <Link to="/detail/reading">
                            <button className="submenuButton">IELTS Reading</button>
                        </Link>
                        <Link to="/detail/speaking">
                            <button className="submenuButton">IELTS Speaking</button>
                        </Link>
                        <Link to="/detail/listening">
                            <button className="submenuButton">IELTS Listening</button>
                        </Link>
                        <Link to="/detail/writing">
                            <button className="submenuButton">IELTS Writing</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Menu Item 4 */}
            <div className="menuItem">
                <button className="menuButton">TIN TỨC</button>
            </div>

            {/* Menu Item 5 */}
            <div className="menuItem">
                <Link to="/register/register-form">
                    <button className="menuButton">ĐĂNG KÝ</button>
                </Link>
            </div>
        </div>
    );
};

export default Menu;

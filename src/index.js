import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminScreen from './AdminPages/AdminScreen/AdminScreen';
import HomeScreen from './HomePages/HomeScreen';
import Reading from './IeltsDetailPages/Reading/Reading';
import Writing from './IeltsDetailPages/Writing/Writing';
import Speaking from './IeltsDetailPages/Speaking/Speaking';
import Listening from './IeltsDetailPages/Listening/Listening'
import About from './AboutCentrePages/About';
import Register from './RegisterForm/Register';
import SchoolSystem from './TintucDetail/SchoolSystem/SchoolSystem';
import EventsDetail from './TintucDetail/Events/Events';
import Information from './TintucDetail/Information/Information';
import Author from './AdminPages/Authorized/SignupScreen';
import Library from './Library/Library';
import ReadingDetail from './IeltsDetailPages/Reading/ReadingDetailPages/ReadingDetail';
import Courses from './Courses/Courses';
import CoursesDetail from './Courses/CoursesDetail/CoursesDetail';
import Canada from './StudyAbroad/Canada/index';
import USA from './StudyAbroad/USA/index';
import Aus from './StudyAbroad/Australia/index';
import Singapore from './StudyAbroad/Singapore/index'
import MyEditor from './components/ckeditor/ckeditor';
import Contact from './Contact/Contact';
import IeltsJourneys from './360IELTS/IeltsJourneys';
// The root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/Trangchu" element={<AdminScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/detail/reading" element={<Reading />} />
        <Route path="/detail/listening" element={<Listening/>} />
        <Route path="/detail/speaking" element={<Speaking/>} />
        <Route path="/detail/writing" element={<Writing/>} />
        <Route path="/gioithieu/Vechungtoi" element={<About/>} />
        <Route path="/register/register-form" element={<Register/>} />
        <Route path="/xemchitiet/schoolsystem/:id" element={<SchoolSystem/>} />
        <Route path="/xemchitiet/events/:id" element={<EventsDetail/>} />
        <Route path="/xemchitiet/information/:id" element={<Information/>} />
        <Route path="/admin" element={<Author/>} />
        <Route path="/library" element={<Library/>} />
        <Route path="/reading/detail" element={<ReadingDetail/>} />
        <Route path="/khoa-hoc" element={<Courses/>} />
        <Route path="/khoa-hoc/:courseId" element={<CoursesDetail/>} />
        <Route path="/du-hoc-canada" element={<Canada/>} />
        <Route path="/du-hoc-my" element={<USA/>} />
        <Route path="/du-hoc-uc" element={<Aus/>} />
        <Route path="/du-hoc-singapore" element={<Singapore/>} />
        <Route path="/cke" element={<MyEditor/>} />
        <Route path="/lien-he" element={<Contact/>} />
        <Route path="/:category" element={<IeltsJourneys/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
import React from 'react';
import {
  Carousel, Row, Col, Container,
} from 'react-bootstrap';
import CourseCard from '../Components/CourseCard/CourseCard.js';

export default function CoursePage() {
  const courses = [
    {
      courseName: 'Phát triển Web',
      courseId: 'INT3306_21',
      host: 'Lê Quang Nhật',
    },
    {
      courseName: 'Lý thuyết thông tin',
      courseId: 'INT2091_21',
      host: 'Lê Khôi',
    },
    {
      courseName: 'Xác suất thống kê',
      courseId: 'MAT2019_21',
      host: 'Đặng Cao Cường',
    },
    {
      courseName: 'Phân tích thiết kế hướng đối tượng',
      courseId: 'INT2028_21',
      host: 'Hạnh',
    },
    {
      courseName: 'Quản lý dự án',
      courseId: 'INT2021_21',
      host: 'Phạm Ngọc Hùng',
    },
    {
      courseName: 'Kiểm thử',
      courseId: 'INT1022_21',
      host: '?????????',
    },
  ];

  return (
    <>
      <h1>Recently Accessed Courses</h1>
      <Carousel key="carousel">
        {courses.map((course, index) => (
          <Carousel.Item key={index}>
            <img
              className="w-100"
              src={`holder.js/400x200?auto=yes&text=${course.courseName}&theme=${index % 2 === 0 ? 'sky' : 'industrial'}`}
            />
            <Carousel.Caption>
              <h3>{`${course.courseId}`}</h3>
              <p>{`Giảng viên: ${course.host}`}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <h1>All Course</h1>
      <div className="d-flex justify-content-between">
        <CourseCard courseName="Sample course_name" courseId="Sample course_id" />
        <CourseCard courseName="Phân tích thiết kế hướng đối tượng" courseId="INT2091_21" />
        <CourseCard courseName="Quản lý dự án phần mềm" courseId="INT3301_21" />
      </div>
    </>
  );
}

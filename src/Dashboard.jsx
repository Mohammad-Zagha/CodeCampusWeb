import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ApproveCourse = async (courseId, token) => {
  try {
    const headers = {
      token: token,
    };

    const response = await axios.patch(
      `http://localhost:3000/api/v1/Admin/approveCourse/${courseId}`,
      {},
      {
        headers,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const UnapproveCourse = async (courseId, token) => {
  try {
    const headers = {
      token: token,
    };

    const response = await axios.patch(
      `http://localhost:3000/api/v1/Admin/unapproveCourse/${courseId}`,
      {},
      {
        headers,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dashboard({ data }) {
  const [courses, setCourses] = useState(data.courses);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const token = Cookies.get("_auth");

  const handleApproveCourse = async (courseId) => {
    const result = await ApproveCourse(courseId, token);
    if (result) {
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, isApproved: true } : course
        )
      );
      setSnackbarMessage("Course approved successfully!");
      setSnackbarOpen(true);
    }
  };

  const handleUnapproveCourse = async (courseId) => {
    const result = await UnapproveCourse(courseId, token);
    if (result) {
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, isApproved: false } : course
        )
      );
      setSnackbarMessage("Course unapproved successfully!");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const approvedCourses = courses.filter((course) => course.isApproved);
  const unapprovedCourses = courses.filter((course) => !course.isApproved);

  return (
    <div className="p-5 space-y-8 ">
      {/* Summary Stats */}
      <div className="text-center flex justify-around ">
        <div className="bg-blue-200 rounded-full px-4 py-2">
          Total Users: {data.totalUsers}
        </div>
        <div className="bg-green-200 rounded-full px-4 py-2">
          Total Teachers: {data.totalTeachers}
        </div>
        <div className="bg-red-200 rounded-full px-4 py-2">
          Total Courses: {data.totalCourses}
        </div>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul className="bg-gray-100 rounded-lg p-4">
          {data.users.map((user) => (
            <li
              key={user.id}
              className="border-b last:border-b-0 py-2 flex items-center"
            >
              <img
                src={`data:${user.mainImage.contentType};base64,${user.mainImage.data}`}
                alt="User"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <span className="ml-4">{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Teachers List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Teachers</h2>
        <ul className="bg-gray-100 rounded-lg p-4">
          {data.teachers.map((teacher) => (
            <li
              key={teacher.id}
              className="border-b last:border-b-0 py-2 flex items-center"
            >
              <img
                src={`data:${teacher.mainImage.contentType};base64,${teacher.mainImage.data}`}
                alt="Teacher"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <span className="ml-4">{teacher.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Unapproved Courses List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Unapproved Courses</h2>
        <ul className="bg-gray-100 rounded-lg p-4">
          {unapprovedCourses.map((course) => (
            <li
              key={course.id}
              className="border-b last:border-b-0 py-2 flex items-center justify-between"
            >
              <div className="flex">
                <img
                  src={`data:${course.mainImage.contentType};base64,${course.mainImage.data}`}
                  alt="Course"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <span className="ml-4 mt-3">{course.name}</span>
              </div>
              <div className="mr-2">
                <button
                  onClick={() => handleApproveCourse(course.id)}
                  type="button"
                  className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Approved Courses List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Approved Courses</h2>
        <ul className="bg-gray-100 rounded-lg p-4">
          {approvedCourses.map((course) => (
            <li
              key={course.id}
              className="border-b last:border-b-0 py-2 flex items-center justify-between"
            >
              <div className="flex">
                <img
                  src={`data:${course.mainImage.contentType};base64,${course.mainImage.data}`}
                  alt="Course"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <span className="ml-4 mt-3">{course.name}</span>
              </div>
              <div className="mr-2">
                <button
                  onClick={() => handleUnapproveCourse(course.id)}
                  type="button"
                  className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc3545] transition duration-150 ease-in-out hover:bg-red-300 hover:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.3),0_4px_18px_0_rgba(220,53,69,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.3),0_4px_18px_0_rgba(220,53,69,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.3),0_4px_18px_0_rgba(220,53,69,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,53,69,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.2),0_4px_18px_0_rgba(220,53,69,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.2),0_4px_18px_0_rgba(220,53,69,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,53,69,0.2),0_4px_18px_0_rgba(220,53,69,0.1)]"
                >
                  Unapprove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Dashboard;

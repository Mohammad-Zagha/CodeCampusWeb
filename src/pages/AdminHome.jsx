import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Dashboard from "../Dashboard";
import NavBar from "../Components/NavBar";
const fetchData = async (token) => {
  try {
    console.log("Fetching");
    const headers = {
      token: token,
    };

    const response = await axios.get(
      "http://localhost:3000/api/v1/Admin/viewAllUsersAndTeachersAndCourses",
      {
        headers,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

function AdminHome() {
  const token = Cookies.get("_auth");
  const { status, data, error } = useQuery({
    queryKey: ["PlatData"],
    queryFn: () => fetchData(token),
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  } else {
    return (
      <div className="flex  flex-col justify-start  h-screen w-screen">
        <NavBar index={0} />
        <Dashboard data={data} />
      </div>
    );
  }
}

export default AdminHome;

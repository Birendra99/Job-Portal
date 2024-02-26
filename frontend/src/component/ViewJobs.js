import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { IoBag } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BiTask } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import Footer from "./Footer";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
// import { getJobsByStatus } from './services/jobService'; // Assuming you have a service to fetch jobs
import { format } from "date-fns";
import { toast } from "react-toastify";
import { FaMoneyBill } from "react-icons/fa";

function ViewJobs() {
  const { userInfo } = useSelector((state) => state.signIn);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    if (userInfo) {
      getSingleUser();
    }
  }, [userInfo]);

  const getSingleUser = async () => {
    try {
      const res = await axios.get(`/api/user/${userInfo.user._id}`);
      setSingleUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (singleUser) {
      const _data = singleUser?.jobsHistory;
       setAppliedJobs(_data?.map((e) => e?.title));
    }
  }, [singleUser]);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!userInfo) {
  //       navigate("/");
  //     }
  //   }, []);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await axios.get("/api/jobs/all"); // Implement getJobsByStatus according to your API
      setJobs(jobsData.data.data);
      // setJobs(jobsData.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateCreated = (val) => {
    const _date = new Date(val);
    const dateString = _date.toISOString().slice(0, 10); // "2024-02-14"
    console.log(dateString);
    return dateString;
  };

  const filterJobs = () => {
    const _data = jobs;
    if (search !== "") {
      const _filteredJobs = _data.filter((job) => {
        // Check if the job title contains the search term
        return job.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredJobs(_filteredJobs);
    } else {
      setFilteredJobs(_data);
    }
  };

  const filterLocation = () => {
    const _data = jobs;
    if (selectedLocation !== "" && selectedLocation !== "Location...") {
      const _filteredJobs = _data.filter((job) => {
        // Check if the job title contains the search term
        return job.location === selectedLocation;
      });
      setFilteredJobs(_filteredJobs);
    } else if (selectedLocation === "Location...") {
      setFilteredJobs(_data);
    }
  };
  useEffect(() => {
    filterJobs();
  }, [search]);
  useEffect(() => {
    filterLocation();
  }, [selectedLocation]);
  useEffect(() => {
    if (jobs) {
      setFilteredJobs(jobs);
    }
    setAllLocations(jobs.map((e) => e.location));
  }, [jobs]);

  const applyJob = async (val) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/jobhistory",
        {
          title: val?.title,
          description: val?.description,
          salary: val?.salary,
          location: val?.location,
          qualification: val?.location,

          _id: userInfo?.user?._id,
        }
      );
      getSingleUser();

      toast.success("Job applied successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    "Loading"
  ) : (
    <div>
      <Navbar />
      <div className="containejmr">
        <div className="back-img justify-content-center p-5">
          <form action="more_view.jsp" method="get">
            <div className="form-row flex items-center gap-2 ">
              <div className="form-group col-md-4 offset-md-1">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  name="sk"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search skill , company name"
                />
              </div>
              <div className="form-group col-md-4">
                <select
                  name="loc"
                  className="custom-select p-3 rounded-lg w-full "
                  id="inlineFormCustomSelectPref"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="Location...">Location...</option>

                  {allLocations.map((location, index) => (
                    <option value={location} key={index}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-2">
                <button className="btn btn-primary btn-lg">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Your HTML/JSX content goes here */}
      <div className="container">
        <h3 className="text-center text-primary mt-4">All Jobs</h3>
        <div className="row">
          {filteredJobs.length === 0 && <p>No results found</p>}
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="col-md-10 offset-md-1 mt-3 jobcard p-0"
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="ml-2">{job.title}</h5>
                  <div className="row p-2">
                    <div className="col-md-3 flex  align-items-center gap-2">
                      <IoBag className=" text-blue-500" /> Category:{" "}
                      {job?.jobType?.jobTypeName}
                    </div>
                    <div className="col-md-3 flex  align-items-center gap-2">
                      <FaLocationDot className="text-yellow-500" /> Location:{" "}
                      {job.location}
                    </div>
                    <div className="col-md-3 flex  align-items-center gap-2">
                      <FaMoneyBill className="text-yellow-500" /> Salary:{" "}
                      {job.salary} per month
                    </div>
                    <div className="col-md-4 flex  align-items-center gap-2 pt-3">
                      <SlCalender className=" text-blue-500" /> Publish Date:{" "}
                      {/* {format(new Date(job?.createdAt), "yyyy-MM-dd")} */}
                      {job?.createdAt && (
                        <> {formatDateCreated(job.createdAt)} </>
                      )}
                      {}
                    </div>
                  </div>
                  <div>
                    {job.description.length < 120 ? (
                      <p className="p-2  flex  align-items-center gap-2">
                        <BiTask className=" text-blue-500" />
                        {job.description}
                      </p>
                    ) : (
                      <p>
                        <i className="far fa-clipboard text-primary"></i>
                        {job.description.substring(0, 120)}...
                        <span className="text-primary">Read more</span>
                      </p>
                    )}
                  </div>
                  {!appliedJobs?.includes(job?.title) ? (
                    <div onClick={() => applyJob(job)}>
                      {userInfo ? (
                        <div className="btn-content">
                          <button className="btn btn-primary btn-lg">
                            {appliedJobs?.includes(job.title)
                              ? "Applied"
                              : "Apply"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-content">
                          <Link
                            to={"/login"}
                            className="btn btn-primary btn-lg text-white"
                          >
                            Login to Apply
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="btn-content">
                      <button className="btn btn-primary btn-lg" disabled>
                        Applied
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewJobs;

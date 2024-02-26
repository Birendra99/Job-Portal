import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ApplyJob = () => {
  const { userInfo } = useSelector((state) => state.signIn);
   const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
   return (
    <div>
      <Navbar />
      <section>
        <div className="apply-content">
          <div
            id="jobModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="apply-heading">
                  <Link to="/viewjobs">
                    <div className="backBtn">
                      <IoArrowBack />
                    </div>
                  </Link>
                  <h5>Job Apply</h5>
                </div>

                <div className="modal-body">
                  <form
                    action="applyJob"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="form-group">
                      <label>Name</label>{" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        disabled
                        value={userInfo.user?.firstName}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>{" "}
                      <input
                        type="email"
                        name="email"
                        value={userInfo.user?.email}
                        disabled
                        className="form-control"
                      />
                    </div>
                    <input type="hidden" name="userId" />
                    <input type="hidden" name="jobId" />
                    

                    <div className="applyBtn">
                      <button>Apply Now</button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ApplyJob;

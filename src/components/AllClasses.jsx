/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import { classOptions } from "./constants/dummy";
import { useAllClassesData, useSchoolInview } from "../queryHooks/Queries";
// import {useQueryClient} from 'react-query'
import CharacterDetails from "./CharacterDetails";
import { Plus } from "react-feather";
import CreateClass from "./modals/CreateClass";

const AllClasses = () => {
  const location = useLocation();
  const {
    data: school,
    isLoading: loadingSchool,
    isError: errorLoadingSch,
  } = useSchoolInview(location?.state?.school?.school_id);
  const [modal, setModal] = useState({ show: false, data: null });
  
  useEffect(() => {
    const setData = () => {
      if (!loadingSchool && !errorLoadingSch && !school?.data) {
        redirect("/");
      }
    };
    return setData();
  }, [school?.data]);

  

  const {
    isLoading: loadingClasses,
    data: classesData,
    isError: isClassesLoadError,
  } = useAllClassesData(school?.data?.school_id);

  // console.log("school inview returnded==>",classesData)
  return (
    <div
      className="dash-table rounded mt-1 p-3 pb-0"
      style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
    >
      <span className="d-flex flex-column justify-content-start align-items-start w-100 ">
        <div className="d-flex fs-4 fw-bold">
          School:
          <p className="p-0 m-0 ms-1 fs-4 fw-bold" style={{ color: "#00afef" }}>
            {school?.data?.name}
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm text-nowrap"
          onClick={(e) => {
            e?.preventDefault();
            setModal({ show: true, data: school });
          }}
        >
          Add Class
          <Plus size={"16px"} className="" />
        </button>
        {/* <div className="display-flex mt-1" style={{ width: "70%" }}>
          <span className="p-2 fs-5 text-nowrap me-2">Filter By:</span>
          
        </div> */}
      </span>

      {/* ========table========= */}
      <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gap-1">
        {loadingClasses ? (
          <h6>please wait...</h6>
        ) : isClassesLoadError ? (
          <h6>Error loading classes...</h6>
        ) : classesData?.data?.length > 0 ? (
          classesData?.data?.map((classData, index) => (
            <Link
              to={`/students`}
              state={{ class: classData }}
              className="col p-2 rounded d-flex flex-column justify-content-between align-items-start"
              style={{
                minHeight: "50px",
                backgroundColor: `${index % 2 == 0 ? "crimson" : "lightBlue"}`,
                color: `${index % 2 == 0 ? "lightBlue" : "crimson"}`,
              }}
              key={index}
            >
              <p>{classData?.grade_id}</p>
              <h4>{classData?.name}</h4>
              <h6>{classData?.arms?.length} arms</h6>
            </Link>
          ))
        ) : (
          <h5>No record found</h5>
        )}
      </div>
      {/* =====end-of-table====== */}

      <CreateClass
        show={modal?.show}
        onHide={() => setModal(false)}
        data={modal?.data}
      />
    </div>
  );
};

export default AllClasses;

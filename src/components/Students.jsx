/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
// import { classOptions } from "./constants/dummy";
import {
  useAllClassesData,
  useAllStudentsData,
  useClassInview,
  useSchoolInview,
} from "../queryHooks/Queries";
import CharacterDetails from "./CharacterDetails";
// import { useQueryClient } from "react-query";
import CreateStudent from "./modals/CreateStudent";
import { Plus } from "react-feather";

const Students = () => {
  // const queryClient = useQueryClient();
  const location = useLocation();
  const [modal, setModal] = useState({ show: false, data: null });
  const [filteredFields, setFilter] = useState({
    class: null,
    arm: null,
  });
  // const [filter, setFilter] = useState(null);
  // console.log("passed state=>",location?.state?.class)
  const {
    data: thisClass,
    isLoading: loadingClass,
    isError: errorLoadingClass,
  } = useClassInview({
    classId: filteredFields?.class
      ? filteredFields?.class?.grade_id
      : location?.state?.class?.grade_id,
    schoolId: location?.state?.class?.school_id,
  });

  const {
    data: thisSchool,
    isLoading: loadingSch,
    isError: errorLoadingSch,
  } = useSchoolInview(location?.state?.class?.school_id);

  useEffect(() => {
    const setData = () => {
      if (!loadingClass && !errorLoadingClass && !thisClass) {
        redirect("/");
      }
    };
    return setData();
  }, [thisClass]);

  const {
    isLoading: loadingData,
    data: schoolData,
    isError: isSchoolLoadError,
  } = useAllStudentsData(thisClass?.data);

  const {
    data: allClasses,
    isLoading: loadingClasses,
    isError: errorLoadingClasses,
  } = useAllClassesData(thisSchool?.data?.school_id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "class") {
      setFilter({
        class: JSON.parse(value),
        arm: null,
      });
    } else {
      setFilter({
        ...filteredFields,
        [name]: value,
      });
    }
  };
  // console.log("classes returned from this sch==>", allClasses);
  return (
    <div
      className="dash-table rounded mt-1 p-3 pb-0"
      style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
    >
      <span className="d-flex flex-column justify-content-start align-items-start w-100 ">
        {/* titles */}
        <div className="d-flex fs-4 fw-bold">
          <span className="d-flex">
            School:
            <p
              className="p-0 m-0 ms-1 fs-4 fw-bold"
              style={{ color: "#00afef" }}
            >
              {thisSchool?.data?.name}
            </p>
          </span>

          <span className="d-flex ms-4">
            Grade:
            <p
              className="p-0 m-0 ms-1 fs-4 fw-bold"
              style={{ color: "#00afef" }}
            >
              {thisClass?.data?.name}
            </p>
          </span>
        </div>

        {/* filter section */}
        <div className="display-flex mt-1" style={{ width: "90%" }}>
          <span className="p-2 fs-5 text-nowrap">Filter By:</span>
          {/* ====filter group==== */}
          <div className="input-group" style={{ width: "80%" }}>
            <div className="form-floating" style={{}}>
              <select
                className="form-select"
                id="class"
                name="class"
                value={filteredFields?.class}
                onChange={handleChange}
                aria-label="Floating label select example"
              >
                <option selected={thisClass} value={JSON.stringify(thisClass)}>
                  {thisClass?.data?.name}
                </option>
                {allClasses?.data?.map((option, index) =>
                  option?.grade_id !== thisClass?.data?.grade_id ? (
                    <option key={index} value={JSON.stringify(option)}>
                      {option?.name}
                    </option>
                  ) : null
                )}
              </select>
              <label htmlFor="class">CLASS</label>
            </div>
            <div className="form-floating ms-2" style={{}}>
              <select
                className="form-select"
                id="arm"
                name="arm"
                value={filteredFields?.arm}
                onChange={handleChange}
                aria-label="Floating label select example"
              >
                <option selected="all" value="all">
                  All Arms
                </option>
                {filteredFields?.class
                  ? filteredFields?.class?.arms?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))
                  : thisClass?.data?.arms?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
              </select>
              <label htmlFor="class">ARM</label>
            </div>
          </div>

          {/* =====filter group ends===== */}
          <button
            className="btn btn-primary btn-sm text-nowrap ms-5"
            onClick={(e) => {
              e?.preventDefault();
              setModal({ show: true, data: { thisSchool, thisClass } });
            }}
          >
            Create Student
            <Plus size={"16px"} className="" />
          </button>
        </div>
      </span>

      {/* ========table========= */}
      <table className="table table-borderless table-striped mt-3">
        <thead>
          <tr className="border-bottom">
            <th scope="col">
              <p className="gen-paragraph">Student Id</p>
            </th>
            <th scope="col">
              <p className="gen-paragraph">Name</p>
            </th>
            <th scope="col">
              <p className="gen-paragraph">Class</p>
            </th>
            <th scope="col">
              <p className="gen-paragraph">Arm</p>
            </th>
            <th scope="col">
              <p className="gen-paragraph">Action</p>
            </th>
            {/* <th scope="col"><p className='gen-paragraph'>Number of Students</p></th>
              <th scope="col"><p className='gen-paragraph'>Action</p></th> */}
          </tr>
        </thead>
        <tbody>
          {loadingData ? (
            <div>Please wait...</div>
          ) : isSchoolLoadError ? (
            <div>Error loading schools</div>
          ) : schoolData?.data?.code == 600 &&
            schoolData?.data?.msg?.length > 0 ? (
            schoolData?.data?.msg?.map((character, index) =>
              [null, undefined, "", "all", {}, []].includes(
                filteredFields?.arm
              ) ? (
                <CharacterDetails
                  key={index}
                  character={character}
                  school={location?.state?.school?.name}
                />
              ) : character?.arm === filteredFields?.arm ? (
                <CharacterDetails
                  key={index}
                  character={character}
                  school={location?.state?.school?.name}
                />
              ) : null
            )
          ) : (
            <div>No student record found</div>
          )}
          <tr>
            <td colSpan={3} className="text-center">
              <Link to="/more" className="p-0 m-0 gen-link text-center">
                View More
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      {modal?.show ? (
        <CreateStudent modal={modal} hideModal={setModal} />
      ) : null}

      {/* =====end-of-table====== */}
    </div>
  );
};

export default Students;

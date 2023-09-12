/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  useAllSessionsData,
  useClassInview,
  useSchoolInview,
  // useCurrentSessionData,
  useSingleStudentData,
  useStudentAcademicData,
} from "../queryHooks/Queries";
import { session, subjects } from "./constants/dummy";
import AcademicRecord from "./AcademicRecord";

const StudentDetails = () => {
  const location = useLocation();
  const [filteredFields, setFilter] = useState({
    session: null,
    term: "first",
    subject: null,
  });
  const [currentSession, setCurrentSession] = useState(null);

  const {
    data: allSessions,
    isLoading: loadingSessions,
    isError: errorLoadingSessions,
  } = useAllSessionsData();

  useEffect(() => {
    if (!Array.isArray(allSessions?.data)) return;
    const getCurrentSession = () => {
      let thisYear = new Date(Date.now()).getFullYear();
      for (var i = 0; i < allSessions?.data?.length; i++) {
        if (
          new Date(allSessions?.data[i]?.estimated_start)?.getFullYear() ===
          thisYear
        ) {
          setCurrentSession(() => allSessions?.data[i]);
          break;
        }
      }
    };

    return getCurrentSession();
  }, [allSessions]);

  // console.log("academic data fetched=>", academicData?.data);
  const handleChange = (e) => {
    setFilter({
      ...filteredFields,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const { data, isLoading, isError } = useSingleStudentData(
    location?.state?.student
  );

  const {
    data: academicData,
    isLoading: loadingAcademicData,
    isError: isErrorFetchingAcademicData,
  } = useStudentAcademicData({
    student_id: location?.state?.student,
    session: filteredFields?.session?filteredFields?.session:currentSession?.session_id,
    term: filteredFields?.term?filteredFields?.term:"first",
    subject: filteredFields?.subject?filteredFields?.subject:null,
  });

  const {
    data:school,isLoading:loadingSchoolData,isError:errorLoadingSchData
  } = useSchoolInview(data?.data?.msg?.school_id)

  const {data:studentClass, isLoading:loadingClass, isError:errorLoadingClass} = useClassInview({classId:data?.data?.msg?.grade, schoolId:data?.data?.msg?.school_id})

  // console.log("all academic records for this student==>", academicData?.data?.data)
  return (
    <div className="mt-1 p-3 pb-0">
      {isError ? (
        <h4>error occured!!!</h4>
      ) : isLoading ? (
        <h5>loading...</h5>
      ) : data?.data?.code == 600 ? (
        <>
          {/*========student details========= */}
          <div className="d-flex flex-column align-items-start justify-content-center border border-primary rounded p-2">
            <h2 className="text-danger text-capitalize fw-bold">
              {`${data?.data?.msg?.last_name}, ${data?.data?.msg?.first_name} ${data?.data?.msg?.other_name}`}
            </h2>
            <span className="display-flex w-100">
              <span className="d-flex fs-4 fw-bold">
                ID:
                <p className="text-secondary ms-1 ">
                  {data?.data?.msg?.student_id}
                </p>
              </span>
              <span className="d-flex fs-4 fw-bold">
                School:
                <p className="text-secondary ms-1 d-inline-block text-truncate">
                  {school?.data?.name}
                </p>
              </span>
              <span className="d-flex fs-4 fw-bold">
                Class:
                <p className="text-secondary ms-1 d-inline-block text-truncate">{studentClass?.data?.name}</p>
              </span>
              <span className="d-flex fs-4 fw-bold">
                Arm:
                <p className="text-secondary ms-1">{data?.data?.msg?.arm}</p>
              </span>
            </span>
          </div>
          {/* ===========student academic records============ */}
          <span className="d-flex flex-column justify-content-start align-items-start w-100 mt-2">
            <div className="p-1 display-flex fs-4 fw-normal">
              academic session:
              <p
                className="p-0 m-0 ms-1 fs-5 fw-bold text-secondary"
                style={{ color: "#00afef" }}
              >
                {filteredFields?.session
                  ? allSessions?.data?.find(
                      (option) => option?.session_id === filteredFields?.session
                    )?.title
                  : currentSession?.title}
              </p>
            </div>
            <div className="display-flex mt-1" style={{ width: "70%" }}>
              <span className="p-2 fs-5 text-nowrap me-2">Filter By:</span>
              {/* ====filter group==== */}
              <div className="input-group">
                <div className="form-floating " style={{ maxWidth: "20%" }}>
                  <select
                    className="form-select "
                    id="session"
                    name="session"
                    value={filteredFields?.session}
                    onChange={handleChange}
                    aria-label="Floating label select example"
                  >
                    <option selected="" value={currentSession?.session_id}>
                      {currentSession?.title}
                    </option>
                    {allSessions?.data?.map((session, index) =>
                      session?.session_id !== currentSession?.session_id ? (
                        <option key={index} value={session?.session_id}>
                          {session?.title}
                        </option>
                      ) : null
                    )}
                  </select>
                  <label htmlFor="character">Session</label>
                </div>

                <div className="form-floating ms-2" style={{ maxWidth: "20%" }}>
                  <select
                    className="form-select"
                    id="term"
                    name="term"
                    value={filteredFields?.term}
                    onChange={handleChange}
                    aria-label="Floating label select example"
                  >
                    {/* <option selected="first" value="all">
                      first
                    </option> */}
                    {["first", "second", "third"]?.map((option, index) => (
                      <option
                        selected={option === "first" ? "first" : null}
                        key={index}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="class">Term</label>
                </div>

                <div className="form-floating ms-2" style={{ maxWidth: "20%" }}>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={filteredFields?.subject}
                    onChange={handleChange}
                    aria-label="Floating label select example"
                  >
                    {subjects?.map((option, index) => (
                      <option
                        key={index}
                        value={
                          option?.value == "All Subjects"
                            ? undefined
                            : option?.value
                        }
                      >
                        {option?.value}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="class">Subject</label>
                </div>
              </div>
              {/* =====filter group ends===== */}
            </div>
          </span>

          {/* ===========filtered data========== */}

          <table className="table table-borderless table-striped mt-3">
            <thead>
              <tr className="border-bottom">
                <th scope="col">
                  <p className="gen-paragraph">Session</p>
                </th>
                {/* <th scope="col">
                      <p className="gen-paragraph">Term</p>
                    </th> */}
                <th scope="col">
                  <p className="gen-paragraph">Subject</p>
                </th>
                <th scope="col">
                  <p className="gen-paragraph">Assesment Type</p>
                </th>
                <th scope="col">
                  <p className="gen-paragraph">Score</p>
                </th>
                {/* <th scope="col">
                      <p className="gen-paragraph">Total</p>
                    </th> */}
              </tr>
            </thead>
            <tbody>
              {loadingAcademicData ? (
                <tr>
                  <td>
                    <h4 colSpan="4">please wait...</h4>
                  </td>
                </tr>
              ) : academicData?.data?.code == 606 &&
                isErrorFetchingAcademicData ? (
                <tr>
                  <td>
                    <h4 colSpan="4">please login...</h4>
                  </td>
                </tr>
              ) : isErrorFetchingAcademicData ? (
                <tr>
                  <td>
                    <h4 colSpan="4">error fetching data...</h4>
                  </td>
                </tr>
              ) : academicData?.data?.data?.code == 600 &&
                academicData?.data?.data?.msg?.length > 0 ? (
                academicData?.data?.data?.msg?.map((termdata, index) => (
                  <AcademicRecord
                    key={index}
                    data={termdata}
                    term={filteredFields?.term}
                  />
                ))
              ) : (
                <td>
                  <h4 colSpan="4">No record found fo this search</h4>
                </td>
              )}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default StudentDetails;
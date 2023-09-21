/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  useAllSessionsData,
  useAllSubjectsData,
  useClassInview,
  useOneSubjectData,
  useSchoolInview,
  // useCurrentSessionData,
  useSingleStudentData,
  useStudentAcademicData,
} from "../queryHooks/Queries";
import { session, subjects } from "./constants/dummy";
import AcademicRecord from "./AcademicRecord";
import { Plus } from "react-feather";
import CreateScore from "./modals/CreateScore";

const StudentDetails = () => {
  const location = useLocation();
  const [filteredFields, setFilter] = useState({
    session: null,
    term: null,
    subject: null,
  });
  const [currentSession, setCurrentSession] = useState(null);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [modal, setModal] = useState({ show: false, data: null });

  const {
    data: allSessions,
    isLoading: loadingSessions,
    isError: errorLoadingSessions,
  } = useAllSessionsData();

  useEffect(() => {
    if (!Array.isArray(allSessions?.data)) return;
    const getCurrentSession = () => {
      let today = new Date(Date.now());
      // ======configure the current session========
      let allSessionlength = allSessions?.data?.length;
      for (var i = allSessionlength - 1; i >= 0; i--) {
        if (
          new Date(allSessions?.data[i]?.estimated_start)?.getFullYear() ===
          today?.getFullYear()
        ) {
          setCurrentSession(() => allSessions?.data[i]);
          break;
        }
      }
      // ======configure the current term=======
      let thisMonth = today?.getMonth();
      if (thisMonth >= 8 && thisMonth <= 11) {
        setCurrentTerm(() => 1);
      } else if (thisMonth >= 0 && thisMonth <= 3) {
        setCurrentTerm(() => 2);
      } else if (thisMonth >= 4 && thisMonth <= 7) {
        setCurrentTerm(() => 3);
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

  // const {
  //   data: subject,
  //   isLoading: loadingSubject,
  //   isError: errorloadingSubjects,
  // } = useOneSubjectData(data?.subject);

  const { data, isLoading, isError } = useSingleStudentData(
    location?.state?.student
  );

  const {
    data: academicData,
    isLoading: loadingAcademicData,
    isError: isErrorFetchingAcademicData,
  } = useStudentAcademicData({
    student_id: location?.state?.student,
    session: filteredFields?.session
      ? filteredFields?.session
      : currentSession?.session_id,
    term: filteredFields?.term ? filteredFields?.term : currentTerm,
    subject:
      filteredFields?.subject && filteredFields?.subject !== "all"
        ? filteredFields?.subject
        : null,
  });

  // useEffect(()=>{

  // },[academicData])

  const {
    data: school,
    isLoading: loadingSchoolData,
    isError: errorLoadingSchData,
  } = useSchoolInview(data?.data?.msg?.school_id);

  const {
    data: allSubjects,
    isLoading: loadingSubjects,
    isError: errorLoadingSubjects,
  } = useAllSubjectsData();

  const {
    data: studentClass,
    isLoading: loadingClass,
    isError: errorLoadingClass,
  } = useClassInview({
    classId: data?.data?.msg?.grade,
    schoolId: data?.data?.msg?.school_id,
  });

  // console.log("from the query==>", academicData);
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
                <p className="text-secondary ms-1 d-inline-block text-truncate">
                  {studentClass?.data?.name}
                </p>
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
                    <option selected={currentTerm} value={currentTerm}>
                      {currentTerm === 1
                        ? "First"
                        : currentTerm === 2
                        ? "Second"
                        : currentTerm === 3
                        ? "Third"
                        : null}
                    </option>
                    {[1, 2, 3]?.map((option, index) =>
                      option !== currentTerm ? (
                        <option
                          // selected={option === "First" ? 1 : null}
                          key={index}
                          value={option}
                        >
                          {option === 1
                            ? "First"
                            : option === 2
                            ? "Second"
                            : option === 3
                            ? "Third"
                            : null}
                        </option>
                      ) : null
                    )}
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
                    <option selected="all" value="all">
                      All Subjects
                    </option>
                    {allSubjects?.data?.map((option, index) => (
                      <option key={index} value={option?.subject_id}>
                        {option?.name}
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

          {loadingAcademicData ? (
            <h4>please wait...</h4>
          ) : isErrorFetchingAcademicData ? (
            <h4>error fetching academic records...</h4>
          ) : academicData?.data?.length > 0 ? (
            academicData?.data?.map((termdata, index) => (
              <>
                <table
                  key={index}
                  className="table table-borderless table-striped mt-3"
                >
                  <thead>
                    <tr>
                      <td
                        colSpan="4"
                        className={`text-white ${
                          index % 2 !== 0 && index % 3 !== 0
                            ? "bg-primary"
                            : index % 2 == 0
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        <span className="d-flex justify-content-between align-items-center">
                          <h4>
                            {
                              allSubjects?.data?.find(
                                (subj) => subj?.subject_id === termdata?.subject
                              )?.name
                            }
                          </h4>

                          <h5 className="text-white ms-3">{`${
                            filteredFields?.term && filteredFields?.term == 1
                              ? "First"
                              : filteredFields?.term &&
                                filteredFields?.term == 2
                              ? "Second"
                              : filteredFields?.term &&
                                filteredFields?.term == 3
                              ? "Third"
                              : !filteredFields?.term && currentTerm == 1
                              ? "First"
                              : !filteredFields?.term && currentTerm == 2
                              ? "Second"
                              : !filteredFields?.term && currentTerm == 3
                              ? "Third"
                              : null
                          } term`}</h5>
                          <span>
                            <button
                              className="btn btn-primary btn-sm btn-outline-light text-nowrap"
                              onClick={(e) => {
                                e?.preventDefault();
                                setModal({
                                  show: true,
                                  data: {
                                    student: location?.state?.student
                                      ? location?.state?.student
                                      : data?.data?.msg,
                                    session: currentSession,
                                    term:currentTerm,
                                    subject:termdata?.subject
                                  },
                                });
                              }}
                            >
                              Add Score
                              <Plus size={"16px"} className="" />
                            </button>
                          </span>
                          <span></span>
                        </span>
                      </td>
                    </tr>
                    <tr className="border-bottom">
                      <th scope="col">
                        <p className="gen-paragraph">Session</p>
                      </th>
                      {/* <th scope="col">
                      <p className="gen-paragraph">Term</p>
                    </th> */}
                      {/* <th scope="col">
                        <p className="gen-paragraph">Subject</p>
                      </th> */}
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
                  <AcademicRecord
                    key={index}
                    data={termdata}
                    term={filteredFields?.term ? filteredFields?.term : 1}
                  />
                </table>
              </>
            ))
          ) : (
            <h4>No record found for this search</h4>
          )}
        </>
      ) : null}
      <CreateScore
        show={modal?.show}
        onHide={() => setModal(false)}
        data={modal?.data}
      />
    </div>
  );
};

export default StudentDetails;

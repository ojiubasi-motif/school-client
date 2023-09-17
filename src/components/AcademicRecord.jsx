/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useOneSubjectData } from "../queryHooks/Queries";

const AcademicRecord = (props) => {
  const { term, data } = props;
  // console.log("all records passes=>", data,"and term =>",term);
  const scores =
    term == 1
      ? data?.record?.first_term
      : term == 2
      ? data?.record?.second_term
      : term == 3
      ? data?.record?.third_term
      : null;
      
      console.log("this is the scores==>",scores)

  const {
    data: subject,
    isLoading: loadingSubject,
    isError: errorloadingSubjects,
  } = useOneSubjectData(data?.subject);
  // console.log("this subject=>", subject);
  return (
    <>
      {/* subject */}
      <tr className="border-bottom">
        <td colSpan="4">
          <span className="d-flex justify-content-start align-items-center">
            <h4>{subject?.data?.name} </h4>
            <h5 className="text-secondary ms-3">{`${
              term == 1
                ? "First"
                : term == 2
                ? "Second"
                : term == 3
                ? "Third"
                : null
            } term`}</h5>
          </span>
        </td>
      </tr>
      {/* scores */}
      {typeof scores !== "string" && scores?.length > 0
        ? scores?.map((scoreRecord, index) => (
            <tr key={index} className="border-bottom">
              <td>
                <div className="d-flex justify-content-start align-items-center">
                  <div className="ms-2">
                    {/* <Link
                  className="topnav-link"
                  to={`/students/${data?.student_id}`}
                  state={{ student: data?.student_id }}
                > */}
                    <h6 className="gen-paragraph fw-light text-secondary">
                      {scoreRecord?.session}
                    </h6>
                    {/* </Link> */}
                    {/* <p className="gen-paragraph">{item.email}</p> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-start align-items-center">
                  <div className="ms-2">
                    {/* <Link
                  className="topnav-link"
                  to={`/students/${data?.student_id}`}
                  state={{ student: data?.student_id }}
                > */}
                    <h6 className="gen-paragraph fw-light">
                      {subject ? subject?.data?.name : null}
                    </h6>
                    {/* </Link> */}
                    {/* <p className="gen-paragraph">{item.email}</p> */}
                  </div>
                </div>
              </td>

              <td>
                <div className="d-flex justify-content-start align-items-center">
                  <div className="ms-2">
                    <h6 className="gen-paragraph fw-light">
                      {scoreRecord?.assessment_type}
                    </h6>
                  </div>
                </div>
              </td>

              <td>
                <div className="d-flex justify-content-start align-items-center">
                  <div className="ms-2">
                    <Link
                      className="topnav-link"
                      to={`/students/${data?.student_id}`}
                      state={{ student: data?.student_id }}
                    >
                      <h6 className="gen-paragraph fw-light">
                        {scoreRecord?.score}
                      </h6>
                    </Link>
                    {/* <p className="gen-paragraph">{item.email}</p> */}
                  </div>
                </div>
              </td>
            </tr>
          ))
        : null}

      {/* aggregate */}
      <tr className="border-bottom">
        <td colSpan="3"></td>
        <td>
          <h6 className="">
            Total:
            {term == 1
              ? data?.aggr?.first_term_total
              : term == 2
              ? data?.aggr?.second_term_total
              : term == 3
              ? data?.aggr?.third_term_total
              : null}
          </h6>
        </td>
      </tr>
    </>
  );
};

export default AcademicRecord;

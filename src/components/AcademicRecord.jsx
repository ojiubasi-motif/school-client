/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const AcademicRecord = (props) => {
  const { term, data } = props;
  console.log("all records passes=>", data)
  const scores =
    term == "first"
      ? data?.record?.first_term
      : term == "second"
      ? data?.record?.second_term
      : term == "third"
      ? data?.record?.third_term
      : [];

  return (
    <>
      {/* subject */}
      <tr className="border-bottom">
        <td colSpan="4">
          <span className="d-flex justify-content-start align-items-center">
            <h4>{data?.subject} </h4>
            <h5 className="text-secondary ms-3">{`${term} term`}</h5>
          </span>
        </td>
      </tr>
      {/* scores */}
      {scores?.map((scoreRecord, index) => (
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
                    {scoreRecord?.subject}
                  </h6>
                {/* </Link> */}
                {/* <p className="gen-paragraph">{item.email}</p> */}
              </div>
            </div>
          </td>
          {/* <td>
          <div className="d-flex justify-content-start align-items-center">
            {data?.map((entry, index) => (
              <div className="ms-2" key={index}>
                <Link
                  className="topnav-link"
                  to={`/students/${data?.student_id}`}
                  state={{ student: data?.student_id }}
                >
                  <h6 className="gen-paragraph fw-light">
                    {entry?.assessment_type !=="exam"?entry?.score:null}
                  </h6>
                </Link>
              </div>
            ))}
          </div>
        </td> */}

          <td>
            <div className="d-flex justify-content-start align-items-center">
              <div className="ms-2">
                {/* <Link
                  className="topnav-link"
                  to={`/students/${data?.student_id}`}
                  state={{ student: data?.student_id }}
                > */}
                  <h6 className="gen-paragraph fw-light">
                    {scoreRecord?.assessment_type}
                  </h6>
                {/* </Link> */}
                {/* <p className="gen-paragraph">{item.email}</p> */}
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
      ))}

      {/* aggregate */}
      <tr className="border-bottom">
        <td colSpan="3"></td>
        <td>
          <h6 className="">
            Total:
            {term == "first"
              ? data?.aggr?.first_term_total
              : term == "second"
              ? data?.aggr?.second_term_total
              : term == "third"
              ? data?.aggr?.third_term_total
              : null}
          </h6>
        </td>
      </tr>
    </>
  );
};

export default AcademicRecord;
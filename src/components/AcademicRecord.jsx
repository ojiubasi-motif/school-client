/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useOneSubjectData } from "../queryHooks/Queries";

const AcademicRecord = (props) => {
  const { term, data, refreshingData } = props;
  // console.log("all records passes=>", data,"and term =>",term);
  const scores =
    term == 1
      ? data?.record?.first_term
      : term == 2
      ? data?.record?.second_term
      : term == 3
      ? data?.record?.third_term
      : null;

  // console.log("this is the scores==>", scores);

  // console.log("this subject=>", subject);
  return (
    <tbody>
      {typeof scores !== "string" && scores?.length > 0 ? (
        scores?.map((scoreRecord, index) => (
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
      ) : refreshingData ? (
        <tr>
          <td
            colSpan={3}
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ height: "10px" }}
          >
            <PropagateLoader color="#36d7b7" size={7} loading={true} />
          </td>
        </tr>
      ) : null}

      {/* aggregate */}
      <tr className="border-bottom">
        <td colSpan="2"></td>
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
    </tbody>
  );
};

export default AcademicRecord;

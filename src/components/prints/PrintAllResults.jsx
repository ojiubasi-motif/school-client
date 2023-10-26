/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Printer, RefreshCw } from "react-feather";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useStudentAcademicData } from "../../queryHooks/Queries";
import { PropagateLoader } from "react-spinners";
import TermResult from "./TermResult";

const PrintAllResults = () => {
  const location = useLocation();
  const printRef = useRef();
  const { student, session, grade,term, school, allSubjects } = location.state;
  const [printFilter, setFilter] = useState(null);
  // const [term, setTerm] = useState(2);
  // const [results, setResults] = useState({});
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "all-results",
    onAfterPrint: () => alert("print was a success!!"),
  });

  const {
    data: academicData,
    isLoading: loadingAcademicData,
    isError: isErrorFetchingAcademicData,
    isFetching: isRefreshing,
  } = useStudentAcademicData({
    student_id: student?.student_id,
    session: session?.session_id,
    term: term,
  });

  const {
    data: secondResult,
    isLoading: loadingSecondTerm,
    isError: isErrorFetchingSecond,
  } = useStudentAcademicData({
    student_id: student?.student_id,
    session: session?.session_id,
    term:
      term == 2 && printFilter === true
        ? 1
        : term == 3 && printFilter === true
        ? 2
        : null,
  });

  const {
    data: thirdResult,
    isLoading: loadingThird,
    isError: isErrorFetchingThird,
  } = useStudentAcademicData({
    student_id: student?.student_id,
    session: session?.session_id,
    term: term == 3 && printFilter === true ? 1 : null,
  });

  // console.log("filtered results==>",secondResult?.data, "third result++>",thirdResult?.data);
  return (
    <div className="p-5">
      {term == 3 ? (
        <span className="mt-2 d-flex justify-content-start">
          <h6 className="me-2">Print For:</h6>
          <div className="ms-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="session"
                id="formRadioDefault"
                value="third"
                checked={printFilter === null}
                onChange={() => setFilter(null)}
              />
              <label className="form-check-label" htmlFor="formRadioDefault">
                Third Term ONLY
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="session"
                id="formRadioDefault"
                value={true}
                checked={printFilter === true}
                onChange={() => setFilter(true)}
              />
              <label className="form-check-label" htmlFor="formRadioChecked">
                First, Second & Third Term
              </label>
            </div>
          </div>
        </span>
      ) : term == 2 ? (
        <span className="mt-2 d-flex justify-content-start">
          <h6 className="me-2">Print For:</h6>
          <div className="ms-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="session"
                id="formRadioDefault"
                value={null}
                checked={printFilter === null}
                onChange={() => setFilter(null)}
              />
              <label className="form-check-label" htmlFor="formRadioDefault">
                Second Term ONLY
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="session"
                id="formRadioDefault"
                value={true}
                checked={printFilter === true}
                onChange={() => setFilter(true)}
              />
              <label className="form-check-label" htmlFor="formRadioChecked">
                First & Second Term
              </label>
            </div>
          </div>
        </span>
      ) : null}

      <div className="py-2 px-2" ref={printRef}>
        <h3 className="text-dark fw-bold text-md-center">{school?.name}</h3>
        {(term === 3 || term === 2) && printFilter === true ? (
          (term===3 && loadingThird) || (term===2 && loadingSecondTerm) ? (
            <h6>loading first term result...</h6>
          ) : (term===3 && isErrorFetchingThird) || (term===2 && isErrorFetchingSecond) ? (
            <h6 className="text-danger">error fetching first term result!</h6>
          ) : (
            <TermResult
              student={student}
              term={1}
              grade={grade}
              allSubjects={allSubjects}
              session={session}
              result={
                term === 2
                  ? secondResult?.data
                  : term === 3
                  ? thirdResult?.data
                  : null
              }
            />
          )
        ) : null}

        {term === 3 && printFilter === true ? (
          loadingSecondTerm ? (
            <h6>fetching second term result...</h6>
          ) : isErrorFetchingSecond ? (
            <h6 className="text-danger">error fetching second term result!</h6>
          ) : (
            <TermResult
              student={student}
              term={2}
              grade={grade}
              allSubjects={allSubjects}
              session={session}
              result={secondResult?.data}
            />
          )
        ) : null}
        {loadingAcademicData ? (
          <PropagateLoader
            color="#0D6EFD"
            size={10}
            loading={true}
            className="m-auto"
          />
        ) : isErrorFetchingAcademicData ? (
          <h5 className="d-felx">
            Error fetching academic record.
            <p className="m-0 p-0 text-info fw-lighter">
              Reload <RefreshCw size={14} />
            </p>
          </h5>
        ) : (
          <TermResult
            student={student}
            term={term}
            grade={grade}
            allSubjects={allSubjects}
            session={session}
            result={
               academicData?.data  
            }
          />
        )}
      </div>
      <button className="btn btn-small btn-success" onClick={handlePrint}>
        Print
        <Printer size={12} className="ms-1" />
      </button>
    </div>
  );
};

export default PrintAllResults;
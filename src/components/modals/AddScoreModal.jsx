/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext, useState } from "react";
import { useCreateScoreData } from "../../queryHooks/Queries";
import { toast } from "react-hot-toast";
import { GlobalStatesContext } from "../context/globalStates";

const AddScoreModal = (props) => {
  const { hideModal, modal } = props;
  const { setFilter, filteredFields } = modal.data;
  const {
    toast: reactToast,
    setToast
  } = useContext(GlobalStatesContext);

  const [formFields, setFields] = useState({
    score: null,
    assessment_type: null,
    subject: null,
  });

  const subjectTarget = modal?.data?.subject
    ? modal?.data?.subject
    : formFields?.subject
    ? formFields?.subject
    : {};

  const { mutate, isError, isLoading } = useCreateScoreData(
    modal?.data?.filteredSubject
  );

  const postScore = (e) => {
    e?.preventDefault();
    const { score, assessment_type, subject } = formFields;

    const payload = {
      student_id: modal?.data?.student?.id,
      score,
      session: modal?.data?.session?.title,
      session_id: modal?.data?.session?.id,
      subject: subject ? subject?.subject_id : modal?.data?.subject?.subject_id,
      term: modal?.data?.term,
      assessment_type,
    };
    mutate(payload);
    setFields({ score: null, assessment_type: null, subject: null });
    if(!isLoading && !isError){
      hideModal({ ...modal, show: false });
      toast.success('Score added successfully!')
      // setToast({show:true,msg:'Score added successfully!'});
      
    }
    ()=>setFilter({ ...filteredFields, term: 1 });
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    name === "subject"
      ? setFields({ ...formFields, subject: JSON.parse(value) })
      : setFields({
          ...formFields,
          [name]: value,
        });
  };

  return (
    <div
      className="position-fixed d-flex align-items-center justify-content-center"
      style={{
        zIndex: "999",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(29,27,27,0.52)",
      }}
    >
      <div
        className="bg-light px-2 py-2 rounded d-flex flex-column justify-content-between position-relative"
        style={{ width: "500px" }}
      >
        <span
          onClick={() => hideModal({ ...modal, show: false })}
          className="fw-bold text-light border border-light bg-dark d-flex align-items-center justify-content-center cursor-pointer position-absolute "
          style={{
            top: "-10px",
            right: "-10px",
            height: "40px",
            width: "40px",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          X
        </span>

        <h6 className="d-flex justify-content-center">
          Add score for{" "}
          <p className="m-0 p-0 text-primary text-capitalize fw-bold ms-2">
            {modal?.data?.student?.name}
          </p>
        </h6>
        <div className="row">
          <span className="col col-md-6 d-flex">
            session:
            <p className="m-0 p-0 text-primary text-capitalize ms-1">
              {modal?.data?.session?.title}
            </p>
          </span>
          <span className="col col-md-6 d-flex">
            class:
            <p className="m-0 p-0 text-primary text-capitalize ms-1">
              {modal?.data?.student?.class?.name}
            </p>
          </span>
          <span className="col col-md-6 d-flex">
            term:
            <p className="m-0 p-0 text-primary text-capitalize ms-1">
              {modal?.data?.term}
            </p>
          </span>

          <span className="col col-md-6 d-flex">
            subject:
            <p className="m-0 p-0 text-primary text-capitalize ms-1">
              {modal?.data?.subject
                ? modal?.data?.subject?.title
                : formFields?.subject?.title}
            </p>
          </span>

          <hr className="mt-2" />

          {modal?.data?.allSubjects ? (
            <span className="d-md-inline-flex justify-content-start align-items-center me-2 mt-2 form-elements">
              <h6 className="text-nowrap">Subject</h6>
              <select
                className="form-select ms-2"
                name="subject"
                onChange={handleChange}
                style={{ width: "50%" }}
              >
                <option selected={null}>--Select One--</option>
                {modal?.data?.allSubjects?.map((subject, index) => (
                  <option key={index} value={JSON.stringify(subject)}>
                    {subject?.title}
                  </option>
                ))}
              </select>
            </span>
          ) : null}

          <span className="d-md-inline-flex justify-content-start align-items-center me-2 mt-2 form-elements">
            <h6 className="text-nowrap">Assesment Type</h6>
            <select
              style={{ width: "50%" }}
              className="form-select ms-2"
              name="assessment_type"
              onChange={handleChange}
            >
              <option selected={null}>--Select One--</option>
              {subjectTarget.cat?.map((assessment, index) => (
                    <option
                      disabled={modal?.data?.scores?.find(
                        (asstype) => asstype?.assessment_type === assessment
                      )}
                      key={index}
                      value={assessment}
                    >
                      {assessment}
                    </option>
                  ))
                }
            </select>
          </span>

          <span className="d-md-inline-flex justify-content-start align-items-center me-2 mt-4 form-elements mb-2">
            <h6>Score</h6>
            <input
              className="ms-2"
              type="number"
              name="score"
              placeholder="00.00"
              pattern="^[0-9]{1,30}$"
              value={formFields?.score}
              onChange={handleChange}
            />
          </span>
        </div>
        {/* ====btns===== */}
        <span className="d-flex justify-content-end align-items-center mt-2">
          <button
            className="shadow"
            onClick={() => hideModal({ ...modal, show: false })}
          >
            Cancel
          </button>
          <button
            className="default-btn ms-2"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={postScore}
            disabled={isLoading}
          >
            Add score
          </button>
        </span>
      </div>
    </div>
  );
};

export default AddScoreModal;
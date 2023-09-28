/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";

import FormFields from "../constants/FormFields";
import { createSchoolForm } from "../constants/formFieldsElements";
import { useCreateSchoolData } from "../../queryHooks/Queries";

const CreateSchool = (props) => {
  const {modal,hideModal} = props
  const [formFields, setFields] = useState({
    title: "",
  });

  const {mutate, isError, isLoading} = useCreateSchoolData();

  const postSchool = (e) => {
    e?.preventDefault();
    const { title} = formFields;
    const payload = {
      name:title
    };
    mutate(payload);
    setFields({title:""});
    !isLoading && !isError ? hideModal({show:false}):null;
  };

  const handleChange = (e) => {
    setFields({
      ...formFields,
      [e.target.name]: e.target.value,
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
          Create School
        </h6>
        <hr className="mt-2"/>


          <div className="row form-elements gy-2">
            {createSchoolForm.map((field, index) => (
              <FormFields
                key={index}
                {...field}
                onchange={handleChange}
                value={formFields[field.name]}
              />
            ))}
          </div>
        
        <span className="d-flex justify-content-end align-items-center mt-2">
          <button className="shadow" onClick={ () => hideModal({ ...modal, show: false })}>
            Cancel
          </button>

          <button
            className="default-btn ms-2"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={postSchool}
            disabled={isLoading}
            // disable={makingRequest?.fetching}
          >
            Create
          </button>
        </span>
      </div>
      </div>
  );
};

export default CreateSchool;

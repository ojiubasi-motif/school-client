/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import FormFields from "../constants/FormFields";
import { createSchoolForm } from "../constants/formFieldsElements";
import { useCreateSchoolData } from "../../queryHooks/Queries";

const CreateSchool = (props) => {
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
    props?.onHide();
  };

  const handleChange = (e) => {
    setFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal {...props} className="" backdrop="static" keyboard={false} centered>
      <ModalDialog>
        <ModalHeader>
          <ModalTitle>Create School</ModalTitle>
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <button className="shadow" onClick={props.onHide}>
            Cancel
          </button>

          <button
            className="default-btn"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={postSchool}
            disabled={isLoading}
            // disable={makingRequest?.fetching}
          >
            Create
          </button>
        </ModalFooter>
      </ModalDialog>
    </Modal>
  );
};

export default CreateSchool;

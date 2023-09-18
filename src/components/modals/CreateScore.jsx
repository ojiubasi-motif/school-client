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
import {
  useAllSubjectsData,
  useCreateScoreData,
  useSingleStudentData,
} from "../../queryHooks/Queries";

const CreateScore = (props) => {
  // const {session,student } = props?.data
  const [formFields, setFields] = useState({
    // student_id: "",
    // session: "",
    // session_id: "",
    score: 0,
    subject: "",
    term: 0,
    assessment_type: "",
  });
  // console.log("student props", props?.data?.student);
  const {
    data: student,
    isLoading: loadingStudent,
    isError: errorLoadingStudent,
  } = useSingleStudentData(props?.data?.student);

  const { mutate, isError, isLoading } = useCreateScoreData();
  const {
    data: allSubjects,
    isLoading: loadingSubjects,
    isError: errorLoadingSubjects,
  } = useAllSubjectsData();

  const postScore = (e) => {
    e?.preventDefault();
    const {
      // student_id:,
      score,
      // session,
      // session_id,
      subject,
      term,
      assessment_type,
    } = formFields;

    const payload = {
      student_id: student?.data?.msg?.student_id,
      score: 15,
      session: props?.data?.session?.title,
      session_id: props?.data?.session?.session_id,
      subject,
      term,
      assessment_type,
    };
    // console.log("this is the payload=>",payload)
    mutate(payload);
    setFields({ score: 0, subject: "", term: 0, assessment_type: "" });
    props?.onHide();
  };

  const handleChange = (e) => {
    setFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  console.log("student", student);
  return (
    <Modal {...props} className="" backdrop="static" keyboard={false} centered>
      <ModalDialog>
        <ModalHeader>
          <ModalTitle>
            {`${student?.data?.msg?.first_name} ${student?.data?.msg?.last_name}`}
            <h6>Session: {props?.data?.session?.title}</h6>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <span className="row mt-3">
            <h6>Subject</h6>
            <select className="form-select" name="subject" onChange={handleChange}>
              {allSubjects?.data?.map((subj, index) => (
                <option key={index} value={subj?.subject_id}>
                  {subj?.name}
                </option>
              ))}
            </select>
          </span>

          {/* ======= */}
          <span className="row mt-3">
            <h6>Assesment Type</h6>
            <select
              className="form-select"
              name="assessment_type"
              onChange={handleChange}
            >
              <option value="CAT-1">CAT-1</option>
              <option value="CAT-1">CAT-2</option>
              <option value="CAT-1">CAT-3</option>
              <option value="Examination">Examination</option>
            </select>
          </span>

          {/* =========== */}
          <span className="row mt-3">
            <h6>Term</h6>
            <select className="form-select" name="term" onChange={handleChange}>
              <option value={1}>First Term</option>
              <option value={2}>Second Term</option>
              <option value={3}>Third Term</option>
            </select>
          </span>
          {/* =========== */}
        </ModalBody>
        <ModalFooter>
          <button className="shadow" onClick={props.onHide}>
            Cancel
          </button>

          <button
            className="default-btn"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={postScore}
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

export default CreateScore;
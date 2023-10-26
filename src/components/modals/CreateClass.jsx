/* eslint-disable react/no-string-refs */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import FormFields from "../constants/FormFields";
import {
  createClassFields,
  createSchoolForm,
} from "../constants/formFieldsElements";
import {
  useAllSchoolsData,
  useAllSubjectsData,
  useAllTrainersData,
  useCreateClassData,
  useCreateSchoolData,
  useSchoolInview,
} from "../../queryHooks/Queries";
import { useQueryClient } from "react-query";
import { Plus, X } from "react-feather";
import { toast } from "react-hot-toast";
import { GlobalStatesContext } from "../context/globalStates";

const CreateClass = (props) => {
  const armForm = useRef();
  const { hideModal, modal } = props;
  const [formData, setData] = useState({
    title: "",
    head: {},
    subjects: [],
    arms: [],
  });

  const {
    toast: reactToast,
    setToast
  } = useContext(GlobalStatesContext);

  const {
    data: allTrainers,
    isLoading: loadingTrainers,
    isError: errorLoadingtrainers,
  } = useAllTrainersData();
  const {
    data: allSubjects,
    isLoading: loadingSubjects,
    isError: errorLoadingSubjects,
  } = useAllSubjectsData(modal?.data?.data?.school_id);

  const {
    data: allSchools,
    isLoading: loadingSchools,
    isError: errorLoadingSchools,
  } = useAllSchoolsData();
  // console.log("the school inview=>", data);
  const { mutate, isError, isLoading } = useCreateClassData();

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const { title, head, arms, subjects } = formData;
    // console.log("the head teacher selected=++>",head)
    const payload = {
      name: title,
      school_id: modal?.data?.data?.school_id,
      head_teacher_id: head?.id,
      head_teacher_name: head?.name,
      subjects,
      arms,
    };
    mutate(payload);
    setData({
      title: "",
      head: {},
      subjects: [],
      arms: [],
    });
    if(!isLoading && !isError ){
      hideModal({ ...modal, show: false });
      toast.success(`${title} created successfully`)
      // setToast({show:true,msg:'Class created successfully'})
    }
     
  };

  const addArm = (e) => {
    e.preventDefault();
    // console.log("===>",e?.target.elements?.arms.value)
    setData({ ...formData, arms: [...formData?.arms, armForm.current?.value] });
    armForm.current.value = "";
  };

  const handleChange = (e) => {
    // setError({ name: null, errorMsg: null });
    const { name, type, checked, id, value } = e?.target;
    // if(name ==="head") console.log('the head trainer=>',JSON.parse(value));

    type === "checkbox" && name === "subjects" && checked
      ? setData({ ...formData, subjects: [...formData.subjects, id] })
      : type === "checkbox" && name === "subjects" && !checked
      ? setData({
          ...formData,
          subjects: formData.subjects.filter((subject) => subject !== id),
        })
      : type === "checkbox" && name === "location" && checked
      ? setData({ ...formData, location: [...formData.location, id] })
      : type === "checkbox" && name === "location" && !checked
      ? setData({
          ...formData,
          location: formData.location.filter((loc) => loc !== id),
        })
      : type === "time" && id === "from"
      ? setData({ ...formData, time: { ...formData.time, from: value } })
      : type === "time" && id === "to"
      ? setData({ ...formData, time: { ...formData.time, to: value } })
      : name === "head"
      ? setData({ ...formData, head: JSON.parse(value) })
      : setData({
          ...formData,
          [name]: value,
        });
  };

  // console.log("subjects in createClass===>", allSubjects?.data);
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

        <h6 className="d-flex justify-content-center">Create Class</h6>
        <hr className="mt-2" />

        <div className="p-2">
          <form className="row p-1" onSubmit={handleFormSubmit}>
            {/* <span className="col-md-12 form-elements mb-2">
                <h6 className="m-0 p-0">School</h6>
                <input
                  className="form-check-input"
                  type="text"
                  name="school"
                  placeholder={`${data?.data?.name}`}
                  id="school"
                  value={`${data?.data?.name}`}
                  readOnly={true}
                />
              </span> */}

            <span className="col-md-12 d-md-flex justify-content-start align-items-center mb-2 form-elements">
              <h6>School</h6>
              <select
                className="form-select ms-2"
                name="school"
                onChange={handleChange}
                style={{ width: "50%" }}
              >
                <option selected={modal?.data?.data?.school_id}>
                  {modal?.data?.data?.name}
                </option>
                {allSchools?.data?.msg?.length > 0 ? (
                  allSchools?.data?.msg?.map((school, index) =>
                    school?.school_id !== modal?.data?.data?.school_id ? (
                      <option key={index} value={JSON.stringify(school)}>
                        {school?.name}
                      </option>
                    ) : null
                  )
                ) : loadingTrainers ? (
                  <option>loading trainers...</option>
                ) : errorLoadingtrainers ? (
                  <option>Error while loading trainers!</option>
                ) : (
                  <option>No trainer record found</option>
                )}
              </select>
            </span>

            <span className="col-md-12 d-md-flex justify-content-start align-items-center mb-2 form-elements mb-2">
              <h6>Class Title</h6>
              <input
                className="form-check-input ms-2"
                type="text"
                name="title"
                placeholder="Primary 1"
                id="title"
                pattern="^[A-Za-z0-9]{1,30}$"
                style={{ width: "50%" }}
                // errorMessage= "Message must not be empty"
                value={formData?.title}
                onChange={handleChange}
              />
            </span>

            <span className="col-md-12 d-md-flex justify-content-start align-items-center mb-2 form-elements">
              <h6>Head Teacher [optional]</h6>
              <select
                className="form-select ms-2"
                style={{ width: "50%" }}
                // type="text"
                name="head"
                // placeholder="Enter school title"
                // id="school"
                // value={formData?.head}
                onChange={handleChange}
              >
                <option defaultValue="">--Select a Trainer--</option>
                {allTrainers?.data?.msg?.length > 0 ? (
                  allTrainers?.data?.msg?.map((trainer, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        id: trainer?.trainer_id,
                        name: `${trainer?.first_name} ${trainer?.last_name}`,
                      })}
                    >{`${trainer?.first_name} ${trainer?.last_name}`}</option>
                  ))
                ) : loadingTrainers ? (
                  <option>loading trainers...</option>
                ) : errorLoadingtrainers ? (
                  <option>Error while loading trainers!</option>
                ) : (
                  <option>No trainer record found</option>
                )}
              </select>
            </span>

            <span className="col-md-12 mb-2">
              <h6>Class Subjects [optional]</h6>
              <div className="row row-cols-2 ">
                {allSubjects?.data?.length > 0 ? (
                  allSubjects?.data?.map((subject, index) => (
                    <div
                      key={index}
                      className="col ms-2 d-flex "
                      style={{ width: "40%" }}
                    >
                      <input
                        className="form-check-input"
                        name="subjects"
                        type="checkbox"
                        id={subject?.title}
                        onChange={handleChange}
                        // disabled={index > 4}
                        checked={formData?.subjects?.some(
                          (selected) => selected === subject?.title
                        )}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={subject?.title}
                      >
                        {subject?.title}
                      </label>
                    </div>
                  ))
                ) : loadingSubjects ? (
                  <h5>loading...</h5>
                ) : errorLoadingSubjects ? (
                  <h6></h6>
                ) : (
                  <h6></h6>
                )}
              </div>
            </span>

            <div className="col-md-12 px-1">
              <div className="form-elements w-100 d-flex justify-content-start align-items-center">
                <h6 className="text-nowrap">Add Arms[optional]</h6>
                <input
                  className="form-check-input ms-2"
                  type="text"
                  name="arms"
                  placeholder="Gold, Diamond, Ruby or A, B, C"
                  ref={armForm}
                  pattern="^[A-Za-z0-9]{1,30}$"
                  // id="arms"
                  style={{ width: "50%" }}
                  // value=""
                  // onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={addArm}
                  className="btn btn-primary btn-sm py-0 d-flex justify-content-center align-items-center ms-2"
                  style={{ width: "30px", height: "30px" }}
                >
                  <Plus size={"16px"} className="" />
                </button>
              </div>

              {/* added arms */}
              <span className="row row-cols-4 px-2">
                {formData?.arms?.length > 0
                  ? formData?.arms?.map((arm, index) => (
                      <span
                        className="col display-flex align-items-center border rounded border-primary mt-1 ps-2 ms-1"
                        // style={{ width: "70%" }}
                        key={index}
                      >
                        <p className="p-0 m-0">{arm}</p>
                        <button
                          className="btn btn-sm text-danger"
                          onClick={(e) => {
                            e?.preventDefault();
                            setData({
                              ...formData,
                              arms: formData.arms.filter(
                                (data) => data !== arm
                              ),
                            });
                          }}
                        >
                          <X size={"16px"} className="" />
                        </button>
                      </span>
                    ))
                  : null}
              </span>
            </div>
          </form>
        </div>

        <span className="d-flex justify-content-end align-items-center mt-2">
          <button className="shadow" onClick={ () => hideModal({ ...modal, show: false })}>
            Cancel
          </button>

          <button
            className="default-btn ms-2"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={handleFormSubmit}
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

export default CreateClass;
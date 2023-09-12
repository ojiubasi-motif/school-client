/* eslint-disable react/no-string-refs */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useRef, useState } from "react";
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
import {useQueryClient} from 'react-query'
import { Plus, X } from "react-feather";

const CreateClass = (props) => {
  const armForm = useRef();
  const { data } = props;
  const [formData, setData] = useState({
    title: "",
    head:{},
    subjects: [],
    arms: [],
  });

  const {
    data: allTrainers,
    isLoading: loadingTrainers,
    isError: errorLoadingtrainers,
  } = useAllTrainersData();
  const {
    data: allSubjects,
    isLoading: loadingSubjects,
    isError: errorLoadingSubjects,
  } = useAllSubjectsData();
  
  // const schoolInview = queryClient?.getQueryData('school-inview')
  const {data:allSchools, isLoading:loadingSchools, isError:errorLoadingSchools} = useAllSchoolsData();
  // console.log("the school inview=>", data);
  const { mutate, isError, isLoading } = useCreateClassData();

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const { title, head,arms, subjects } = formData;
    // console.log("the head teacher selected=++>",head)
    const payload = {
      name: title,
      school_id:data?.data?.school_id,
      head_teacher_id:head?.id,
      head_teacher_name:head?.name,
      subjects,
      arms
    };
    mutate(payload);
    setData({
      title: "",
      head: {},
      subjects: [],
      arms: [],
    });
    props?.onHide();
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
      ?setData({...formData, head:JSON.parse(value)})
      : setData({
          ...formData,
          [name]: value,
        });
  };

  // console.log("arms===>", formData?.arms);
  return (
    <Modal {...props} className="" backdrop="static" keyboard={false} centered>
      <ModalDialog>
        <ModalHeader>
          <ModalTitle>Create Class</ModalTitle>
        </ModalHeader>
        <ModalBody>
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

              <span className="col-md-12 form-elements">
                <h6>School</h6>
                <select
                  className="form-select"
                  // type="text"
                  name="school"
                  // placeholder="Enter school title"
                  // id="school"
                  // value={formData?.head}
                  onChange={handleChange}
                >
                  <option defaultValue={data?.data?.school_id} selected={data?.data?.school_id}>{data?.data?.name}</option>
                  {allSchools?.data?.msg?.length > 0 ? 
                    allSchools?.data?.msg?.map((school, index) => school?.school_id !== data?.data?.school_id?(
                      <option
                        key={index}
                        value={JSON.stringify(school)}
                      >{school?.name}</option>
                    ):null)
                   : loadingTrainers ? (
                    <option>loading trainers...</option>
                  ) : errorLoadingtrainers ? (
                    <option>Error while loading trainers!</option>
                  ) : (
                    <option>No trainer record found</option>
                  )}
                </select>
              </span>

              <span className="col-md-12 form-elements mb-2">
                <h6>Class Title</h6>
                <input
                  className="form-check-input"
                  type="text"
                  name="title"
                  placeholder="Primary 1"
                  id="title"
                  pattern="^[A-Za-z0-9]{1,30}$"
                  // errorMessage= "Message must not be empty"
                  value={formData?.title}
                  onChange={handleChange}
                />
              </span>

              <span className="col-md-12 form-elements">
                <h6>Head Teacher [optional]</h6>
                <select
                  className="form-select"
                  // type="text"
                  name="head"
                  // placeholder="Enter school title"
                  // id="school"
                  // value={formData?.head}
                  onChange={handleChange}
                >
                  <option defaultValue="">--Select a Trainer--</option>
                  {allTrainers?.data?.msg?.length > 0 ? 
                    allTrainers?.data?.msg?.map((trainer, index) => (
                      <option
                        key={index}
                        value={JSON.stringify({id:trainer?.trainer_id, name:`${trainer?.first_name} ${trainer?.last_name}`})}
                      >{`${trainer?.first_name} ${trainer?.last_name}`}</option>
                    ))
                   : loadingTrainers ? (
                    <option>loading trainers...</option>
                  ) : errorLoadingtrainers ? (
                    <option>Error while loading trainers!</option>
                  ) : (
                    <option>No trainer record found</option>
                  )}
                </select>
              </span>

              <span className="row mt-3">
                <h6>Class Subjects [optional]</h6>
                {allSubjects?.data?.msg?.length > 0 ? (
                  allSubjects?.data?.msg?.map((subject, index) => (
                    <div
                      key={index}
                      className="ms-2 d-flex "
                      style={{ width: "40%" }}
                    >
                      <input
                        className="form-check-input"
                        name="subjects"
                        type="checkbox"
                        id={subject?.name}
                        onChange={handleChange}
                        // disabled={index > 4}
                        checked={formData?.subjects?.some(
                          (selected) => selected === subject?.name
                        )}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={subject?.name}
                      >
                        {subject?.name}
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
              </span>

              <div className="mt-3 px-2" style={{ width: "80%" }}>
                <h5>Add Arms to class [optional]</h5>
                {/* added arms */}
                {formData?.arms?.length > 0
                  ? formData?.arms?.map((arm, index) => (
                      <span className="display-flex mt-1 px-2" style={{width:"50%"}} key={index}>
                        <p className="p-0 m-0">{arm}</p>
                        <button
                          className="btn btn-outline-danger btn-sm ms-3"
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
                <div className="col-md-12 form-elements d-flex justify-content-between">
                  <input
                    className="form-check-input"
                    type="text"
                    name="arms"
                    placeholder="Gold, Diamond, Ruby or A, B, C"
                    ref={armForm}
                    pattern= "^[A-Za-z0-9]{1,30}$"
                    // id="arms"
                    style={{ width: "70%" }}
                    // value=""
                    // onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addArm}
                    className="btn btn-primary btn-sm py-0 d-flex justify-content-center align-items-center "
                  >
                    ADD
                    <Plus size={"16px"} className="" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter className="mt-3">
          <button className="shadow" onClick={props.onHide}>
            Cancel
          </button>

          <button
            className="default-btn"
            style={{ border: "2px solid #00AFEF", minWidth: "30px" }}
            onClick={handleFormSubmit}
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

export default CreateClass;
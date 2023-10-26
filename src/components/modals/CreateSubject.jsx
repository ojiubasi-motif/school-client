/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import { GlobalStatesContext } from "../context/globalStates";
import {
  useAllClassesData,
  useAllSchoolsData,
  useCreateSubjectData,
} from "../../queryHooks/Queries";
import { Plus, X } from "react-feather";
import { toast } from "react-hot-toast";

const CreateSubject = () => {
  const { toggleModal, setModal } = useContext(GlobalStatesContext);

  // const { hideModal, modal } = props;
  const assessmentForm = useRef();
  const [formData, setData] = useState({
    school: null,
    title: "",
    grade: null,
    assessment: [],
  });
  const {
    data: allSchools,
    isLoading: loadingSchools,
    isError: errorLoadingSchools,
  } = useAllSchoolsData();

  const {
    data: allClasses,
    isLoading: loadingClasses,
    isError: errorLoadingClasses,
  } = useAllClassesData(
    formData?.school
      ? formData?.school?.school_id
      : toggleModal?.data?.thisSchool?.data?.school_id
  );

  const { mutate, isError, isLoading } = useCreateSubjectData();

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const { school, title, grade, assessment } = formData;
    // console.log("the head teacher selected=++>",head)
    const payload = {
      school: school
        ? school?.school_id
        : toggleModal?.data?.thisSchool?.data?.school_id,
      title,
      cat: assessment.length > 0 ? assessment : [],
      grade: grade
        ? grade?.grade_id
        : toggleModal?.data?.thisClass?.data?.grade_id,
    };
    mutate(payload);
    setData({
      school: null,
      title: "",
      grade: null,
      assessment: null,
    });
    if (!isLoading && !isError) {
      setModal({ show: false, data: null, action: null });
      toast.success(
        `${title} created for ${
          toggleModal?.data?.thisSchool
            ? toggleModal?.data?.thisSchool?.data?.name
            : school?.name
        }`,
        //  {
        //   style: {
        //     border: '1px solid white',
        //     padding: '16px',
        //     // color: '#713200',
        //     backgroundColor:'#00afef',
        //     color:"white"
        //   },
        // }
      );
      // setToast({show:true,msg:'Class created successfully'})
    }
    // !isLoading && !isError? :null;
  };
  const addAssessment = (e) => {
    e.preventDefault();
    // console.log("===>",e?.target.elements?.arms.value)
    setData({
      ...formData,
      assessment: [...formData.assessment, assessmentForm.current?.value],
    });
    assessmentForm.current.value = "";
  };
  const handleChange = (e) => {
    // setError({ name: null, errorMsg: null });
    const { name, type, checked, id, value } = e.target;
    if (name === "head") console.log("the head trainer=>", JSON.parse(value));

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
      : name === "grade"
      ? setData({ ...formData, grade: JSON.parse(value) })
      : name === "school"
      ? setData({ ...formData, school: JSON.parse(value) })
      : setData({
          ...formData,
          [name]: value,
        });
  };

  // const { toggleModal, setModal } = useContext(GlobalStatesContext);

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
          onClick={() => setModal({ show: false, data: null, action: null })}
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

        <h6 className="d-flex justify-content-center">Create Subject</h6>
        <hr className="mt-2" />
        <div className="p-2">
          <form className="row p-1" onSubmit={handleFormSubmit}>
            {/* ===========names========== */}
            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2">
              <h6 className="modal-form-label">Title</h6>
              <input
                className="form-check-input ms-2"
                type="text"
                name="title"
                placeholder="Bology"
                id="title"
                pattern="^[A-Za-z0-9]{1,30}$"
                // errorMessage= "Message must not be empty"
                value={formData?.title}
                onChange={handleChange}
              />
            </span>

            {/* ====names end======= */}

            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2">
              <h6 className="modal-form-label">School</h6>
              <select
                className="form-select ms-2"
                style={{ width: "50%" }}
                name="school"
                onChange={handleChange}
              >
                {toggleModal?.data?.thisSchool ? (
                  <option
                    selected={toggleModal?.data?.thisSchool?.data}
                    value={JSON.stringify(toggleModal?.data?.thisSchool?.data)}
                  >
                    {toggleModal?.data?.thisSchool?.data?.name}
                  </option>
                ) : (
                  <option>--Select School--</option>
                )}

                {allSchools?.data?.msg?.length > 0 ? (
                  allSchools?.data?.msg?.map((school, index) =>
                    school?.school_id !==
                    toggleModal?.data?.thisSchool?.data?.school_id ? (
                      <option key={index} value={JSON.stringify(school)}>
                        {school?.name}
                      </option>
                    ) : null
                  )
                ) : loadingSchools ? (
                  <option>loading schools...</option>
                ) : errorLoadingSchools ? (
                  <option>Error while loading schools!</option>
                ) : (
                  <option>No school record found</option>
                )}
              </select>
            </span>

            {/* <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements">
              <h6 className="modal-form-label">Grade</h6>
              <select
                className="form-select ms-2"
                style={{width:"50%"}}
                name="grade"
                onChange={handleChange}
              >
                <option defaultValue="">{toggleModal?.data?.thisSchool || formData?.school?"--Select a Grade--":"--Select School First--"}</option>
                {allClasses?.data?.length > 0 ? (
                  allClasses?.data?.map((grade, index) => (
                    <option key={index} value={JSON.stringify(grade)}>
                      {grade?.name}
                    </option>
                  ))
                ) : loadingClasses ? (
                  <option>loading grades...</option>
                ) : errorLoadingClasses ? (
                  <option>Error while loading grades!</option>
                ) : (
                  <option>No grade record found for this school</option>
                )}
              </select>
            </span> */}

            <div className="col-md-12 px-1">
              <div className="form-elements w-100 d-flex justify-content-start align-items-center">
                <h6 className="text-nowrap">Assessments[optional]</h6>
                <input
                  className="form-check-input ms-2"
                  type="text"
                  name="assessment"
                  placeholder="CAT-1"
                  ref={assessmentForm}
                  pattern="^[A-Za-z0-9]{1,30}$"
                  // id="arms"
                  style={{ width: "50%" }}
                  // value=""
                  // onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={addAssessment}
                  className="btn btn-primary btn-sm py-0 d-flex justify-content-center align-items-center ms-2"
                  style={{ width: "30px", height: "30px" }}
                >
                  <Plus size={"16px"} className="" />
                </button>
              </div>

              {/* added assessment */}
              <span className="row row-cols-4 px-2">
                {formData?.assessment?.length > 0
                  ? formData?.assessment?.map((thisAssessment, index) => (
                      <span
                        className="col display-flex align-items-center border rounded border-primary mt-1 ps-2 ms-1"
                        // style={{ width: "70%" }}
                        key={index}
                      >
                        <p className="p-0 m-0">{thisAssessment}</p>
                        <button
                          className="btn btn-sm text-danger"
                          onClick={(e) => {
                            e?.preventDefault();
                            setData({
                              ...formData,
                              assessment: formData.assessment.filter(
                                (data) => data !== thisAssessment
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
        {/* ====btns===== */}
        <span className="d-flex justify-content-end align-items-center mt-2">
          <button
            className="shadow"
            onClick={() => setModal({ show: false, data: null, action: null })}
          >
            Cancel
          </button>
          <button
            className="default-btn ms-2"
            style={{
              border: "2px solid #00AFEF",
              minWidth: "30px",
              cursor: `${isLoading}?"wait":""`,
            }}
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            Add score
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateSubject;

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
  useAllClassesData,
  useAllSchoolsData,
  useCreateStudentData,
} from "../../queryHooks/Queries";
// import {useQueryClient} from 'react-query'
import { Plus, X } from "react-feather";
import { GlobalStatesContext } from "../context/globalStates";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-hot-toast";


const CreateStudent = (props) => {
  //   const queryClient = useQueryClient();
  const {toggleModal, setModal} = useContext(GlobalStatesContext)

  // const { hideModal, modal } = props;
  const [formData, setData] = useState({
    school: null,
    first_name: "",
    last_name: "",
    other_name: "",
    grade: null,
    arm: null,
  });
  // console.log("form data fo all classes=>", data?.thisSchool?.data)
  const {
    data: allSchools,
    isLoading: loadingSchools,
    isError: errorLoadingSchools,
  } = useAllSchoolsData();
  // console.log("student school passed selected=>", data?.thisSchool);
  const {
    data: allClasses,
    isLoading: loadingClasses,
    isError: errorLoadingClasses,
  } = useAllClassesData(
    formData?.school
      ? formData?.school?.school_id
      : toggleModal?.data?.thisSchool?.data?.school_id
  );

  const { mutate, isError, isLoading } = useCreateStudentData();

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const { school, first_name, last_name, other_name, grade, arm } = formData;
    // console.log("the head teacher selected=++>",head)
    const payload = {
      school_id: school ? school?.school_id : toggleModal?.data?.thisSchool?.data?.school_id,
      first_name,
      last_name,
      other_name,
      arm: arm
        ? arm
        : toggleModal?.data?.thisClass?.data?.arms?.length > 0
        ? toggleModal?.data?.thisClass?.data?.arms[0]
        : null,
      grade: grade ? grade?.grade_id : toggleModal?.data?.thisClass?.data?.grade_id,
    };
    mutate(payload);
    setData({
      school: null,
      first_name: "",
      last_name: "",
      other_name: "",
      grade: null,
      arm: null,
    });

    if(!isLoading && !isError){
      setModal({show: false,data:null,action:null });
      toast.success('Student created successfully')
    }

  };

  const handleChange = (e) => {
    // setError({ name: null, errorMsg: null });
    const { name, type, checked, id, value } = e?.target;
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

  // console.log("arms===>", formData?.grade?.arms);
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
          onClick={() => setModal({show: false,action:null, data:null })}
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
          Create Student
        </h6>
        <hr className="mt-2"/>
        <div className="p-2">
          <form className="row p-1" onSubmit={handleFormSubmit}>
            
            {/* ===========names========== */}
            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2" >
              <h6 className="modal-form-label">First Name</h6>
              <input
                className="form-check-input ms-2"
                type="text"
                name="first_name"
                placeholder="John"
                id="f_name"
                pattern="^[A-Za-z0-9]{1,30}$"
                // errorMessage= "Message must not be empty"
                value={formData?.first_name}
                onChange={handleChange}
              />
            </span>

            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2" >
              <h6 className="modal-form-label">Last Name</h6>
              <input
                className="form-check-input ms-2"
                type="text"
                name="last_name"
                placeholder="Doe"
                id="l_name"
                pattern="^[A-Za-z0-9]{1,30}$"
                // errorMessage= "Message must not be empty"
                value={formData?.last_name}
                onChange={handleChange}
              />
            </span>

            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2" >
              <h6 className="modal-form-label">Other Name</h6>
              <input
                className="form-check-input ms-2"
                type="text"
                name="other_name"
                placeholder="Don"
                id="o_name"
                pattern="^[A-Za-z0-9]{1,30}$"
                // errorMessage= "Message must not be empty"
                value={formData?.other_name}
                onChange={handleChange}
              />
            </span>
            {/* ====names end======= */}


            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements mb-2" >
              <h6 className="modal-form-label">School</h6>
              <select
                className="form-select ms-2"
                style={{width:"50%"}}
                name="school"
                onChange={handleChange}
              >
                {
                  toggleModal?.data?.thisSchool?
                  <option
                  selected={toggleModal?.data?.thisSchool?.data}
                  value={JSON.stringify(toggleModal?.data?.thisSchool?.data)}
                >
                  {toggleModal?.data?.thisSchool?.data?.name}
                </option>:
                <option>
                --Select School--
              </option>
                }
                
                {allSchools?.data?.msg?.length > 0 ? (
                  allSchools?.data?.msg?.map((school, index) =>
                    school?.school_id !== toggleModal?.data?.thisSchool?.data?.school_id ? (
                      <option key={index} value={JSON.stringify(school)}>
                        {school?.name}
                      </option>
                    ) : null
                  )
                ) : loadingSchools ? (
                  <option>loading trainers...</option>
                ) : errorLoadingSchools ? (
                  <option>Error while loading trainers!</option>
                ) : (
                  <option>No trainer record found</option>
                )}
              </select>
            </span>

            <span className=" col-md-12 d-md-flex justify-content-start align-items-center form-elements">
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
            </span>

            <span className="col-md-12 d-md-flex justify-content-start align-items-center mt-3">
              <h6 className="modal-form-label">Arm</h6>
              <select
                className="form-select ms-2"
                style={{width:"50%"}}
                name="arm"
                onChange={handleChange}
              >
                {formData?.grade && formData?.grade?.arms?.length > 0 ? (
                  formData?.grade?.arms.map((arm, index) => (
                    <option key={index} value={arm}>
                      {arm}
                    </option>
                  ))
                ) : !formData?.grade ? (
                  <option>--Select a Grade first--</option>
                ) : (
                  <option>No arm found for this grade selected</option>
                )}
              </select>
            </span>
          </form>
        </div>

        <span className="d-flex justify-content-end align-items-center mt-2">
          <button className="shadow" onClick={ () => setModal({show: false,data:null,action:null })}>
            Cancel
          </button>

          <button
            className="default-btn ms-2"
            style={{ border: "2px solid #00AFEF", minWidth: "30px",cursor:`${isLoading}?"wait":""` }}
            onClick={handleFormSubmit}
            disabled={isLoading}
            
          >
            {
              isLoading?
              <PropagateLoader
              color="#0D6EFD"
              size={5}
              loading={true}
              className="m-auto"
            />:"Create"
            }
            
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateStudent;
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
  useAllClassesData,
  useAllSchoolsData,
  useCreateStudentData,
} from "../../queryHooks/Queries";
// import {useQueryClient} from 'react-query'
import { Plus, X } from "react-feather";

const CreateStudent = (props) => {
  //   const queryClient = useQueryClient();
  const { data } = props;
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
    formData?.school ? formData?.school?.school_id : data?.thisSchool?.data?.school_id
  );

  //   const schoolInview = queryClient?.getQueryData('school-inview')
  // console.log("student school selected=>", form?.school?form?.school:data?.data);

  const { mutate, isError, isLoading } = useCreateStudentData();

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const { school, first_name, last_name, other_name, grade, arm } = formData;
    // console.log("the head teacher selected=++>",head)
    const payload = {
      school_id: school ? school?.school_id : data?.thisSchool?.data?.school_id,
      first_name,
      last_name,
      other_name,
      arm:arm?arm:data?.thisClass?.data?.arms?.length>0?data?.thisClass?.data?.arms[0]:null,
      grade: grade?grade?.grade_id:data?.thisClass?.data?.grade_id,
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
    props?.onHide();
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
    <Modal {...props} className="" backdrop="static" keyboard={false} centered>
      <ModalDialog>
        <ModalHeader>
          <ModalTitle>Create Student</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="p-2">
            <form className="row p-1" onSubmit={handleFormSubmit}>
              {/* <span className="col-md-12 form-elements mb-2">
                <h6 className="m-0 p-0">School</h6>
                <select
                  className="form-select"
                  // type="text"
                  name="school"
                  onChange={handleChange}
                >
                  <option defaultValue="">--Select a School--</option>
                  {allSchools?.data?.msg?.length > 0 ? 
                    allSchools?.data?.msg?.map((school, index) => (
                      <option
                        key={index}
                        value={JSON.stringify({id:school?.school_id, name:school?.name})}
                      >{school?.name}</option>
                    ))
                   : loadingSchools ? (
                    <option>loading schools...</option>
                  ) : errorLoadingSchools ? (
                    <option>Error while loading schools!</option>
                  ) : (
                    <option>No school found</option>
                  )}
                </select>
              </span> */}
              {/* <span className="col-md-12 form-elements mb-2">
                <h6 className="m-0 p-0">School</h6>
                <input
                  className="form-check-input"
                  type="text"
                  name="school"
                  placeholder={`${data?.name}`}
                  id="school"
                  value={`${data?.name}`}
                  readOnly={true}
                />
              </span> */}

              <span className="col-md-12 form-elements">
                <h6>Student School</h6>
                <select
                  className="form-select"
                  // type="text"
                  name="school"
                  // placeholder="Enter school title"
                  // id="school"
                  // value={formData?.head}
                  onChange={handleChange}
                >
                  <option
                    // defaultValue={JSON.stringify(data?.data)}
                    selected={data?.thisSchool?.data}
                    value={JSON.stringify(data?.thisSchool?.data)}
                  >
                    {data?.thisSchool?.data?.name}
                  </option>
                  {allSchools?.data?.msg?.length > 0 ? (
                    allSchools?.data?.msg?.map((school, index) =>
                      school?.school_id !== data?.thisSchool?.data?.school_id ? (
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
              {/* ===========names========== */}
              <span className="col-md-12 form-elements mb-2">
                <h6>First Name</h6>
                <input
                  className="form-check-input"
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

              <span className="col-md-12 form-elements mb-2">
                <h6>Last Name</h6>
                <input
                  className="form-check-input"
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

              <span className="col-md-12 form-elements mb-2">
                <h6>Other Name</h6>
                <input
                  className="form-check-input"
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

              <span className="col-md-12 form-elements">
                <h6>Grade</h6>
                <select
                  className="form-select"
                  name="grade"
                  onChange={handleChange}
                >
                  <option defaultValue="">--Select Student Grade--</option>
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

              <span className="row mt-3">
                <h6>Arm</h6>
                <select
                  className="form-select"
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
                    <option>Select a Grade first</option>
                  ) : (
                    <option>No arm found for this grade selected</option>
                  )}
                </select>
              </span>
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

export default CreateStudent;

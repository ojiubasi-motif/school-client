import {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { classOptions } from "./constants/dummy";
import { useSchoolData } from "../queryHooks/Queries";
import CharacterDetails from "./CharacterDetails";

const SchoolDetails = () => {
  const location = useLocation();
  const [filteredFields,setFilter] =useState({character:"students", class:"all",arm:"all"});
  const{isLoading:loadingData, data:schoolData,isError:isSchoolLoadError} = useSchoolData({schoolId:location?.state?.school?.school_id,filteredFields});

  console.log("school details returned=>", !isSchoolLoadError && !loadingData? schoolData:isSchoolLoadError?'error':'loading...');
  const handleChange = (e)=>{
    setFilter({
        ...filteredFields,
        [e?.target?.name]: e?.target?.value,
    });
  }

  return (
    <div
      className="dash-table rounded mt-1 p-3 pb-0"
      style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
    >
      <span className="d-flex flex-column justify-content-start align-items-start w-100 ">
        <div className="d-flex fs-4 fw-bold">
          School:
          <p className="p-0 m-0 ms-1 fs-4 fw-bold" style={{ color: "#00afef" }}>
            {location?.state?.school?.name}{" "}
          </p>
        </div>
        <div className="display-flex mt-1" style={{ width: "70%" }}>
          <span className="p-2 fs-5 text-nowrap me-2">Filter By:</span>
          {/* ====filter group==== */}
          <div className="input-group">

            <div className="form-floating " style={{ maxWidth: "20%" }}>
              <select
                className="form-select "
                id="character"
                name="character"
                value={filteredFields?.character}
                onChange={handleChange}
                aria-label="Floating label select example"
              >
                <option selected="students" value="students">Students</option>
                <option value="trainers">Trainers</option>
                
                {/* <option selected="students">Students</option>
                <option value="trainers">Trainers</option> */}
                {/* <option value="2">Two</option>
                <option value="3">Three</option> */}
              </select>
              <label for="character">Students or Trainers</label>
            </div>

            <div className="form-floating ms-2" style={{ maxWidth: "20%" }}>
              <select
                className="form-select"
                id="class"
                name="class"
                value={filteredFields?.class}
                onChange={handleChange}
                aria-label="Floating label select example"
              >
                <option selected="all" value="all">All</option>
                {
                    classOptions?.map((option,index)=>(
                        <option key={index} value={option?.value}>
                            {option?.name}
                        </option>
                    ))
                }
              </select>
              <label for="class">CLASS</label>
            </div>

            <div className="form-floating ms-2" style={{ maxWidth: "20%" }}>
              <select
                className="form-select"
                id="arm"
                name="arm"
                value={filteredFields?.arm}
                onChange={handleChange}
                aria-label="Floating label select example"
              >
                <option selected="all" value="all">All</option>
                {
                    classOptions?.map((option,index)=>(
                        <option key={index} value={option?.value}>
                            {option?.name}
                        </option>
                    ))
                }
              </select>
              <label for="class">ARM</label>
            </div>

          </div>
          {/* =====filter group ends===== */}
        </div>
      </span>

      {/* ========table========= */}
      <table className="table table-borderless table-striped mt-3">
          <thead>
            <tr className="border-bottom">
              <th scope="col"><p className='gen-paragraph'>Student Id</p></th>
              <th scope="col"><p className='gen-paragraph'>Name</p></th>
              <th scope="col"><p className='gen-paragraph'>Class</p></th>
              <th scope="col"><p className='gen-paragraph'>Arm</p></th>
              <th scope="col"><p className='gen-paragraph'>Action</p></th>
              {/* <th scope="col"><p className='gen-paragraph'>Number of Students</p></th>
              <th scope="col"><p className='gen-paragraph'>Action</p></th> */}
            </tr>
          </thead>
          <tbody>
            {loadingData?<div>Please wait...</div>:isSchoolLoadError?<div>Error loading schools</div>:schoolData?.data?.code == 600 && schoolData?.data?.msg?.length > 0 ?schoolData?.data?.msg?.map((character, index) => (
              <CharacterDetails
                key={index}
                character={character}
                school={location?.state?.school?.name}
              />
            )):<div>No record is found</div>}
            <tr >
              <td colSpan={3} className="text-center">
                <Link to="/more" className="p-0 m-0 gen-link text-center">
                  View More
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      {/* =====end-of-table====== */}
    </div>
  );
};

export default SchoolDetails;
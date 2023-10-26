/* eslint-disable no-unused-vars */
import React, {useState } from "react";
import { MoreVertical, Plus } from "react-feather";
import { Link } from "react-router-dom";
import { useAllSchoolsData } from "../queryHooks/Queries";
import CreateSchool from "./modals/CreateSchool";
import { PropagateLoader } from "react-spinners";


const Schools = () => {
  const [modal, setModal] = useState({ show: false });
  const {
    data: allSchools,
    isLoading: isLoadingAllSchools,
    isError: errorloadingSchools,
  } = useAllSchoolsData();

  return (
    <>
      <div
        className="dash-table rounded mt-1 p-3 pb-0"
        style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
      >
        <span className="d-flex justify-content-between align-items-center w-100">
          <p className="p-0 m-0 fs-6">All Schools</p>
          <button
            className="btn btn-primary btn-sm text-nowrap"
            onClick={(e) => {
              e?.preventDefault();
              setModal({show:true});
            }}
          >
            Create School
            <Plus size={"16px"} className="" />
          </button>
          <MoreVertical
            size={"16px"}
            className=""
            style={{ cursor: "pointer" }}
          />
        </span>

        <table className="table table-borderless table-striped">
          <thead>
            <tr className="border-bottom">
              <th scope="col">
                <p className="gen-paragraph">School Id</p>
              </th>
              <th scope="col">
                <p className="gen-paragraph">Name</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingAllSchools ? (
              <td className="d-flex">
                  <PropagateLoader
              color="#0D6EFD"
              size={10}
              loading={true}
              className="m-auto"
            />
              </td>
              
            ) : errorloadingSchools ? (
              <div>Error loading schools</div>
            ) : allSchools?.data?.msg?.length > 0 ? (
              allSchools?.data?.msg?.map((school, index) => (
                <tr key={index} className="border-bottom ">
                  <td>
                    <div className="d-flex justify-content-start align-items-center">
                      <div className="ms-2">
                        <Link
                          className="topnav-link"
                          state={{ school }}
                          to={`schools/${school?.school_id}`}
                          stat
                        >
                          <h6 className="gen-paragraph fw-light">
                            {school?.school_id}
                          </h6>
                        </Link>

                        {/* <p className="gen-paragraph">{item.email}</p> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center">
                      
                      <div className="ms-2">
                        <Link
                          className="gen-link"
                          state={{ school }}
                          to={`schools/${school?.school_id}`}
                          // onClick={queryClient.setQueryData('school-inview',school)}
                        >
                          <h6 className="gen-text m-0 p-0">{school?.name}</h6>
                        </Link>
                        {/* <p className="gen-paragraph">{item.event}</p> */}
                      </div>
                    </div>
                  </td>
                  {/* <td>
                  <p className="p-0 m-0">{item.locaion}</p>
                  <h6 className="m-0 p-0 fw-light">{item.device}</h6>
                </td> */}
                </tr>
              ))
            ) : (
              <tr>No record is found</tr>
            )}
            {/* <tr>
              <td colSpan={3} className="text-center">
                <Link to="/more" className="p-0 m-0 gen-link text-center">
                  View More
                </Link>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {modal?.show ? <CreateSchool modal={modal} hideModal={setModal} /> : null}
    </>
  );
};

export default Schools;
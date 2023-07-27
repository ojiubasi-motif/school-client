import React from 'react'
import { MoreVertical } from 'react-feather'
import { Link} from 'react-router-dom'
import { useAllSchoolsData } from '../queryHooks/Queries'

const Schools = () => {
    const {data:allSchools, isLoading:isLoadingAllSchools, isError:errorloadingSchools} = useAllSchoolsData();
    console.log("see the schools returned", allSchools?allSchools:"still loading...");
  return (
    <div
        className="dash-table rounded mt-1 p-3 pb-0"
        style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
      >
        <span className="d-flex justify-content-between align-items-center w-100">
          <p className="p-0 m-0 fs-6">All Schools</p>
          <MoreVertical
            size={"16px"}
            className=""
            style={{ cursor: "pointer" }}
          />
        </span>


        <table className="table table-borderless">
          <thead>
            <tr className="border-bottom">
              <th scope="col"><p className='gen-paragraph'>School Id</p></th>
              <th scope="col"><p className='gen-paragraph'>Name</p></th>
              {/* <th scope="col"><p className='gen-paragraph'>Number of Students</p></th>
              <th scope="col"><p className='gen-paragraph'>Action</p></th> */}
            </tr>
          </thead>
          <tbody>
            {isLoadingAllSchools?<div>Please wait...</div>:errorloadingSchools?<div>Error loading schools</div>:allSchools?.data?.msg?.length > 0 ?allSchools?.data?.msg?.map((school, index) => (
              <tr key={index} className="border-bottom ">
                <td>
                  <div className="d-flex justify-content-start align-items-center">
                    {/* <img
                      src={item.img}
                      alt="user-img"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    /> */}
                    <div className="ms-2">
                      <Link className="topnav-link" state={{school}} to={`schools/${school?.school_id}`} stat>
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
                    {/* <PlayCircle
                      size={"24px"}
                      className="gen-text"
                      style={{ cursor: "pointer" }}
                    /> */}
                    <div className="ms-2">
                      <Link className="gen-link" state={{school}} to={`schools/${school?.school_id}`}>
                        <h6 className="gen-text m-0 p-0 fw-light">
                          {school?.name}
                        </h6>
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
      </div>
  )
}

export default Schools
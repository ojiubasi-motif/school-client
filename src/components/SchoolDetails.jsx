import React from 'react'
import  {useLocation} from 'react-router-dom'

const SchoolDetails = () => {
    const location = useLocation();



  return (
    <div className="dash-table rounded mt-1 p-3 pb-0"
    style={{ minHeight: "70vh", backgroundColor: "white", width: "100%" }}
  >
    <span className="d-flex justify-content-between align-items-center w-100">
      <p className="p-0 m-0 fs-3 fw-bold">School:{location?.state?.school?.name} </p>
      {/* <MoreVertical
        size={"16px"}
        className=""
        style={{ cursor: "pointer" }}
      /> */}
    </span>



    </div>
  )
}

export default SchoolDetails
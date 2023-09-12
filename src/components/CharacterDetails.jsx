/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const CharacterDetails = (props) => {
  const { character,school } = props;
  return (
    <>
      <tr  className="border-bottom">
        <td>
          <div className="d-flex justify-content-start align-items-center">
            <div className="ms-2">
              <Link className="topnav-link" to={`/students/${character?.student_id}`} state={{student:character?.student_id}}>
                <h6 className="gen-paragraph fw-light">
                  {character?.student_id}
                </h6>
              </Link>
              {/* <p className="gen-paragraph">{item.email}</p> */}
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-start align-items-center">
            <div className="ms-2">
              <Link className="gen-link" to={`/students/${character?.student_id}`} state={{student:character?.student_id}}>
                <h6 className="gen-text m-0 p-0 fw-normal">
                  {`${character?.first_name} ${character?.last_name}`}
                </h6>
              </Link>
              {/* <p className="gen-paragraph">{item.event}</p> */}
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-start align-items-center">
            <div className="ms-2">
              <h6 className="gen-text m-0 p-0">{character?.grade}</h6>

              {/* <p className="gen-paragraph">{item.event}</p> */}
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex justify-content-start align-items-center">
            <div className="ms-2">
              <h6 className="gen-text m-0 p-0">{character?.arm}</h6>
              {/* <p className="gen-paragraph">{item.event}</p> */}
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex justify-content-start align-items-center">
            <div className="ms-2">
              <Link className="gen-link" to={`/students/${character?.student_id}`} state={{student:character?.student_id,school}}>
                <h6 className="gen-text m-0 p-0 fw-light">view</h6>
              </Link>
              {/* <p className="gen-paragraph">{item.event}</p> */}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CharacterDetails;
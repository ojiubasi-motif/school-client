// import { AlignRight, ChevronDown, RefreshCw, Search } from "react-feather";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../public/img/logo.png";
import User from "../../../public/img/user.png"

const Topnav = () => {
  return (
    <div className="display-flex px-2 py-1 ">
      {/* ========logo======= */}
      <div
        className="logo d-flex justify-content-between align-items-center p-2"
        style={{ cursor: "pointer", height: "60px" }}
      >
        <Link to="/" className="text-decoration-none" style={{}}>
          <span
            className="d-flex align-items-center ps-2"
            style={{ width: "70%" }}
          >
            <img
              className="mr-2"
              src={Logo}
              alt="logo-img"
              style={{ width: "35px", height: "35px" }}
            />
            <h6 className="fw-bold text-secondary mt-1">ReSchool</h6>
          </span>
        </Link>
      </div>

      {/* ========nav list========= */}
      <ul className="m-0 p-0 nav-list display-flex " style={{minWidth:"40%"}}>
        <li>
          <NavLink to="/" className="topnav-link">
            Schools
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="topnav-link">
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="topnav-link">
            Trainers
          </NavLink>
        </li>
      </ul>

      {/* =========user profile========== */}
      <div className="dropdown">
          <div className="user-profile p-3  d-flex align-items-center justify-content-between dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer", height: "60px"}}>
              <img src={User} alt="user-avatar" className="rounded" style={{width:"35px", height:"35px", objectFit:"contain"}}/>
              {/* <div className="">
                  <h6 className="p-0 m-0">email@gmail.com</h6>
                  <p className="p-0 m-0" style={{fontSize:"14px"}}>My Organisation</p>
              </div> */}
              {/* <ChevronRight size={"14px"}/> */}
          </div>
          <ul className="dropdown-menu ms-2" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
    </div>
  );
};

export default Topnav;

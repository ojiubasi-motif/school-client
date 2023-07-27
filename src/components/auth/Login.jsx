import React,{useState} from "react";
import { useUserLogin} from "../../queryHooks/Queries";

const Login = () => {
  const [loginData, setLoginData] = useState({ user: "", password: "" });
  // e?.preventDefault();
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const {mutate:logInUser, isError:loginError, isLoading:logginLoading} = useUserLogin();

  const login = (e) => {
    e?.preventDefault();
    const payload ={
      user:loginData?.user,
      password:loginData?.password
    }
    logInUser(payload);
    setLoginData({user:"",password:""})
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "500px" }}
    >
      <form onSubmit={login} className="border rounded ">
        <h3>Sign In</h3>
        <div className="mb-2">
          <input
            type="text"
            name="user"
            value={loginData?.user}
            placeholder="enter email or phone"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
        <input
            type="password"
            name="password"
            value={loginData?.password}
            placeholder="********"
            onChange={handleChange}
          />
        </div>
        <button type='submit' disable={logginLoading} className="mx-auto" style={{ width: "50%" }}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;

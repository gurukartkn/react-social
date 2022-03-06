import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdFaceRetouchingNatural } from "react-icons/md";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      username: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-100 flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0">
          <div className="p-5">
            <p className="flex text-cyan-900 text-4xl font-bold">
              <MdFaceRetouchingNatural />
              NOVA
            </p>
          </div>
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="group ease-in-out duration-300 bg-cyan-400 hover:bg-cyan-500 hover:shadow-2xl text-white font-bold flex justify-center items-center p-3 rounded-xl cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="ease-in-out duration-300 group-hover:animate-spin group-hover:p-0.5 mr-4 bg-white rounded-full" />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

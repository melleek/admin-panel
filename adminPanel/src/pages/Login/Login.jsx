import { TextField } from "@mui/material";
import { axiosRequest } from "../../utils/axiosRequest";
import { saveToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  //login
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      userName: event.target["userName"].value,
      password: event.target["password"].value,
    };
    try {
      const { data } = await axiosRequest.post("Account/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      saveToken(data.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-[20px]">
      <img
        src="src/assets/images/LOGO.png"
        className="w-[120px] m-auto"
        alt=""
      />
      <h1 className="text-[18px] lg:text-[25px] font-custom text-center">
        Sign in
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] w-[450px] m-auto p-[20px]"
      >
        <TextField
          label="User Name"
          name="userName"
          fullWidth
          id="userName"
          type="text"
          required
          autoComplete="userName"
        />
        <TextField
          label="Password"
          name="password"
          fullWidth
          id="password"
          type="password"
          required
          autoComplete="password"
        />
        <button variant="contained" type="submit" className="bg-[green]  py-[10px] rounded-[8px] text-white uppercase tracking-[2px] font-[600]">Submit</button>
      </form>
    </div>
  );
};

export default Login;

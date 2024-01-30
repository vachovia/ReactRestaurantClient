import userLoginModel from "./userLoginModel";

interface userRegisterModel extends userLoginModel{ 
  name: string;
  role: string;
}

export default userRegisterModel;
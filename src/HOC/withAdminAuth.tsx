import jwt_decode from 'jwt-decode';
import { SD_Roles } from './../Interfaces/enums';

const withAdminAuth = (WrappedComponent :any) => {
    return (props: any) => {
        const token = localStorage.getItem('token');
        if(!token){
            window.location.replace('/login');
            return null;
        } else {
            const decode: { role: string } = jwt_decode(token);
            if (decode.role !== SD_Roles.ADMIN) {
                window.location.replace('/accessDenied');
                return null;
            }
        }
        return <WrappedComponent {...props}/>
    }
}

export default withAdminAuth;
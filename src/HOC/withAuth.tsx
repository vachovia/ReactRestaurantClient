const withAuth = (WrappedComponent :any) => {
    return (props: any) => {
        const token = localStorage.getItem('token');
        if(!token){
            window.location.replace('/login');
            return null;
        }
        return <WrappedComponent {...props}/>
    }
}

export default withAuth;
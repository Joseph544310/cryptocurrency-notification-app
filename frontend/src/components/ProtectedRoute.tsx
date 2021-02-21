import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios'

const ProtectedRoute = ({component, ...rest}: any)=> {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    useEffect( () => {
        console.log('Protected route checking user')
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8000/api/auth/user"
          }).then(res => {
              setUser(res.data.user);
              setLoading(false);
            //   console.log(user);
          }).catch(err => console.log(err));
    }, [])
    
    const RouteComponent = (props: any) => (
        React.createElement(component, props)
    );
    
    return (
    <Route {...rest} render={ props => {
        if (loading) {
            <p>Loading...</p>
        }
        else {
            if (user) {
                return <RouteComponent {...props} user={user}/>
            }
            else {
                console.log('not authenticated... redirecting to login')
                return <Redirect to={ {
                    pathname: '/auth',
                    state: {
                        from: props.location
                    }
                }}/>
            }
        }

    }}/>
    )
};

export default ProtectedRoute
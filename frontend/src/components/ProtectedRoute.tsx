import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

const ProtectedRoute = ({component, auth, ...rest}: any)=> {
    
    const RouteComponent = (props: any) => (
        React.createElement(component, props)
    );
    
    return (
    <Route {...rest} render={ props => {
        if (auth.isLoading) {
            <p>Loading...</p>
        }
        else {
            if (auth.isAuthenticated) {
                return <RouteComponent {...props}/>
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

const mapStateToProps = (state: any) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProtectedRoute)
import React from 'react'
import Cookies from "universal-cookie";
import api from "../../utils/api";

type ContextProps = {
    authWithToken: object;
    authUser: object;
    logoutUser: object;
    authWithTokenStatus: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    token?: string;
    userName: string;
    successAuth: any[];
};

export const UserContext = React.createContext<Partial<ContextProps>>({});

interface State {
    authWithTokenStatus: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    token?: string;
    userName: string;
    successAuth: any[];
};


class UserStore extends React.Component<any, State> {
    state = {
        authWithTokenStatus: 'INIT',
        isAuthenticated: false,
        isAdmin: false,
        token: undefined,
        userName: '',
        successAuth: [],
    };
    componentWillMount() {
        const cookies = new Cookies();
        // cookies.set('session_id', null, { path: '/', maxAge: 86400 });

        const localToken = cookies.get('session_id') || null;
        if (localToken) {
            this.authWithToken(localToken);
        } else {
            this.state = { authWithTokenStatus: 'COMPLETE' };
        }
    }

    authWithToken = (token: string) => {
        this.setState({ authWithTokenStatus: 'LOADING' });
        return api.validateToken(token).then((res) => {
            this.authUser(res.token, res.user, res.isAdmin);
            this.forceUpdate();
        }).catch(() => this.setState({ authWithTokenStatus: 'COMPLETE' }));
    }

    authUser = (token: string, userName: string, isAdmin: boolean, redirectTo?: string) => {
        const cookies = new Cookies();
        this.setState(() => ({
            authWithTokenStatus: 'COMPLETE',
            isAuthenticated: true,
            token,
            userName,
            isAdmin,
            successAuth: ['Login Successful.', `Welcome back, ${userName}!`],
        }));
        cookies.set('session_id', token, { path: '/', maxAge: 86400 });
    }
    logoutUser = () => {
        const cookies = new Cookies();
        this.setState(() => ({
            isAuthenticated: false,
            isAdmin: false,
            token: undefined,
            userName: '',
            successAuth: ['Logout Successful.', `See you later, ${this.state.userName}.`],
        }));

        cookies.remove('session_id', { path: '/' });
    }
    render() {
        const userFunctions = {
            'authWithToken': this.authWithToken,
            'authUser': this.authUser,
            'logoutUser': this.logoutUser
        }
        return (
            <UserContext.Provider value={{...this.state,...userFunctions}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

// export UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserStore
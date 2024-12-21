import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthService} from "@/services/auth-service.ts";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('email') != null);
        setRole(sessionStorage.getItem('role') || '');
    }, [])

    let logout = () => {
        AuthService.logout();
        navigate('/login');
        window.location.reload()
    }

    return (
        <div className={'header_container border'}>
            <div style={{flexBasis: '33.33%'}}>
                <Link to={
                    role === 'TEACHER' ? '/teacher' :
                        role === 'STUDENT' ? '/student' :
                            '/login'
                }>
                    <Label className={'nova-mono-regular'} style={{cursor: 'pointer'}}>UBS</Label>
                </Link>
            </div>

            <div style={{display: "flex", columnGap: '10px', justifyContent: 'flex-end', flexBasis: '33.33%'}}>
                {!loggedIn ? (
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    ) :
                    (
                            <Button onClick={logout}>Logout</Button>
                    )}
            </div>
        </div>
    );
};

export default Header;
import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {AuthenticationResponse} from "../models/AuthenticationResponse.ts";
import {AuthenticationRequest} from "@/models/AuthenticationRequest.ts";

export class AuthService {

    static baseUrl: string = GlobalConstants.baseUrl + 'auth';

    static authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>{
        return axios.post(`${this.baseUrl}/login`, request)
            .then(response => {
                this.setSessionStorage(response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Login failed:', error);
                throw error;
            });
    }

    static logout() {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
    }

    static setSessionStorage(authenticationResponse: AuthenticationResponse) {
        sessionStorage.setItem('email', authenticationResponse.email);
        sessionStorage.setItem('role', authenticationResponse.role);
        sessionStorage.setItem('userId', authenticationResponse.userId.toString());
    }
}

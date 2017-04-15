import { Headers } from '@angular/http';
const POST_HEADER = new Headers({'Content-Type': 'application/json'});
const VALIDATE = '/api/validate/';
const REGISTER_API = '/api/register/';
const GET_ADMIN_INFO = '/api/get-admin-info/';
const SIGN_OUT = '/api/sign-out/';
export { REGISTER_API, POST_HEADER, GET_ADMIN_INFO, SIGN_OUT, VALIDATE }

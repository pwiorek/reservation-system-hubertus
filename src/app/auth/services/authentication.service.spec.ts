import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';
import { AuthResponse } from '../../data/entities/authResponse';
import {UserApiService} from '../../data/api/user-api.service';


const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MjYyODU5NjEsImV4cCI6MTA0MzA2MTg3OTAsImF1ZCI6IiIsInN1YiI6IiJ9.V5fxMN9UX3U6Je7aE9BxWO_QLY6P8SHjGF1ng6QW6TaMMjzXyFinYN1Gg7steb9EfDC-po0en7Q5hb23SRiZsw';
const expiredToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiIiLCJpYXQiOjE2MjYyODU5NjEsImV4cCI6MTU5NDc0OTk5MCwiYXVkIjoiIiwic3ViIjoiIn0.bKr8cqUDqm0KvG0C20cruS1FDcmXNYBCdHhHuEPtA7Mt63D9P01B_ospRIU6nC0XzSTmMXZUf5Iprf5F8IAyrA';


class MockUserApi extends UserApiService {
  constructor() {
    super(null, null);
  }

  authUser(username: string, password: string): Observable<AuthResponse> {
    return of({ token: validToken });
  }
}


describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    service = new AuthenticationService(null, new MockUserApi());
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true from logIn() when token is equal to validToken', () => {
    service.logIn('', '').subscribe();
    expect(localStorage.getItem('token')).toEqual(validToken);
  });

  it('should return false from isUserAuthenticated() when token is null', () => {
    expect(service.isUserAuthenticated()).toBeFalsy();
  });

  it('should return false from isUserAuthenticated() when token is expired', () => {
    localStorage.setItem('token', expiredToken);
    expect(service.isUserAuthenticated()).toBeFalsy();
  });

  it('should return true from isUserAuthenticated() when token is valid', () => {
    localStorage.setItem('token', validToken);
    expect(service.isUserAuthenticated()).toBeTruthy();
  });
});

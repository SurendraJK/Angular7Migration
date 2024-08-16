import { Injectable } from '@angular/core';
import { UserContact } from './usercontact.model';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsercontactService {
  public localUrl = '/assets/users.json';
  usercontacts: UserContact[];

  constructor(private http: HttpClient) {
    this.loadUserContacts();
  }

  private loadUserContacts() {
    this.http.get<UserContact[]>(this.localUrl).subscribe((data) => {
      this.usercontacts = data;
    });
  }

  create(usercontact: UserContact) {
    usercontact.id = this.usercontacts.length + 1;
    this.usercontacts.push(usercontact);
  }

  delete(usercontact: UserContact) {
    this.usercontacts.splice(this.usercontacts.indexOf(usercontact), 1);
  }

  update(usercontact: UserContact) {
    const itemIndex = this.usercontacts.findIndex(item => item.id === usercontact.id);
    console.log(itemIndex);
    this.usercontacts[itemIndex] = usercontact;
  }

  getall(): Observable<UserContact[]> {
    if (this.usercontacts === undefined) {
      return this.http.get<UserContact[]>(this.localUrl);
    } else {
      return of(this.usercontacts);
    }
  }

  reorderUserContacts(usercontact: UserContact) {
    this.usercontacts = this.usercontacts
      .map(uc => uc.id === usercontact.id ? usercontact : uc)
      .sort((a, uc) => uc.id - uc.id);
  }

  getUserById(id: number) {
    const itemIndex = this.usercontacts.findIndex(item => item.id === id);
    console.log(itemIndex);
    return this.usercontacts[itemIndex];
  }
}

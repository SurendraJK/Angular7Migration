import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserContact } from '../share/usercontact.model';
import { UsercontactService } from '../share/usercontact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css'],
})

export class UsercontactComponent implements OnInit {

  public usersList: UserContact[];

  // [
  //   {
  //     id: 1,
  //     firstname: 'surendra',
  //     lastname: 'J',
  //     email: 'SurendraJ@gmai.com'
  //   }
  // ]; // Array<string>

  constructor(private ucs: UsercontactService, private router: Router, private dtr: ChangeDetectorRef) {
  }

  editUserContact(usercontact: UserContact) {
    console.log(usercontact);
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', usercontact.id.toString());
    this.router.navigate(['edit']);
    // this.ucs.update(usercontact);
  }

  deleteUserContact(usercontact: UserContact) {
    console.log(usercontact);
    this.ucs.delete(usercontact);
  }

  ngOnInit() {
    this.getUserContactDetails();
  }

  public getUserContactDetails() {
    this.ucs.getall().subscribe((response) => {
      console.log('response: ', response);
      this.usersList = response as UserContact[];
      this.dtr.detectChanges();
      // this.usersList = [
      //   {
      //     id: 1,
      //     firstname: 'surendra',
      //     lastname: 'J',
      //     email: 'SurendraJ@gmai.com'
      //   }
      // ];
      console.log('userlist: ', this.usersList);
    });
  }
}

import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ToastService } from 'src/app/services/common/toast.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  // Form
  public addContactForm: FormGroup;
  public firstNameForm: FormControl;
  public lastNameForm: FormControl;
  public emailIdForm: FormControl;
  public countryCodeForm: FormControl;
  public phoneNumberForm: FormControl;

  // Local variables
  public isEditpopup$ = new BehaviorSubject<boolean>(false);
  public contactList: Contact[] = [];
  public contactId: number;
  
  constructor(
    public contactService: ContactService,
    public toastService: ToastService
  ) { }

  async ngOnInit() {
    // Datatable pagination
    this.dtOptions = {
      paging: true,
      searching: true,
      info: true,
      pageLength: 10,
    };
    this.createFormControls();
    this.createForm();
    await this.getContacts();
    this.rerender();
  }

  createFormControls() {
    this.firstNameForm = new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern('.*\\S.*[a-zA-z ]')]);
    this.lastNameForm = new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern('.*\\S.*[a-zA-z ]')]);
    this.emailIdForm = new FormControl(null, [Validators.required, Validators.pattern('\\b[\\w.%-]+@[-.\\w]+\\.[A-Za-z]{2,4}\\b')]);
    this.countryCodeForm = new FormControl(null, [Validators.required, Validators.maxLength(4)]);
    this.phoneNumberForm = new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  }

  createForm() {
    this.addContactForm = new FormGroup({
      firstNameForm: this.firstNameForm,
      lastNameForm: this.lastNameForm,
      emailIdForm: this.emailIdForm,
      countryCodeForm: this.countryCodeForm,
      phoneNumberForm: this.phoneNumberForm
    });
  }

  async getContacts(){
    const result = await this.contactService.getContacts();
    if(result && result.length > 0){
      this.contactList = result;
      // FIlter Active Contacts
      this.contactList = this.contactList.filter(obj => obj.active);
    }
  }

  onAddContact() {
    this.isEditpopup$.next(false);
    this.addContactForm.reset();
  }

  onEditContact(contact : Contact) {
    this.isEditpopup$.next(true);
    this.contactId = contact.id;
    const phone = contact.phoneNumber.split('-', 2);
    this.addContactForm.setValue({
      firstNameForm: contact.firstName,
      lastNameForm: contact.lastName,
      emailIdForm: contact.email,
      countryCodeForm: phone[0].replace('+',''),
      phoneNumberForm: phone[1] 
    });
  }

  onCloseModal() {
    this.addContactForm.reset();
    document.getElementById('cancelAddContact').click();
  }

  saveContact() {
    const contact = new Contact();
    if(this.isEditpopup$.value) {
      contact.id = this.contactId;
    }
    contact.firstName = this.firstNameForm.value;
    contact.lastName =  this.lastNameForm.value;
    contact.email = this.emailIdForm.value;
    contact.phoneNumber =  '+' + this.countryCodeForm.value + '-' + this.phoneNumberForm.value;
    contact.active = true;

    this.contactService.addUpdateContact(contact).then(async _ => {
      if(this.isEditpopup$.value) {
        this.toastService.addToast('', 'Contact Updated Successfully', 'success');
      } else {
        this.toastService.addToast('', 'Contact Added Successfully', 'success');
      }
      this.addContactForm.reset();
      await this.getContacts();
      this.rerender();
    });
  }

  onDeleteContact(contactId: number) {
    this.contactService.deleteContact(contactId).then(async res => {
      if(res.message = "Success") {
        this.toastService.addToast('', 'Contact Deleted Successfully', 'success');
        await this.getContacts();
        this.rerender();
      } else {
        this.toastService.addToast('', 'Error While Deleting Contact', 'error');
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

}

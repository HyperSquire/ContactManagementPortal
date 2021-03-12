import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpService } from './common/http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpService: HttpService
  ) { }


  async getContacts(): Promise<any> {
    const url = '/getContacts';
    return await this.httpService.get(url);
  }

  async addUpdateContact(contact: Contact) {
    const url = '/addUpdate';
    const payload = contact;
    return this.httpService.post(url, payload);
  }

  async deleteContact(id: number) {
    const url = '/delete';
    const payload = id;
    return this.httpService.post(url, payload);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassageService {
  private destn1: any;
  private destn2: any;
  private status: any;
  private user: any;
  private destn3 = {} as any;
  private destn4 = {} as any;
  constructor() { }
  public setStatus(status) {
    this.status = status;
   // this.destn2 = destn2;
  }

   public setUser(user) {
    this.user = user;

  }

  public setDestn1(destn1) {
    this.destn1 = destn1;

  }

  public setDestn2(destn2) {
    this.destn2 = destn2;

  }

  public setDestn3(destn3) {
    this.destn3 = destn3;

  }

  public setDestn4(destn4) {
    this.destn4 = destn4;

  }

  getStatus() {
    return this.status;
  }

  getUser() {
    return this.user;
  }

  getDestn1() {
    return this.destn1;
  }

  getDestn2() {
    return this.destn2;
  }

  getDestn3() {
    return this.destn3;
  }

  getDestn4() {
    return this.destn4;
  }
}
import { Component, Input, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/Payment';
import { PaymentService } from 'src/app/services/payment.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Output() inputHandler = new EventEmitter();
  @Output() inputHandler2 = new EventEmitter();
  @Input() paymentID:number = 0;
  submitted = false;
  isAddMode: boolean = true;
  inputForm!:FormGroup 

  get f(){
    return this.inputForm.controls;
  }

  get cardOwnerName(){
    return this.inputForm.get('cardOwnerName');
  }
  get cardNumber(){
    return this.inputForm.get('cardNumber');
  }
  get securityCode(){
    return this.inputForm.get('securityCode');
  }
  get expirationDate(){
    return this.inputForm.get('expirationDate');
  }


  constructor(
    public paymentService: PaymentService
    ) { }

  ngOnInit(): void {

    this.inputForm = new FormGroup({
      cardOwnerName: new FormControl('', [
        Validators.required
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(16)
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(4)
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern("^(1[0-2]|0?[1-9])/(?:[0-9]{2})?[0-9]{2}$")
      ]),
    })
  }

  ngOnChanges():void{
    this.isAddMode = Boolean(!this.paymentID);
    if (!this.isAddMode) {
      this.paymentService.find(this.paymentID)
          .pipe(first())
          .subscribe(x => this.inputForm.patchValue(x));
    }
  }

  onSubmit(){
    this.changeState(true);
    if(this.inputForm.invalid){
      return
    }
    console.log(this.inputForm.value);
    if(this.isAddMode){
      this.createPayment(this.inputForm.value)
    } else {
      let value = this.inputForm.value;
      value.paymentDetailId = this.paymentID;
      this.updatePayment(value)
    }
  }

  createPayment(payment:Payment){
    this.paymentService.create(this.inputForm.value).subscribe(res => {
      //console.log('Payment created successfully!');    
      this.alertWithSuccess("Create");
      this.changeMode();
  })
  }

  updatePayment(payment:Payment){
    this.paymentService.update(this.paymentID, this.inputForm.value).subscribe(res => {
      //console.log('Payment updated successfully!');
      this.alertWithSuccess("Update");
      this.changeMode();
  })
  }

  changeState(state:boolean){
    this.submitted = state;
  }

  changeMode(){
    this.submitted = false;
    this.paymentID = 0;
    this.isAddMode = true;
    this.inputHandler.emit();
    this.inputForm.reset();
    this.inputHandler2.emit(); 
  }

  alertWithSuccess(msg:string){
    Swal.fire('Success', `You ${msg} Payment succesfully!`, 'success')
  }

}

import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  payments: Payment[] =[]
  paymentId: number = 0 ;
  header = 'Payment Detail Register'

  constructor( public paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getAllPayments();
  }

  updateId(id:number){
    this.paymentId = id;
  }

  reset(){
    this.paymentId = 0;
  }

  getAllPayments(){
    this.paymentService.getAll().subscribe((data: Payment[])=>{
      this.payments = data;
      //console.log(this.payments);
    })  
  }

  alertWithSuccess(){
    Swal.fire('Success', 'You added Todo succesfully!', 'success')
  }


}

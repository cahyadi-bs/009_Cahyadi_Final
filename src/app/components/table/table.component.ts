import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { PaymentService } from 'src/app/services/payment.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output() eventHandler = new EventEmitter();
  @Input() payments: Payment[] = [];

  constructor(public paymentService:PaymentService) { }

  ngOnInit(): void {
  }
  deletePayment(payment:Payment){  
    Swal.fire({  
      title: "Are you sure?",
      html: `You're about to delete: <br><br> Card Owner Name : ${payment.cardOwnerName}<br>Card Number: ${payment.cardNumber} <br><br> You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {  
      if (result.value) {  
        Swal.fire(  
          'Deleted!',  
          'Payment has been deleted.',  
          'success',
        )
        this.paymentService.delete(payment.paymentDetailId).subscribe(res => {
          this.payments = this.payments.filter(item => item.paymentDetailId !== payment.paymentDetailId);
          //console.log('Post deleted successfully!');
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Payment is still there :)',  
          'error'  
        )  
      }  
    })  
  }

  updatePayment(id:number){
    this.eventHandler.emit(id);
  }

  sortByID(){
    return this.payments.sort((a, b) => (a.paymentDetailId > b.paymentDetailId) ? 1 : -1);
  }


}

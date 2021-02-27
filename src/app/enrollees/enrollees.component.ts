import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrolleesService } from '../services/enrollees.service';
import {EditEnrolleeDialogComponent } from '../edit-enrollee-dialog/edit-enrollee-dialog.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.scss'],
})
export class EnrolleesComponent implements OnInit {

// Raw material/Instructional files are stored in assets folder. Content is commented.
// Please move that folder to the outside of repository folder and uncomment all the content and then Run 'Deno'.

// **💰BONUS CHALLENGE**💰:
// ID format of "Rand Miller" has been corrected...
// ...and changed to "89a0cd05-25fb-4b6e-a8f8-fc2187f690d0" from "89a0cd0525fb4b6ea8f8fc2187f690d0"

  enrollees$: Observable<API.DenoApp.IdentifiedEnrollee[]>;
  private subscriptions: Subscription[] = [];

  displayedColumns: string[] = [
    'actions',
    'id',
    'name',
    'dateOfBirth',
    'status',
  ];

  constructor(private enrolleesService: EnrolleesService, private dialog: MatDialog) {
    this.enrollees$ = this.enrolleesService.getEnrollees();
  }

  ngOnInit() {}

  handleEditClick(enrollee: API.DenoApp.IdentifiedEnrollee) {
     const dialogRef = this.dialog.open<
       EditEnrolleeDialogComponent,
       {
         enrollee: API.DenoApp.IdentifiedEnrollee;
       }
     >(EditEnrolleeDialogComponent, {
       ...EditEnrolleeDialogComponent.dialogConfig,
       data: {
         enrollee,
       },
     });

     this.subscriptions.push(
       dialogRef.afterClosed().subscribe(wasSuccessful => {
         if (wasSuccessful) {
            this.enrollees$ = this.enrolleesService.getEnrollees();
         }
       })
     );

  }
}

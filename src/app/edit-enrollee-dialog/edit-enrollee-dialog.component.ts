import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { EnrolleesService } from '../services/enrollees.service';
import { Subscription } from 'rxjs';

interface DialogData {
  enrollee: API.DenoApp.IdentifiedEnrollee;
}

@Component({
  selector: 'app-edit-enrollee-dialog',
  templateUrl: './edit-enrollee-dialog.component.html',
  styleUrls: ['./edit-enrollee-dialog.component.scss'],
})
export class EditEnrolleeDialogComponent implements OnInit {

  // Raw material/Instructional files are stored in assets folder. Content is commented.
  // Please move that folder to the outside of repository folder and uncomment all the content and then Run 'Deno'.

  // **💰BONUS CHALLENGE**💰:
  // ID format of "Rand Miller" has been corrected...
  // ...and changed to "89a0cd05-25fb-4b6e-a8f8-fc2187f690d0" from "89a0cd0525fb4b6ea8f8fc2187f690d0"

  static readonly dialogConfig: MatDialogConfig = {
    width: '40vw',
  };

  private subscriptions: Subscription[] = [];
  submitting = false;

  formGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    status: this.fb.control('', Validators.required)
  });

  nameControl = this.formGroup.controls.name;
  statusControl = this.formGroup.controls.status;

  disableSubmit = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<EditEnrolleeDialogComponent>,
    private fb: FormBuilder,
    private enrolleesService: EnrolleesService
  ) { }

  ngOnInit() {
    if (this.dialogData && this.dialogData.enrollee) {
      this.formGroup.setValue({
        name: this.dialogData.enrollee.name,
        status: this.dialogData.enrollee.active === true ? 'active' : 'inactive',
      });
    }

    // to check deep-quality of formvalues with original data
    this.formGroup.valueChanges.subscribe(_ => {
      if (this.nameControl.value === this.dialogData.enrollee.name &&
        ((this.statusControl.value === 'active' && this.dialogData.enrollee.active) ||
          (this.statusControl.value === 'inactive' && !this.dialogData.enrollee.active))) {
        this.disableSubmit = true;
      } else {
        this.disableSubmit = false;
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitting = true;

    const id = this.dialogData.enrollee.id;

    const body: API.DenoApp.PutEnrolleeBody = {
      name: this.formGroup.controls.name.value,
      active: this.formGroup.controls.status.value === 'active' ? true : false
    };

    this.subscriptions.push(
      this.enrolleesService.putEnrollee(id, body).subscribe({
        next: () => {
          this.submitting = false;
          this.dialogRef.close({ wasSuccessful: true });
        },
        error: () => {
          this.submitting = false;
          this.dialogRef.close();
        }
      })
    );

  }
}

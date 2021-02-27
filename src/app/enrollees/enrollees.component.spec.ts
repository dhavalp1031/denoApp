import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { EnrolleesComponent } from './enrollees.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EnrolleesService } from '../services/enrollees.service';
import { of } from 'rxjs';
import { EditEnrolleeDialogComponent } from '../edit-enrollee-dialog/edit-enrollee-dialog.component';

const enrollees = [
  {
    id: '36653835-fbe0-4c42-a93c-3e561823934f',
    active: true,
    name: 'Gabe Newell',
    dateOfBirth: '1962-11-03',
  },
  {
    id: 'ed9f9e35-9767-4586-a19b-903661aa859d',
    active: true,
    name: 'Todd Howard',
    dateOfBirth: '1971-04-25',
  },
  {
    id: 'e8637db3-3549-43ee-8e20-45b8fcb5a370',
    active: false,
    name: 'Reggie Fils-Aime',
    dateOfBirth: '1961-03-25',
  },
  {
    id: '8b8b9cf0-652e-4b82-a7ca-e9ed47e69be4',
    active: false,
    name: 'Hideki Kamiya',
  },
  {
    id: 'f445416d-82c2-4acd-b371-35567d5fd757',
    active: true,
    name: 'Cliffy B',
    dateOfBirth: '1975-02-12',
  },
  {
    id: '994cd525-be92-4664-97c9-cb110772383f',
    active: true,
    name: 'Doug Bowser',
    dateOfBirth: '1965-08-28',
  },
  {
    id: '2af2cd35-e3bc-47c2-9591-1edb0c1a0c90',
    active: true,
    name: 'Shigeru Miyamoto',
    dateOfBirth: '1952-11-16',
  },
  {
    id: '4c5cca1c-18cd-4216-b4b5-4524d1bd135e',
    active: false,
    name: 'Chris Sawyer',
    dateOfBirth: '1961-01-01',
  },
  {
    id: '2caf7c60-98bd-4592-971f-acbfd32dbafa',
    active: true,
    name: 'Mabel Addis',
    dateOfBirth: '1912-05-21',
  },
  {
    id: '0b0c9adc-f148-42ab-a8bf-3183da4bb879',
    active: true,
    name: 'Peter Molyneux',
    dateOfBirth: '1959-05-05',
  },
  {
    id: '65f43b1d-6790-409f-a5b3-fd7d69fa36a6',
    active: false,
    name: 'Will Wright',
    dateOfBirth: '1960-01-20',
  },
  {
    id: 'c478a933-37e0-4502-aafa-67e3fb7b7284',
    active: true,
    name: 'Kim Swift',
    dateOfBirth: '1983-01-01',
  },
  {
    id: '8e85cb7a-7f29-4cb7-9314-7e722e580205',
    active: true,
    name: 'Gunpei Yokoi',
    dateOfBirth: '1941-09-10',
  },
  {
    id: 'bd804bcd-8123-4dee-b21b-a71fcffd7533',
    active: false,
    name: 'Masahiro Sakurai',
    dateOfBirth: '1970-08-03',
  },
  {
    id: 'ee6d3cab-e875-4220-9a5c-17c7c14353a2',
    active: false,
    name: 'Roberta Williams',
    dateOfBirth: '1953-02-16',
  },
  {
    id: '89a0cd0525fb4b6ea8f8fc2187f690d0',
    active: true,
    name: 'Rand Miller',
    dateOfBirth: '1959-01-17',
  },
  {
    id: 'fe1636a3-4d23-4068-ba56-551fae06e29c',
    active: true,
    name: 'Jordan Mechner',
    dateOfBirth: '1964-06-04',
  },
  {
    id: '90ba3d4b-e3bb-435e-92c1-094534d00c94',
    active: true,
    name: 'Dona Bailey',
    dateOfBirth: '1956-01-01',
  },
  {
    id: 'd9bdeab0-735a-4742-9c46-cc4d5db37e0c',
    active: true,
    name: 'William Crowther',
    dateOfBirth: '1936-01-01',
  },
  {
    id: 'a06be89b-78de-459b-a9b7-6f57319fec99',
    active: false,
    name: 'Ogden Morrow',
  },
  {
    id: '45ebed1c-3782-4153-8ce1-83a0fda2b5d6',
    active: true,
    name: 'James Halliday',
    dateOfBirth: '1972-09-23',
  },
];

describe('EnrolleesComponent', () => {
  let component: EnrolleesComponent;
  let fixture: ComponentFixture<EnrolleesComponent>;
  let nativeElement: HTMLElement;
  let enrolleesService: EnrolleesService;
  let dialog: MatDialog;
  let dialogOpenSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolleesComponent],
      imports: [MatTableModule, HttpClientModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleesComponent);
    component = fixture.componentInstance;

    dialog = TestBed.get(MatDialog);
    nativeElement = fixture.debugElement.nativeElement;
    enrolleesService = TestBed.get(EnrolleesService);
    dialogOpenSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('List of enrollees', () => {
    it('should request and populate data when the component loads', async(() => {
      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenRenderingDone().then(() => {
        fixture.detectChanges();

        const tableRows = nativeElement.querySelectorAll<HTMLTableRowElement>(
          '#enrollees-table mat-row'
        );

        const desktopRowText = Array.from(tableRows).map(element =>
          element.innerText.replace(/\s+/g, ' ').trim()
        );
        spyOn(enrolleesService, 'getEnrollees').and.returnValue(of(enrollees));


        expect(tableRows.length).toBe(21);

        expect(desktopRowText).toEqual([
          'EDIT 36653835-fbe0-4c42-a93c-3e561823934f Gabe Newell 11/03/1962 Active',
          'EDIT ed9f9e35-9767-4586-a19b-903661aa859d Todd Howard 04/25/1971 Active',
          'EDIT e8637db3-3549-43ee-8e20-45b8fcb5a370 Reggie Fils-Aime 03/25/1961 Inactive',
          'EDIT 8b8b9cf0-652e-4b82-a7ca-e9ed47e69be4 Hideki Kamiya Not Available Inactive',
          'EDIT f445416d-82c2-4acd-b371-35567d5fd757 Cliffy B 02/12/1975 Active',
          'EDIT 994cd525-be92-4664-97c9-cb110772383f Doug Bowser 08/28/1965 Active',
          'EDIT 2af2cd35-e3bc-47c2-9591-1edb0c1a0c90 Shigeru Miyamoto 11/16/1952 Active',
          'EDIT 4c5cca1c-18cd-4216-b4b5-4524d1bd135e Chris Sawyer 01/01/1961 Inactive',
          'EDIT 2caf7c60-98bd-4592-971f-acbfd32dbafa Mabel Addis 05/21/1912 Active',
          'EDIT 0b0c9adc-f148-42ab-a8bf-3183da4bb879 Peter Molyneux 05/05/1959 Active',
          'EDIT 65f43b1d-6790-409f-a5b3-fd7d69fa36a6 Will Wright 01/20/1960 Inactive',
          'EDIT c478a933-37e0-4502-aafa-67e3fb7b7284 Kim Swift 01/01/1983 Active',
          'EDIT 8e85cb7a-7f29-4cb7-9314-7e722e580205 Gunpei Yokoi 09/10/1941 Active',
          'EDIT bd804bcd-8123-4dee-b21b-a71fcffd7533 Masahiro Sakurai 08/03/1970 Inactive',
          'EDIT ee6d3cab-e875-4220-9a5c-17c7c14353a2 Roberta Williams 02/16/1953 Inactive',
          'EDIT 89a0cd0525fb4b6ea8f8fc2187f690d0 Rand Miller 01/17/1959 Active',
          'EDIT fe1636a3-4d23-4068-ba56-551fae06e29c Jordan Mechner 06/04/1964 Active',
          'EDIT 90ba3d4b-e3bb-435e-92c1-094534d00c94 Dona Bailey 01/01/1956 Active',
          'EDIT d9bdeab0-735a-4742-9c46-cc4d5db37e0c William Crowther 01/01/1936 Active',
          'EDIT a06be89b-78de-459b-a9b7-6f57319fec99 Ogden Morrow Not Available Inactive',
          'EDIT 45ebed1c-3782-4153-8ce1-83a0fda2b5d6 James Halliday 09/23/1972 Active'
        ]);
      });
    }));


    it('should open an view dialog for Onetime Transfer', fakeAsync(() => {
      const enrollee = {
        id: '36653835-fbe0-4c42-a93c-3e561823934f',
        active: true,
        name: 'Gabe Newell',
        dateOfBirth: '1962-11-03',
      };

      component.ngOnInit();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
      const button = fixture.debugElement.nativeElement.querySelector('#edit-0');
      button.click();
      });

      tick();

      fixture.whenStable().then(() => {
        expect(component.handleEditClick).toHaveBeenCalled(),

        expect(dialogOpenSpy).toHaveBeenCalledWith(EditEnrolleeDialogComponent, {
        width: '40vw',
        data: {
          enrollee
        },
      });

      });

    }));
  });
});

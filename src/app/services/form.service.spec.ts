import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { HistoryArray } from '../enums/enums';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new form value to the undo array', () => {
    const formValue = JSON.stringify({ firstName: 'John' });
    service.addNewFormValue(formValue, HistoryArray.UndoArray);
    expect(service['undoArray'].length).toBe(1);
  });

  it('should add a new form value to the redo array', () => {
    const formValue = JSON.stringify({ firstName: 'John' });
    service.addNewFormValue(formValue, HistoryArray.RedoArray);
    expect(service['redoArray'].length).toBe(1);
  });

  it('should not add duplicate form value to the undo array', () => {
    const formValue = JSON.stringify({ firstName: 'John' });
    service.addNewFormValue(formValue, HistoryArray.UndoArray);
    service.addNewFormValue(formValue, HistoryArray.UndoArray);
    expect(service['undoArray'].length).toBe(1);
  });

  it('should get the last form value from the undo array and add it to the redo array', () => {
    const formValue = JSON.stringify({ firstName: 'John' });
    service.addNewFormValue(formValue, HistoryArray.UndoArray);
    const returnedFormValue = service.getFormValue(HistoryArray.UndoArray);
    expect(returnedFormValue).toBeUndefined();
    expect(service['redoArray'].length).toBe(1);
  });

  it('should get the last form value from the redo array and add it to the undo array', () => {
    const formValue = JSON.stringify({ firstName: 'John' });
    service.addNewFormValue(formValue, HistoryArray.RedoArray);
    const returnedFormValue = service.getFormValue(HistoryArray.RedoArray);
    expect(returnedFormValue).toBe(JSON.stringify({ firstName: 'John' }));
    expect(service['undoArray'].length).toBe(1);
  });

  it('should update the history state lengths correctly', () => {
    service['undoArray'].push(JSON.stringify({ firstName: 'John' }));
    service['redoArray'].push(JSON.stringify({ firstName: 'Doe' }));
    service.UpdateHistoryStateLength();
    service.undoArrayLength$.subscribe((length) => {
      expect(length).toBe(1);
    });
    service.redoArrayLength$.subscribe((length) => {
      expect(length).toBe(1);
    });
  });
});

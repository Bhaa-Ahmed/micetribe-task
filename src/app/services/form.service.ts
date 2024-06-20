import { Injectable } from '@angular/core';
import { HistoryArray } from '../enums/enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly historyArrayEnum = HistoryArray;

  private undoArrayLengthSubject = new BehaviorSubject<number>(0);
  undoArrayLength$ = this.undoArrayLengthSubject.asObservable();
  
  private redoArrayLengthSubject = new BehaviorSubject<number>(0);
  redoArrayLength$ = this.redoArrayLengthSubject.asObservable();


  private undoArray: string[] = [];
  private redoArray: string[] = [];

  addNewFormValue(formValue: string | undefined, historyArrayEnum: HistoryArray): void {
    if(!formValue) return;
    if(historyArrayEnum === this.historyArrayEnum.UndoArray) {
      if(formValue === this.undoArray[this.undoArray.length - 1]) return;
      this.undoArray.push(formValue);
      this.UpdateHistoryStateLength();
    } else {
      if(formValue === this.redoArray[this.redoArray.length - 1]) return;
      this.redoArray.push(formValue);
      this.UpdateHistoryStateLength();
    }
  }

  getFormValue(historyArrayEnum: HistoryArray) {
    if(historyArrayEnum === this.historyArrayEnum.UndoArray) {
      if(!this.undoArray.length) return;
      const formValue = this.undoArray.pop();
      this.addNewFormValue(formValue, this.historyArrayEnum.RedoArray);
    } else {
      if(!this.redoArray.length) return;
      const formValue = this.redoArray.pop();
      this.addNewFormValue(formValue, this.historyArrayEnum.UndoArray);
    }
    return this.undoArray[this.undoArray.length - 1];
  }

  UpdateHistoryStateLength() {
    this.undoArrayLengthSubject.next(this.undoArray.length);
    this.redoArrayLengthSubject.next(this.redoArray.length);
  }
}

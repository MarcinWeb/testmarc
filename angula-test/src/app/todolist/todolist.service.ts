import { EventEmitter, Injectable } from '@angular/core';
export interface ToDoList {
  status: boolean;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  toDoList: ToDoList[];
  toDoChange$: EventEmitter<string> = new EventEmitter();
  toDoAddElement$: EventEmitter<ToDoList> = new EventEmitter();
  toDoRemoveElement$: EventEmitter<number> = new EventEmitter();
  constructor() {
    this.toDoList = [];
  }

  addToDo(name: string) {
    this.toDoList.push({ status: false, name });
    this.toDoAddElement$.next({ status: false, name });
  }

  removeToDo(index: number) {
    this.toDoList.splice(index, 1);
    this.toDoRemoveElement$.next(index);
  }

  updateToDo(toDoList: ToDoList[]) {
    this.toDoList = toDoList;
    // for (let i = 0; i < this.toDoList.length; i++) {
    //   if (this.toDoList[i].status === true) {
    //     this.removeToDo(i);
    //   }
    // }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoList, TodolistService } from './todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private todolistService: TodolistService
  ) {}
  get toDoListItems() {
    return this.toDoList.get('toDoListItems') as FormArray;
  }

  toDoList = this.fb.group({
    addNewToDo: ['', Validators.required],
    toDoListItems: this.fb.array([]),
  });

  addToDo(form: FormGroup) {
    this.todolistService.addToDo(form.value.addNewToDo);
  }

  removeToDo(index: number) {
    this.todolistService.removeToDo(index);
  }

  updateToDo(): void {
    this.toDoListItems.valueChanges.subscribe((toDoList: ToDoList[]) => {
      this.todolistService.updateToDo(toDoList);
    });
    //Inside ToDoListService have full state as you wanted.
    //if you want remove item on select
    //then need only check it inside service and start removeEmitter
    // function i prepared it inside service but commented
  }

  addFormItem(toDoElement: ToDoList) {
    this.toDoListItems.push(
      this.fb.group({
        name: this.fb.control(toDoElement.name),
        status: this.fb.control(toDoElement.status),
      })
    );
  }

  removeFormItem(index: number) {
    this.toDoListItems.removeAt(index);
  }

  ngOnInit(): void {
    this.todolistService.toDoAddElement$.subscribe((toDoElement: ToDoList) => {
      this.addFormItem(toDoElement);
    });

    this.todolistService.toDoRemoveElement$.subscribe((index: number) => {
      this.removeFormItem(index);
    });

    this.updateToDo();
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodolistComponent } from './todolist.component';

@NgModule({
  declarations: [TodolistComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TodolistComponent],
})
export class TodolistModule {}

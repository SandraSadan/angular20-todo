import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
  
export class Todo implements OnInit {
  taskList = signal<Task[]>([]);
  taskName: string = '';

  ngOnInit(): void {
    debugger
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const taskList = localStorage?.getItem('taskList');
      if (taskList != null) {
        const parseData = JSON.parse(taskList);
        this.taskList.set(parseData);
      }
    }
  }
  
  addTask() {
    const newTaskObj = {
      name: this.taskName,
      status: 'New',
      isDeleted: false,
      createdAt: Date.now()
    } as Task;
    this.taskList.update((oldList) => [...oldList, newTaskObj]);
    this.taskName = '';
    localStorage.setItem('taskList', JSON.stringify(this.taskList()));
  }
}

export interface Task {
  name: string;
  status: string;
  isDeleted: boolean;
  createdAt: Number;
}

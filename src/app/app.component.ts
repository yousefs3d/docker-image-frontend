import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  hideHome: boolean = false;  
  
  ngOnInit(): void {
  }

  constructor(private router: Router){}

  navigateToClassroom(): void{
    this.hideHome = true;
    this.router.navigate(['/classroom']);
  }

  navigateToStudent(): void{
    this.hideHome = true;
    this.router.navigate(['/student']);
  }
}

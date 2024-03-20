import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FrontEnd/RevStay/src/app/components/user-home/user-home.component.spec.ts
import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHomeComponent);
========
import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideNavComponent);
>>>>>>>> main:FrontEnd/RevStay/src/app/components/user-home/side-nav/side-nav.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

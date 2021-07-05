import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { AppModule } from 'src/app/app.module';
import { trigger } from '@angular/animations';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent],
        imports: [RouterTestingModule, HttpClientTestingModule, AppModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click', () => {
    const compiled = fixture.debugElement.nativeElement;
    const triggerMenu = compiled.querySelector('#menuSelection');
    triggerMenu.click();
    fixture.detectChanges();
    expect(triggerMenu).toBeTruthy();
  });
});

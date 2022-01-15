import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
    declarations: [MenuComponent],
    imports: [RouterTestingModule, HttpClientTestingModule, AppModule],
    teardown: { destroyAfterEach: false }
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

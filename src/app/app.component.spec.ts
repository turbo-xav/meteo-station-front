import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalLayoutModule } from './generic/global-layout/global-layout.module';
import { AppModule } from './app.module';
describe('AppComponent', () => {
  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule,
        GlobalLayoutModule
    ],
    declarations: [AppComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/generic/core/core.module';
import { SharedModule } from 'src/app/generic/shared/shared.module';
import { GraphComponent } from './graph/graph.component';

import { StatsComponent } from './stats.component';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
    declarations: [StatsComponent, GraphComponent],
    imports: [
        SharedModule,
        CoreModule,
        HttpClientTestingModule,
        RouterTestingModule
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

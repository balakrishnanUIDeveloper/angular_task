import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showHeader has default value`, () => {
    expect(component.showHeader).toEqual(false);
  });
  it('should show headers when toggle header button is clicked', () => {
    const resetBtnEl = fixture.nativeElement.querySelector('button');
    resetBtnEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.showHeader).toEqual(true);
  });
});

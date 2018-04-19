import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapsePanelComponent } from './collapsePanel.component';

describe('CollapsePanelComponent', () => {
  let component: CollapsePanelComponent;
  let fixture: ComponentFixture<CollapsePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse open panel', () => {
    spyOn(component.ChangedState, 'emit');
    component.enableCollapse = true;
    component.isCollapsed = false;
    component.CollapseClick();
    expect(component.isCollapsed).toBeTruthy();
    fixture.detectChanges();
    expect(component.ChangedState.emit).toHaveBeenCalled();
  });

  it('should keep panel open', () => {
    component.enableCollapse = false;
    component.isCollapsed = false;
    component.CollapseClick();
    fixture.detectChanges();
    expect(component.isCollapsed).toBeFalsy();
  });

  it('should collapse open panel without calling emit', () => {
    spyOn(component.ChangedState, 'emit');
    component.enableCollapse = true;
    component.isCollapsed = false;
    component.ChangedState = null;
    component.CollapseClick();
    expect(component.isCollapsed).toBeTruthy();
    fixture.detectChanges();
    expect(component.ChangedState).toBeNull();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterCompUploadComponent } from './item-master-comp-upload.component';

describe('ItemMasterCompUploadComponent', () => {
  let component: ItemMasterCompUploadComponent;
  let fixture: ComponentFixture<ItemMasterCompUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMasterCompUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterCompUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

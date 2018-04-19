import { async, ComponentFixture } from '@angular/core/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NgModule, Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './translationLoader';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('TranslateLoader helper', () => {
    let httpClient: HttpClient;
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TestModule
            ]
        }).compileComponents();

        httpClient = TestBed.get(HttpClient);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.css('h1'));
    });

    it('should load the language file', async(() => {
        expect(debugElement.nativeElement.textContent).toEqual('component.title');
    }));
});

@Component({
    template: `
    <h1 translate>component.title</h1>`
})
class TestComponent { }

@NgModule({
    imports: [
        CommonModule,
        RouterTestingModule,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] } })
    ],
    declarations: [
        TestComponent
    ],
    exports: [
        TestComponent
    ]
})

class TestModule {}

import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../utils/translationLoader';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from '../../reducers/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
    ]
})

export class TestModule {}


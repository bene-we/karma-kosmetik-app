import { HideHeaderDirective } from './hide-header.directive';
import { Renderer2 } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DomController } from '@ionic/angular';

describe('HideHeaderDirective', () => {
    it('should create an instance', () => {
        inject([Renderer2, DomController], (renderer: Renderer2, domCtrl: DomController) => {
            const directive = new HideHeaderDirective(renderer, domCtrl);
            expect(directive).toBeTruthy();
        });
    });
});

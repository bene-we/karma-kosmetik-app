import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Chart } from 'chart.js';
import { Transaction } from '../../shared/models/transaction.model';
import { CashedReward } from '../../shared/models/reward.model';
import { ToastService } from '../../shared/services/toast.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-score',
    templateUrl: './score.page.html',
    styleUrls: ['./score.page.scss'],
})
export class ScorePage implements AfterViewInit {

    chartData: ChartData[];

    @ViewChild('canvas') canvas;
    chart: any;

    colors = [
        '#FFDEAD',
        '#EDC787',
        '#E5A73B'
    ];

    constructor(
        public productService: ProductService,
        private toastService: ToastService,
        private alertController: AlertController
    ) { }

    ngAfterViewInit() {

        /*
         * Transform the transactions to show only bought products in the pie chart
         */
        this.productService.transactions.subscribe(
            (res) => {
                res = res.filter(t => t.product);
                this.chartData = [];
                res.forEach((t) => {
                    const double = this.chartData.find(cd => cd.name === t.name);
                    if (double) {
                        double.points += t.points;
                    } else {
                        this.chartData.push({ name: t.name, points: t.points });
                    }
                    this.chartData.sort((a: ChartData, b: ChartData) => {
                        if (a.name < b.name) { return -1; }
                        if (a.name > b.name) { return 1; }
                        return 0;
                    });
                });
                this.displayChart(this.chartData);
            },
            (err) => console.warn(err)
        );
    }

    cashReward(id: string, description: string, name: string, points: number) {

        const transaction = {
            id: null,
            reward: {
                rewardId: id,
                description
            } as CashedReward,
            name,
            points: -points,
            timestamp: null
        } as Transaction;

        this.productService.points.subscribe(
            (p) => {
                if (points > p) {
                    this.toastService.showToast('Du hast nicht genügend Punkte!', 5000);
                } else {
                    this.showAlert(transaction);
                }
            },
            (e) => console.log(e)
        );
    }

    async showAlert(transaction: Transaction) {
        const alert = await this.alertController.create({
            header: 'Punkte einlösen?',
            message: 'Dies kann nicht rückgängig gemacht werden!',
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    handler: () => { return; }
                },
                {
                    text: 'Einlösen',
                    handler: () => {
                        this.productService.addTransaction(transaction);
                    }
                }
            ]
        });
        await alert.present();
    }


    /*
     * Customize the pie chart and show it
     */
    displayChart(chartData: ChartData[]) {

        /*
         * Add number of points in the center of the doughnut
         * See http://jsfiddle.net/nkzyx50o/
         *
         * Alternative (more accurate):
         * https://github.com/ciprianciurea/chartjs-plugin-doughnutlabel
         *
         */

        // noinspection JSUnusedGlobalSymbols,JSIgnoredPromiseFromCall
        Chart.pluginService.register({
            beforeDraw: (chart) => {
                if (chart.config.options.elements.center) {
                    const ctx = chart.chart.ctx;

                    const centerConfig = chart.config.options.elements.center;
                    const fontStyle = centerConfig.fontStyle || 'Roboto';
                    const txt = centerConfig.text;

                    const color = centerConfig.color || '#FFD9CC';
                    const sidePadding = centerConfig.sidePadding || 20;
                    const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

                    ctx.font = '20px ' + fontStyle;

                    // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    const stringWidth = ctx.measureText(txt).width;
                    const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    const widthRatio = elementWidth / stringWidth;
                    const newFontSize = Math.floor(30 * widthRatio);
                    const elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    const fontSizeToUse = Math.min(newFontSize, elementHeight);

                    // Set font settings to draw it correctly.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) + 8;
                    ctx.font = fontSizeToUse + 'px ' + fontStyle;
                    ctx.fillStyle = color;

                    // Draw text in center
                    ctx.fillText(txt, centerX, centerY);
                }
            }
        });

        this.chart = new Chart(this.canvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: chartData.map(p => p.name),
                datasets: [{
                    data: chartData.map(p => p.points),
                    backgroundColor: this.colors
                }]
            },
            options: {
                elements: {
                    center: {
                        text: chartData.map(i => i.points).reduce((sum, count) => sum + count),
                        color: '#6BB3A2',
                        fontStyle: 'Roboto',
                        sidePadding: 60
                    }
                },
                maintainAspectRatio: false,
                cutoutPercentage: 60,
                tooltips: {
                    enabled: false
                }
            }
        });

    }

}

interface ChartData {
    name: string;
    points: number;
}

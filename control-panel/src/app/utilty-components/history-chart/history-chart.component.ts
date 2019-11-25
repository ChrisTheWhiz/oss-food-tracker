import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, BaseChartDirective, Label} from 'ng2-charts';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'app-history-chart',
	templateUrl: './history-chart.component.html',
	styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {
	timelineOptions = ['Last week', 'Last 2 weeks', 'Last month', 'Last 6 months'];
	timelineFormControl = new FormControl(this.timelineOptions[0]);
	@ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
	public lineChartData: ChartDataSets[] = [
		{
			data: [1000, 1025, 1100, 1050, 990, 1010, 1090],
			fill: false,
			borderColor: '#f2f442',
			pointBackgroundColor: '#ff6200',
			pointBorderColor: '#ff6200'
		}
	];
	// public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartLabels: Label[] = ['10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12'];
	public lineChartLegend = true;
	public chartOptions: ChartOptions = {
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					color: '#fff'
				},
				ticks: {
					fontColor: '#fff'
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					color: '#fff'
				},
				ticks: {
					fontColor: '#fff'
				}
			}],
		},
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		tooltips: {
			enabled: true
		}
	};
	public lineChartType: ChartType = 'line';

	constructor() {
	}

	ngOnInit() {
		// this.chart.colors = [
		// 	{
		// 		backgroundColor: '#ffffff',
		// 		borderColor: '#000000',
		// 		pointBorderColor: '#ff0018',
		// 		pointBackgroundColor: '#bdb600',
		// 		pointHoverBackgroundColor: '#1f30ff',
		// 		pointHoverBorderColor: '#ff00f3',
		// 		hoverBackgroundColor: '#333333',
		// 		hoverBorderColor: '#333333',
		//
		// 	}
		// ];
	}

	getChartWidth() {
		return Math.floor(Math.max(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 3, 400));
	}
}

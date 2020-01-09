import { Component, OnInit } from '@angular/core';
import { IModalDialog, IModalDialogOptions, IModalDialogButton, IModalDialogSettings } from 'ngx-modal-dialog';
import { ComponentRef } from '@angular/core';
declare let $: any;
import * as Chartist from 'chartist';

export interface ISimpleModalDataOptions {
  text: string;
}
@Component({
  selector: 'app-diabetes-graph',
  templateUrl: './diabetes-graph.component.html',
  styleUrls: ['./diabetes-graph.component.scss']
})
export class DiabetesGraphComponent implements IModalDialog, OnInit {
  text: string;
  actionButtons: IModalDialogButton[];
  config: IModalDialogSettings;
  time: string = "DAILY";

  constructor() {
    this.actionButtons = [
      //{ text: 'Close' }, // no special processing here
      { text: 'Close', onAction: () => true },
      //{ text: 'I never close', onAction: () => false }
    ];
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
  }

  ngOnInit() {
    this.loadChart();
  }


  onTimeChange(value) {
    console.log(value);

  }

  loadChart() {
    var chart = new Chartist.Line('#chartist-chart', {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
      // Naming the series with the series object array notation
      series: [
        {
          name: 'series-1',
          data: [2, 6, 4, 8, 12, 1, 4, 10]
        },
        {
          name: 'series-2',
          data: [4, 3, 5, 3, 1, 3, 6, 10]
        }, {
          name: 'series-3',
          data: [2, 4, 3, 1, 4, 5, 3, 2]
        }]
    }, {
      height: 300,
      width: 600,
      fullWidth: true,
      // Within the series options you can use the series names
      // to specify configuration that will only be used for the
      // specific series.
      series: {
        'series-2': {
          lineSmooth: Chartist.Interpolation.simple(),
          showLine: false
        },
        'series-3': {
          showLine: false
        },
        'series-1': {
          showPoint: true
        }
      }
    }, [
      // You can even use responsive configuration overrides to
      // customize your series configuration even further!
      ['screen and (max-width: 320px)', {
        series: {
          'series-2': {
            lineSmooth: Chartist.Interpolation.none(),
            showArea: false
          },
          'series-3': {
            lineSmooth: Chartist.Interpolation.none(),
            showPoint: true
          }
        }
      }]
    ]);
  }
}

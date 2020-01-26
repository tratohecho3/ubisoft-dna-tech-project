import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core'

@Component({
  selector: 'ubisoft-dna-tech-project-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {
  @Input() readonly label: string
  @Input() readonly data: number[]
  @Input() readonly dataLabels: string[]

  readonly chartType = 'line'
  readonly chartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: '#c8b7d2'
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: '#c8b7d2'
          }
        }
      ]
    },
    legend: {
      labels: {
        fontColor: '#c8b7d2'
      }
    }
  }
  readonly chartColors = [
    {
      backgroundColor: 'rgba(156, 29, 231, 0.2)',
      borderColor: 'rgba(156, 29, 231, 1)',
      borderWidth: 3
    }
  ]

  chartLabel: string
  chartDatasets: [{ data: number[]; label: string }]
  chartLabels: string[]

  constructor() {}

  private _setChartDataSet() {
    this.chartDatasets = [{ data: this.data, label: this.label }]
  }

  /**
   * If the data has changed, update the chart data.
   */
  ngOnChanges({
    data: { previousValue = [], currentValue = [], firstChange }
  }: SimpleChanges) {
    const hasDataChanged =
      !firstChange && previousValue.toString() !== currentValue.toString()

    if (hasDataChanged) this._setChartDataSet()
  }

  ngOnInit() {
    this.chartLabels = this.dataLabels
    this._setChartDataSet()
  }
}

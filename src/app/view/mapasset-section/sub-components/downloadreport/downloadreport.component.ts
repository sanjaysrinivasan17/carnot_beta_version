import { Component, OnInit } from '@angular/core';
import { HttpAssetService } from '../../services-assetmap/http.assetservice';

@Component({
  selector: 'downloadreport',
  templateUrl: './downloadreport.component.html',
  styleUrls: ['./downloadreport.component.css']
})
export class DownloadreportComponent implements OnInit {
  type: any;
  date: any;
  main_data: any;
  typekeys: any = [];
  mode: any;
  report_link: any;
  link: any;
  inverter_keys: any;
  inverter: any;
  inverter_val: any;

  constructor(private _http: HttpAssetService) { }

  ngOnInit(): void {
    this.type = sessionStorage.getItem('type')
    this.date = localStorage.getItem('date')
    if (this.type == 'SCPM') {
      this.typekeys = ['Summary', 'Sub Camp']
    } else {
      this.typekeys = ['Deviation', 'Sub Camp Deviation']
    }

    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      // console.log(this.main_data)
      this.onload()

    })
  }

  onload() {

    console.log(this.main_data)
    this.report_link = this.main_data['projectdata'][this.date][this.type]['project_properties']['Report'][this.type]
    this.inverter_keys = Object.keys(this.main_data['projectdata'][this.date][this.type]['inverter_deviation']['data'])

  }

  selectChangefeature(mode) {
    this.mode = mode
    if (this.type == "SCPM") {
      if (mode == "Summary") {
        let sideBar = document.getElementById('inverter_deviation');
        sideBar.style.display = 'none';
        let download = document.getElementById('download');
        download.style.display = 'block';
        this.link = this.report_link + "summary.csv"
      } else {
        let sideBar = document.getElementById('inverter_deviation');
        sideBar.style.display = 'none';
        let download = document.getElementById('download');
        download.style.display = 'block';
        this.link = this.report_link + "inverterwise.csv"
      }
    } else {
      if (mode == "Deviation") {
        let sideBar = document.getElementById('inverter_deviation');
        sideBar.style.display = 'none';
        let download = document.getElementById('download');
        download.style.display = 'block';
        this.link = this.report_link + "Summary.xlsx"
      } else {
        let sideBar = document.getElementById('inverter_deviation');
        sideBar.style.display = 'block';

        this.link = this.report_link + this.inverter_val + "/" + this.inverter_val + ".xlsx"
      }

    }
    // alert(this.link)
  }
  selectChangeinverter(inverter) {
    this.inverter_val = inverter
    let download = document.getElementById('download');
    download.style.display = 'block';
    this.selectChangefeature(this.mode)
  }

  downloadMyFile(report_path) {
    // alert(report_path)
    // return
    const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    link.href = report_path;
    // link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}

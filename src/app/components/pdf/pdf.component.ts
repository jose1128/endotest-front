import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DiagnosticResponse } from 'src/app/interfaces/response.diagnostic.interface';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import { PersonService } from '../../services/person/person.service';
import { PatienceResponse } from 'src/app/interfaces/response/patience.response.interface';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  dianostic: DiagnosticResponse;
  patience: PatienceResponse;

  constructor(public route: ActivatedRoute ,
              private diagnosticService: DiagnosticService,
              private personService: PersonService) {
  }

  ngOnInit(): void {
    const routeData = this.route.snapshot.paramMap;
    const diagnosticId = routeData.get('idDiagnostic');
    const documetNumber = routeData.get('documentNumber');


    this.diagnosticService.getExamById(diagnosticId).subscribe({
      next: (response : DiagnosticResponse) =>  this.dianostic = response,
      error: (err) => console.log(err)
    });

    this.personService.findPersonByDocumentNumber(Number(documetNumber)).subscribe({
      next: (response: PatienceResponse) => this.patience =  response,
      error: (err) => console.log(err)
    });
  }

  public downloadPDF(): void {
    const DATA = document.getElementById('htmlData')!;
    const doc = new jsPDF('p', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

  refresh() {
    window.location.reload();
  }

}

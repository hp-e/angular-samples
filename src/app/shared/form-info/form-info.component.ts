import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-info',
  template: `
  <section class="section">
  <div class="columns">
    <div class="column">
    <h1>Form attributes</h1>
        <pre>
            <table>            
                <tbody>
                    
                    <tr>
                        <td>Valid</td>
                        <td>:</td>
                        <td>{{form?.valid}}</td>
                    </tr>
                    <tr>
                        <td>Dirty</td>
                        <td>:</td>
                        <td>{{form?.dirty}}</td>
                    </tr>
                    <tr>
                        <td>Touched</td>
                        <td>:</td>
                        <td>{{form?.touched}}</td>
                    </tr>
                    <tr>
                        <td>Untouched</td>
                        <td>:</td>
                        <td>{{form?.untouched}}</td>
                    </tr>
                    <tr>
                        <td>Prisine</td>
                        <td>:</td>
                        <td>{{form?.pristine}}</td>
                    </tr>
                    <!--<tr *ngIf="isReactiveForm">
                    <td>Has errors</td>
                    <td>:</td>
                    <td>{{form?.hasError}}</td>
                </tr>-->
        
                </tbody>
            </table>
        </pre>
    </div>
    <div class="column">
    <h1>Form Errors</h1>
    <pre>{{form.errors | json}}</pre>
    </div>
    <div class="column">
    <h1>Form value</h1>
        <pre>{{form.value | json}}</pre>
    </div>
  </div>
  
</section>

  `,
  styles: []
})
export class FormInfoComponent implements OnInit {

  @Input() form: any;

  constructor() { }

  ngOnInit() {
  }

}

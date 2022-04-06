import { Component, Input, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
})
export class TextfieldComponent implements AfterContentInit {

  @Input() label: string = "";
  @Input() required: boolean = false;
  @Input() type: string = "";
  showPasswd: boolean = true;
  @ContentChild('passwordField') child: any;

  ngAfterContentInit() {
    if (this.child && this.type == "password") {
      this.child.nativeElement.type = "password";
    }
  }
  togglePassword() {
    if (this.child && this.type == "password") {
      this.showPasswd = !this.showPasswd;
      if (this.showPasswd)
        this.child.nativeElement.type = "password";
      else
        this.child.nativeElement.type = "text";
    }
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/components/form-base.component';
import { User } from 'src/app/models/usuario';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  modalRef?: BsModalRef;
  loginForm: FormGroup;
  user: User;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private account: AccountService, private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    super();

    this.toastr.toastrConfig.positionClass = 'toast-top-center';

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'Senha deve ter entre 6 a 15 caracteres'
      }
    };

    super.ConfMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    super.ConfigValidFormBase(this.formInputElements, this.loginForm);
  }

  loginAccount(){
    this.spinner.show();

    this.user = Object.assign({}, this.user, this.loginForm.value)

    this.account.Login(this.user)
    .subscribe({
      next: success => { this.processSuccess(success)},
      error: error => { this.ProcessFail(error) }
    }).add(() => this.spinner.hide());

    this.chancesNotSave = false;
  }

  processSuccess(response: any) {
    this.loginForm.reset();

    this.account.LocalStorage.SaveDataUser(response);

    this.toastr.toastrConfig.timeOut = 1000;

    this.toastr.success('Bem vindo!');

    this.modalService.hide();
  }

  ProcessFail(fail: any) {
    this.displayMessage['password'] = fail.error.errors['Password'] ? fail.error.errors['Password'] : fail.error.errors['Messages'];
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

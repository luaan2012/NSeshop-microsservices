import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MASKS, NgBrazilValidators, number } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { FormBaseComponent } from 'src/app/components/form-base.component';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/usuario';
import { AccountService } from '../service/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = []
  registerForm: FormGroup;
  user: User;
  MASKS = MASKS;

  constructor(private fb: FormBuilder, private account: AccountService, private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService)
  {
    super();

    this.validationMessages = {
      name: {
        required: 'Nome é obrigatório',
        rangeLength: 'Nome deve ter mais que 3 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      cpf: {
        required: 'Informe um CPF válido',
        cpf: 'CPF inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'Senha deve ter entre 6 a 15 caracteres'
      },
      passwordConfirm: {
        required: 'Informe a senha novamente',
        rangeLength: 'Senha deve ter entre 6 a 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.ConfMessagesValidationBase(this.validationMessages);
  }

  get f(): any { return this.registerForm.controls; }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let name = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 200])]);
    let passwordConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(password)]);

    this.registerForm = this.fb.group({
      name: name,
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      password: password,
      passwordConfirm: passwordConfirm
    });
  }

  ngAfterViewInit(): void {
    super.ConfigValidFormBase(this.formInputElements, this.registerForm);
  }

  createAccount(){
    this.spinner.show();

    this.user = Object.assign({}, this.user, this.registerForm.value)

    this.account.RegisterUser(this.user)
    .subscribe({
      next: success => { this.processSuccess(success)},
      error: error => { this.ProcessFail(error) }
    }).add(() => this.spinner.hide());

    this.chancesNotSave = false;
  }

  processSuccess(response: any) {
    console.log(response)
    this.registerForm.reset();
    this.errors = [];

    this.account.LocalStorage.SaveDataUser(response);

    this.toastr.toastrConfig.timeOut = 1500;
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    let toast = this.toastr.success('Cadastro realizado com Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }else{
      this.router.navigate(['/home']);
    }
  }

  ProcessFail(fail: any) {
    this.errors = fail.error.errors['Messages'] ? fail.error.errors['Messages'] : fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

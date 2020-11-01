import { Router } from '@angular/router';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BroadcastingService } from '../../shared/broadcasting.service';
import {  BroadcastingElement } from '../../shared/interfaces';
import { Subject, Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-broadcasting-send-create-page',
  templateUrl: './broadcasting-page-create.html',
  styleUrls: [ './broadcasting-page-create.scss' ]
})
export class BroadcastingCreatePageComponent implements OnInit, AfterViewChecked, OnDestroy {
  private readonly destroy$ = new Subject();

  public submitted: boolean = false;
  public formGroup: FormGroup;
  public get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }
  public channels: Array<any> = [
    { id: 1, name: 'Первый канал' },
    { id: 2, name: 'Второй канал' }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private broadcastingService: BroadcastingService
  ) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          content: [ '', Validators.required ],
        }),
        this._formBuilder.group({
          channel: [ '', Validators.required ]
        }),
        this._formBuilder.group({
          title: [ '', Validators.required ]
        }),
      ])
    });

    const draft = this.broadcastingService.getExistDraft();
    if (draft) {
      draft.forEach((v, i) => this.formArray.get([i]).setValue(v));
    }
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getBroadcastingElement(): BroadcastingElement {
    const formValue = this.formArray.value as Array<any>;

    return (
      formValue.reduce((acc, el) => {
        return Object.assign(acc, el);
      }, {})
    ) as BroadcastingElement;
  }

  private saveDraft(): Observable<boolean> {
    const element = this.formArray.value;
    return this.broadcastingService
      .setDraft(element)
      .pipe(takeUntil(this.destroy$));
  }

  // EVENTS
  onSaveClick() {
    this.saveDraft()
      .subscribe((success) => {
        if (success) {
          this.router.navigate([ '/broadcasting' ]);
        } else {
          throw new Error('Ошибка сохранения черновика');
        }
      });
  }

  onSelectionChange(): void {
    this.saveDraft();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const element = this.getBroadcastingElement();

    this.submitted = true;
    this.broadcastingService
      .saveBroadcast(element)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.submitted = false)
      )
      .subscribe(() => {
        this.broadcastingService.clearDraft();
        this.router.navigate([ '/broadcasting' ]);
      });
  }
}

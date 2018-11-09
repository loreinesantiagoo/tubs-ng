import { Component, EventEmitter, Input, OnDestroy, Output, Inject, forwardRef, QueryList, ContentChildren } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';

/**
 * A material design file upload component.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mat-file-upload',
    templateUrl: `./matFileUpload.component.html`,
    exportAs: 'matFileUpload',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
      'class': 'mat-file-upload',
    },
    styleUrls: ['./matFileUploadQueue.scss'],
  })
  // tslint:disable-next-line:component-class-suffix
  export class MatFileUpload implements OnDestroy {

    constructor(
      // tslint:disable-next-line:no-shadowed-variable
      private HttpClient: HttpClient
      ,
      @Inject(forwardRef(() => MatFileUploadQueue)) private matFileUploadQueue: MatFileUploadQueue
    ) {

        if (matFileUploadQueue) {
          this.httpUrl = matFileUploadQueue.httpUrl || this.httpUrl;
          this.httpRequestHeaders = matFileUploadQueue.httpRequestHeaders || this.httpRequestHeaders;
          this.httpRequestParams = matFileUploadQueue.httpRequestParams || this.httpRequestParams;
          this.fileAlias = matFileUploadQueue.fileAlias || this.fileAlias;
        }

    }

    isUploading = false;



    /* Http request input bindings */
    @Input()
    httpUrl = 'http://localhost:8080';

    @Input()
    httpRequestHeaders: HttpHeaders | {
      [header: string]: string | string[];
    } = new HttpHeaders();

    @Input()
    httpRequestParams: HttpParams | {
      [param: string]: string | string[];
    } = new HttpParams();

    @Input()
    fileAlias = 'file';

    @Input()
    get file(): any {
      return this._file;
    }
    set file(file: any) {
      this._file = file;
      this.total = this._file.size;
    }

    @Input()
    set id(id: number) {
      this._id = id;
    }
    get id(): number {
      return this._id;
    }

    /** Output  */
    @Output() removeEvent = new EventEmitter<MatFileUpload>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onUpload = new EventEmitter();

    progressPercentage: number;
    public loaded: number;
    total: number;
    _file: any;
    _id: number;
    fileUploadSubscription: any;

    public upload(): void {
      this.isUploading = true;
      // How to set the alias?
      const formData = new FormData();
      formData.set(this.fileAlias, this._file, this._file.name);
      this.fileUploadSubscription = this.HttpClient.post(this.httpUrl, formData, {
        headers: this.httpRequestHeaders,
        observe: 'events',
        params: this.httpRequestParams,
        reportProgress: true,
        responseType: 'json'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercentage = Math.floor( event.loaded * 100 / event.total );
          this.loaded = event.loaded;
          this.total = event.total;
        }
        this.onUpload.emit({ file: this._file, event: event });
      }, (error: any) => {
        if (this.fileUploadSubscription) {
          this.fileUploadSubscription.unsubscribe();
        }
        this.isUploading = false;
        this.onUpload.emit({ file: this._file, event: event });
      });
    }

    public remove(): void {
      if (this.fileUploadSubscription) {
        this.fileUploadSubscription.unsubscribe();
      }
      this.removeEvent.emit(this);
    }

    ngOnDestroy() {
      console.log('file ' + this._file.name + ' destroyed...');
    }

}

/**
 * A material design file upload queue component.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-file-upload-queue',
  templateUrl: `matFileUploadQueue.component.html`,
  exportAs: 'matFileUploadQueue',
})
// tslint:disable-next-line:component-class-suffix
export class MatFileUploadQueue implements OnDestroy {

  @ContentChildren(forwardRef(() => MatFileUpload)) fileUploads: QueryList<MatFileUpload>;

  /** Subscription to remove changes in files. */
  _fileRemoveSubscription: Subscription | null;

  /** Subscription to changes in the files. */
  _changeSubscription: Subscription;

  /** Combined stream of all of the file upload remove change events. */
  get fileUploadRemoveEvents() {
      return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));
  }

  files: Array<any> = [];

  /* Http request input bindings */
  @Input()
  httpUrl: string;

  @Input()
  httpRequestHeaders: HttpHeaders | {
    [header: string]: string | string[];
  } = new HttpHeaders();

  @Input()
  httpRequestParams: HttpParams | {
    [param: string]: string | string[];
  } = new HttpParams();

  @Input()
  fileAlias = 'file';

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // When the list changes, re-subscribe
    this._changeSubscription = this.fileUploads.changes.pipe(startWith(null)).subscribe(() => {
      if (this._fileRemoveSubscription) {
        this._fileRemoveSubscription.unsubscribe();
      }
      this._listenTofileRemoved();
    });
  }

  private _listenTofileRemoved(): void {
    this._fileRemoveSubscription = this.fileUploadRemoveEvents.subscribe((event: MatFileUpload) => {
      this.files.splice(event.id, 1);
    });
  }

  add(file: any) {
    this.files.push(file);
  }

  public uploadAll() {
    this.fileUploads.forEach((fileUpload) => { fileUpload.upload(); });
  }

  public removeAll() {
    this.files.splice(0, this.files.length);
  }

  ngOnDestroy() {
    if (this.files) {
      this.removeAll();
    }
  }

}

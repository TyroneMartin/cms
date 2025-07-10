import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();

  documents: Document[] = [];
  maxDocumentId!: number;

  private apiUrl = 'http://localhost:3000/api/documents';

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments(): void {
    this.http
      .get<Document[]>(this.apiUrl)
      .pipe(
        tap((documents) => console.log('Documents received:', documents)),
        catchError((error) => {
          console.error('Error fetching documents:', error);
          return of([]);
        })
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
          console.log('Documents processed:', this.documents.length);
        }
      );
  }

  getMaxId(): number {
    if (!this.documents || this.documents.length === 0) return 0;

    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getDocument(id: string): Document | null {
    return this.documents.find((document) => document.id === id) || null;
  }

  addDocument(document: Document): void {
    if (!document) return;

    document.id = ''; // Will be assigned by backend
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(
        this.apiUrl,
        document,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error adding document:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response && response.document) {
          this.documents.push(response.document);
          this.sortAndSend();
        }
      });
  }

  updateDocument(original: Document, newDocument: Document): void {
    if (!original || !newDocument) return;

    const pos = this.documents.findIndex((d) => d.id === original.id);
    if (pos < 0) return;

    newDocument.id = original.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put<{ message: string; document: Document }>(
        `${this.apiUrl}/${original.id}`, 
        newDocument,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating document:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response && response.document) {
          this.documents[pos] = response.document;
          this.sortAndSend();
        }
      });
  }

  deleteDocument(document: Document): void {
    if (!document) return;

    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) return;

    this.http
      .delete(`${this.apiUrl}/${document.id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting document:', error);
          return of(null);
        })
      )
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }

  private sortAndSend(): void {
    this.documents.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.documentListChangedEvent.next(this.documents.slice());
    console.log('Documents sent to subscribers:', this.documents.length);
  }
}
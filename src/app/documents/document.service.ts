import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  
  documents: Document[] = [];
  maxDocumentId!: number;

  documentSelectedEvent = new Subject<Document>();

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    
    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    
    return maxId;
  }

  getDocuments(): void {
    this.http.get<Document[]>('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        }
      );
  }

  addDocument(document: Document) {
    if (!document) return;

    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents',
      document,
      { headers }
    ).subscribe(response => {
      this.documents.push(response.document);
      this.sortAndSend();
    });
  }

  updateDocument(original: Document, newDocument: Document) {
    if (!original || !newDocument) return;

    const pos = this.documents.findIndex(d => d.id === original.id);
    if (pos < 0) return;

    newDocument.id = original.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(
      `http://localhost:3000/documents/${original.id}`,
      newDocument,
      { headers }
    ).subscribe(() => {
      this.documents[pos] = newDocument;
      this.sortAndSend();
    });
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) return;

    this.http.delete(`http://localhost:3000/documents/${document.id}`)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }

  private sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : -1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    
    for (let document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    
    return maxId;
  }

  getDocuments(): void {
    this.http.get<Document[]>('https://wdd430-cms-application-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents ? documents : [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        }
      );
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  storeDocuments(): void {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd430-cms-application-default-rtdb.firebaseio.com/documents.json',
      documentsString,
      { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error storing documents:', error);
        }
      );
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }
    
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
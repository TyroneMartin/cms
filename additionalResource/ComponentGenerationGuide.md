# Angular Component Guide

This guide demonstrates how to create new Angular components with appropriate prefixes.

> Demo : [Week 07 Working Angular Application Demo](https://youtu.be/fcQ6f2DVlAA)


## Creating Components with the CMS Prefix

In this project, I created a CMS system. It’s helpful to prefix all generated objects with `"cms"` to easily identify them as part of the content management system.

### Basic Component Generation

To generate a component with the `"cms"` prefix:

```bash
ng new cms --prefix=cms
```

For example, to create a `"cms-contact"` component:

```bash
ng generate component contacts
```

This will generate:

* `contacts.component.ts`
* `contacts.component.html`
* `contacts.component.css`
* `contacts.component.spec.ts`

> See the official documentation: [Creating a component using the Angular CLI](https://v17.angular.io/guide/component-overview#creating-a-component-using-the-angular-cli)

---

### Create the Header Component in the Current Folder

```bash
ng generate component header --flat
```

### Creating Components in Specific Folders

To create a component inside a specific folder:

```bash
ng generate component folder-path/cms-component-name
```

Example:

```bash
ng generate component app/cms-components/cms-header
```

---

## Project Examples

### Creating the Header Component in a Specific Folder

```bash
ng generate component app/contacts
```

This creates:

* `app/contacts/contacts.component.ts`
* `app/contacts/contacts.component.html`
* `app/contacts/contacts.component.css`
* `app/contacts/contacts.component.spec.ts`

---

## Using a Component (e.g., `cms-header`) in the App Component

To use a generated component like `cms-header` inside your main `AppComponent`, follow these steps:

### 1. Generate the Component

```bash
ng generate component header --prefix=cms
```

### 2. Verify the Selector

Open `header.component.ts` and confirm the selector is set correctly:

```ts
selector: 'cms-header'
```

### 3. Declare It in a Module (if not already)

Make sure it's declared in `app.component.ts`:

```ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component'; // import to file

@Component({
  selector: 'cms-root',
  imports: [HeaderComponent], // import component to root
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
}
```

### 4. Use It in `app.component.html`

Open `app.component.html` and insert the component tag:

```html
<cms-header></cms-header>
```

This will render the content of `CmsHeaderComponent` inside your app's root component.

---

## CLI Commands Reference

| Command                                             | Purpose                            |
| --------------------------------------------------- | ---------------------------------- |
| `ng generate component cms-component-name`          | Generate a new CMS component       |
| `ng generate service cms-services/cms-service-name` | Generate a new CMS service         |
| `ng generate module cms --routing`                  | Generate a CMS module with routing |
| `ng generate interface cms-models/cms-model-name`   | Generate a CMS interface           |
| `ng lint`                                           | Run code linting                   |
| `ng test`                                           | Run unit tests                     |
| `ng build --prod`                                   | Create a production build          |
|                                                     |                                    |



Here's a brief and clear `README.md` file you can use for your Angular services and cross-component communication setup:

---

# Angular CMS Services Setup

## Overview

This project uses **Angular services** to share functionality and data across multiple components in the CMS (Content Management System) application. Services provide a centralized way to manage data and logic for different features such as **Documents**, **Messages**, and **Contacts**.

## What is an Angular Service?

An Angular service is a reusable class that contains methods and properties used by multiple components. Unlike components, services do not have HTML or CSS — they focus solely on **business logic and data management**, often acting as the **Model Layer** in an Angular app.

Common responsibilities of services:

* Fetching and storing data
* Sharing data across components
* Handling C.R.U.D. (Create, Read, Update, Delete) operations

---

## Current Features

For this assignment, each feature — **Documents**, **Messages**, and **Contacts** — has its own dedicated service with the following basic methods:

* `getAll()`: Returns a list of all objects
* `getById(id: string)`: Returns a single object based on its ID

Later, we will add:

* `add(object)`: Create a new object
* `update(id, updatedObject)`: Modify an existing object
* `delete(id)`: Remove an object

---

## Cross-Component Communication

To allow components to share and update data in real time, each service uses RxJS `Subject` to emit changes. For example:

* `MessageEditComponent` adds a message via the `MessageService`.
* `MessageService` stores the message and emits the updated list.
* `MessageListComponent` subscribes to the service and updates automatically.


## How to Set Up a Service

1. **Generate the service** using Angular CLI:

   ```bash
   ng generate service messages
   ```

   or 

      ```bash
   ng g s messages
   ```

2. **Inject the service** into your component:

   ```ts
   constructor(private messageService: MessageService) {}
   ```

3. **Use service methods** in the component:

   ```ts
   this.messageService.getAll();
   ```

4. **Subscribe to updates** if needed:

   ```ts
   this.messageService.messagesChanged.subscribe(messages => {
     this.messages = messages;
   });
   ```

---

## Best Practices

* Use services to manage and encapsulate all business logic and data operations.
* Use `Subject` or `BehaviorSubject` to emit data changes and enable cross-component communication.
* Keep services stateless where possible, or use them as single sources of truth for shared state.



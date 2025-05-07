# Angular Component Guide

This guide demonstrates how to create new Angular components with appropriate prefixes.

> Demo : [Video OverOverview](https://youtu.be/q-Hio-LrTeA)


## Creating Components with the CMS Prefix

In this project, I created a CMS system. It’s helpful to prefix all generated objects with `"cms"` to easily identify them as part of the content management system.

### Basic Component Generation

To generate a component with the `"cms"` prefix:

```bash
ng new cms --prefix=cms
```

For example, to create a `"cms-contacts"` component:

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



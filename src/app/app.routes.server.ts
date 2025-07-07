import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes - can be prerendered
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'documents',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'messages',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contacts',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'documents/new',
    renderMode: RenderMode.Server // Edit forms should be server-rendered
  },
  {
    path: 'contacts/new',
    renderMode: RenderMode.Server 
  },
  
  // Dynamic routes with parameters 
  {
    path: 'documents/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'documents/:id/edit',
    renderMode: RenderMode.Server
  },
  {
    path: 'contacts/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'contacts/:id/edit',
    renderMode: RenderMode.Server
  },
  
  // Fallback for any other routes
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
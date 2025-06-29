/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedQuestionsCreateImport } from './routes/_authenticated/questions/create'
import { Route as AuthenticatedQuestionsPreviewQuestionIdImport } from './routes/_authenticated/questions/preview.$questionId'
import { Route as AuthenticatedQuestionsEditQuestionIdImport } from './routes/_authenticated/questions/edit.$questionId'
import { Route as AuthenticatedQuestionsAddSolutionsQuestionIdImport } from './routes/_authenticated/questions/add-solutions.$questionId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedQuestionsCreateRoute =
  AuthenticatedQuestionsCreateImport.update({
    id: '/questions/create',
    path: '/questions/create',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedQuestionsPreviewQuestionIdRoute =
  AuthenticatedQuestionsPreviewQuestionIdImport.update({
    id: '/questions/preview/$questionId',
    path: '/questions/preview/$questionId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedQuestionsEditQuestionIdRoute =
  AuthenticatedQuestionsEditQuestionIdImport.update({
    id: '/questions/edit/$questionId',
    path: '/questions/edit/$questionId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedQuestionsAddSolutionsQuestionIdRoute =
  AuthenticatedQuestionsAddSolutionsQuestionIdImport.update({
    id: '/questions/add-solutions/$questionId',
    path: '/questions/add-solutions/$questionId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/questions/create': {
      id: '/_authenticated/questions/create'
      path: '/questions/create'
      fullPath: '/questions/create'
      preLoaderRoute: typeof AuthenticatedQuestionsCreateImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/questions/add-solutions/$questionId': {
      id: '/_authenticated/questions/add-solutions/$questionId'
      path: '/questions/add-solutions/$questionId'
      fullPath: '/questions/add-solutions/$questionId'
      preLoaderRoute: typeof AuthenticatedQuestionsAddSolutionsQuestionIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/questions/edit/$questionId': {
      id: '/_authenticated/questions/edit/$questionId'
      path: '/questions/edit/$questionId'
      fullPath: '/questions/edit/$questionId'
      preLoaderRoute: typeof AuthenticatedQuestionsEditQuestionIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/questions/preview/$questionId': {
      id: '/_authenticated/questions/preview/$questionId'
      path: '/questions/preview/$questionId'
      fullPath: '/questions/preview/$questionId'
      preLoaderRoute: typeof AuthenticatedQuestionsPreviewQuestionIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedQuestionsCreateRoute: typeof AuthenticatedQuestionsCreateRoute
  AuthenticatedQuestionsAddSolutionsQuestionIdRoute: typeof AuthenticatedQuestionsAddSolutionsQuestionIdRoute
  AuthenticatedQuestionsEditQuestionIdRoute: typeof AuthenticatedQuestionsEditQuestionIdRoute
  AuthenticatedQuestionsPreviewQuestionIdRoute: typeof AuthenticatedQuestionsPreviewQuestionIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedQuestionsCreateRoute: AuthenticatedQuestionsCreateRoute,
  AuthenticatedQuestionsAddSolutionsQuestionIdRoute:
    AuthenticatedQuestionsAddSolutionsQuestionIdRoute,
  AuthenticatedQuestionsEditQuestionIdRoute:
    AuthenticatedQuestionsEditQuestionIdRoute,
  AuthenticatedQuestionsPreviewQuestionIdRoute:
    AuthenticatedQuestionsPreviewQuestionIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/': typeof AuthenticatedIndexRoute
  '/questions/create': typeof AuthenticatedQuestionsCreateRoute
  '/questions/add-solutions/$questionId': typeof AuthenticatedQuestionsAddSolutionsQuestionIdRoute
  '/questions/edit/$questionId': typeof AuthenticatedQuestionsEditQuestionIdRoute
  '/questions/preview/$questionId': typeof AuthenticatedQuestionsPreviewQuestionIdRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/': typeof AuthenticatedIndexRoute
  '/questions/create': typeof AuthenticatedQuestionsCreateRoute
  '/questions/add-solutions/$questionId': typeof AuthenticatedQuestionsAddSolutionsQuestionIdRoute
  '/questions/edit/$questionId': typeof AuthenticatedQuestionsEditQuestionIdRoute
  '/questions/preview/$questionId': typeof AuthenticatedQuestionsPreviewQuestionIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/questions/create': typeof AuthenticatedQuestionsCreateRoute
  '/_authenticated/questions/add-solutions/$questionId': typeof AuthenticatedQuestionsAddSolutionsQuestionIdRoute
  '/_authenticated/questions/edit/$questionId': typeof AuthenticatedQuestionsEditQuestionIdRoute
  '/_authenticated/questions/preview/$questionId': typeof AuthenticatedQuestionsPreviewQuestionIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/register'
    | '/'
    | '/questions/create'
    | '/questions/add-solutions/$questionId'
    | '/questions/edit/$questionId'
    | '/questions/preview/$questionId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/register'
    | '/'
    | '/questions/create'
    | '/questions/add-solutions/$questionId'
    | '/questions/edit/$questionId'
    | '/questions/preview/$questionId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/login'
    | '/register'
    | '/_authenticated/'
    | '/_authenticated/questions/create'
    | '/_authenticated/questions/add-solutions/$questionId'
    | '/_authenticated/questions/edit/$questionId'
    | '/_authenticated/questions/preview/$questionId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login",
        "/register"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/",
        "/_authenticated/questions/create",
        "/_authenticated/questions/add-solutions/$questionId",
        "/_authenticated/questions/edit/$questionId",
        "/_authenticated/questions/preview/$questionId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/questions/create": {
      "filePath": "_authenticated/questions/create.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/questions/add-solutions/$questionId": {
      "filePath": "_authenticated/questions/add-solutions.$questionId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/questions/edit/$questionId": {
      "filePath": "_authenticated/questions/edit.$questionId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/questions/preview/$questionId": {
      "filePath": "_authenticated/questions/preview.$questionId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */

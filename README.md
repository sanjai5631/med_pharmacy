# Enterprise React + MUI Template

This is a production-ready, scalable frontend architecture built with React, TypeScript, and Material UI.

## Features
- **Scalable Architecture**: Highly modular folder structure.
- **Common Component Library**: All MUI components are wrapped for consistency and easier maintenance.
- **Global Feedback System**: Centralized toast (Snackbar), full-screen loader, and confirmation dialogs.
- **Form System**: Integrated with `react-hook-form` and `yup` for robust validation.
- **API Layer**: Axios instance with pre-configured interceptors and a custom `useApi` hook.
- **Modern Theme**: Custom premium MUI theme with Inter font and soft aesthetics.

## Folder Structure
- `src/components/common`: Reusable form, UI, and feedback components.
- `src/hooks`: Custom hooks like `useApi`, `useFormHandler`, `useDebounce`.
- `src/services`: API configuration and external services.
- `src/context`: Global state providers (Loader, Snackbar).
- `src/theme`: MUI theme configuration.
- `src/pages`: Feature modules (e.g., Sample User CRUD).

## How to use
1. Run `npm install`
2. Run `npm run dev`
3. Access the sample CRUD page at `/users`

## Components
- `FormInput`, `FormSelect`, `FormCheckbox`, `FormDatePicker`: Form fields with integrated validation.
- `DataTable`: Advanced table with search, sort, and pagination.
- `ConfirmDialog`: Generic confirmation modal.
- `useApi`: Hook for making API calls with automatic loader and toast handling.

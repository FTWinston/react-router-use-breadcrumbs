import { IBreadcrumb } from './IBreadcrumb';

export interface IdentifiableCrumb {
    id: string;
    crumb: IBreadcrumb;
}

export type BreadcrumbAction =
    | {
          type: 'ADD';
          id: string;
          crumb: IBreadcrumb;
      }
    | {
          type: 'UPDATE';
          id: string;
          crumb: IBreadcrumb;
      }
    | {
          type: 'REMOVE';
          id: string;
      };

export function breadcrumbReducer(
    state: IdentifiableCrumb[],
    action: BreadcrumbAction
): IdentifiableCrumb[] {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                { id: action.id, crumb: { ...action.crumb } },
            ].sort(
                (a, b) =>
                    a.crumb.to.pathname.length - b.crumb.to.pathname.length
            );

        case 'UPDATE':
            return state.map((crumb) => {
                return crumb.id === action.id
                    ? { id: action.id, crumb: { ...action.crumb } }
                    : crumb;
            });

        case 'REMOVE':
            return state.filter((crumb) => {
                return crumb.id !== action.id;
            });

        default:
            return state;
    }
}

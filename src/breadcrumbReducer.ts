import { IBreadcrumb } from './IBreadcrumb';

export interface IdentifiableCrumb {
    id: string;
    crumb: IBreadcrumb;
}

export interface BreadcrumbState {
    crumbsById: Record<string, IBreadcrumb>;
    crumbTrail: IBreadcrumb[];
}

export type BreadcrumbAction =
    | {
          type: 'SET';
          id: string;
          crumb: IBreadcrumb;
      }
    | {
          type: 'DEL';
          id: string;
      };

function buildState(crumbsById: Record<string, IBreadcrumb>) {
    return {
        crumbsById,
        crumbTrail: Object.values(crumbsById)
            .sort((a, b) => a.to.pathname.length - b.to.pathname.length)
    };
}

export function breadcrumbReducer(
    state: BreadcrumbState,
    action: BreadcrumbAction
): BreadcrumbState {
    switch (action.type) {
        case 'DEL': {
            const {
                [action.id]: _discard,
                ...crumbsById
            } = state.crumbsById;

            return buildState(crumbsById);
        }

        case 'SET': {
            return buildState({
                ...state.crumbsById,
                [action.id]: action.crumb
            });
        }

        default:
            return state;
    }
}

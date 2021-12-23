import { IBreadcrumb } from './IBreadcrumb';

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
            // The path of each breadcrumb will include the path of the crumbs in the parent components, so sorting by path length will guarantee that the breadcrumbs are in the correct order,
            // reflecting the nested heirachy. This approach contrasts with just using the order of invocation, for example, which could give incorrect results if there is a re-render part-way
            // up the hierarchy, where it decides not to re-render a child component.
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

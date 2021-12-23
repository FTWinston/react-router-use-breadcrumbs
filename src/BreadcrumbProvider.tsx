import React, { useReducer } from 'react';
import {
    BreadcrumbAction,
    breadcrumbReducer,
    BreadcrumbState,
} from './breadcrumbReducer';

/**
 * Provides access to the current breadcrumb state, for use with the {@link useBreadcrumbs} hook.
 */
export const BreadcrumbStateContext = React.createContext<BreadcrumbState>({
    crumbsById: {},
    crumbTrail: []
});

/**
 * Allows the current breadcrumb state to be updated, for use with the {@link useBreadcrumb} hook.
 */
export const BreadcrumbDispatchContext = React.createContext<
    React.Dispatch<BreadcrumbAction>
>(() => {});

/**
 * Makes the current breadcrumb trail available for use with the {@link useBreadcrumb} and {@link useBreadcrumbs} hooks.
 */
export const BreadcrumbProvider: React.FC = (props) => {
    const [crumbs, dispatch] = useReducer(breadcrumbReducer, {
        crumbsById: {},
        crumbTrail: []
    });

    return (
        <BreadcrumbStateContext.Provider value={crumbs}>
            <BreadcrumbDispatchContext.Provider value={dispatch}>
                {props.children}
            </BreadcrumbDispatchContext.Provider>
        </BreadcrumbStateContext.Provider>
    );
};

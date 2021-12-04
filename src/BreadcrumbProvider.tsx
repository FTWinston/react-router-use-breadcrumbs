import React, { useReducer } from 'react';
import {
    BreadcrumbAction,
    breadcrumbReducer,
    BreadcrumbState,
} from './breadcrumbReducer';

export const BreadcrumbStateContext = React.createContext<BreadcrumbState>({
    crumbsById: {},
    crumbTrail: []
});

export const BreadcrumbDispatchContext = React.createContext<
    React.Dispatch<BreadcrumbAction>
>(() => {});

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

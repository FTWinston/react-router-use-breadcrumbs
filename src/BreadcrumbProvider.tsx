import React, { useReducer } from 'react';
import {
    BreadcrumbAction,
    breadcrumbReducer,
    IdentifiableCrumb,
} from './breadcrumbReducer';

export const BreadcrumbStateContext = React.createContext<IdentifiableCrumb[]>(
    []
);

export const BreadcrumbDispatchContext = React.createContext<
    React.Dispatch<BreadcrumbAction>
>(() => {});

export const BreadcrumbProvider: React.FC = (props) => {
    const [crumbs, dispatch] = useReducer(breadcrumbReducer, []);

    return (
        <BreadcrumbStateContext.Provider value={crumbs}>
            <BreadcrumbDispatchContext.Provider value={dispatch}>
                {props.children}
            </BreadcrumbDispatchContext.Provider>
        </BreadcrumbStateContext.Provider>
    );
};

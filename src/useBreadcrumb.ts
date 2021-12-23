import { useContext, useEffect, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { nanoid } from 'nanoid/non-secure';
import { BreadcrumbDispatchContext } from './BreadcrumbProvider';
import { IBreadcrumb } from './IBreadcrumb';

/** Registers a breadcrumb, using the provided title, and optional additional data. */
export function useBreadcrumb(
    title: React.ReactElement | string,
    data?: unknown
) {
    // Allocate a unique ID for this breadcrumb.
    const [id] = useState(() => nanoid());

    // Returns the path of the current component's route. This is not necessarily the same as the browser's current location, as this may be called by a component that is in a parent route.
    const { pathname, search, hash } = useResolvedPath('');

    const dispatch = useContext(BreadcrumbDispatchContext);

    // On load, "set" the breadcrumb, and re-set it when any of its contents change.
    useEffect(() => {
        const crumb: IBreadcrumb = { title, data, to: { pathname, search, hash } };
        dispatch({ type: 'SET', id, crumb });
    }, [pathname, search, hash, title, data]);

    // On unload, delete the breadcrumb.
    useEffect(() => {
        return () => dispatch({ type: 'DEL', id });
    }, []);
}

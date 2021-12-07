import { useContext, useEffect, useMemo, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { nanoid } from 'nanoid/non-secure';
import { BreadcrumbDispatchContext } from './BreadcrumbProvider';
import { IBreadcrumb } from './IBreadcrumb';

export function useBreadcrumb(
    title: React.ReactElement | string,
    data?: unknown
) {
    const [id] = useState(() => nanoid());

    const { pathname, search, hash } = useResolvedPath('');

    const dispatch = useContext(BreadcrumbDispatchContext);

    const crumb: IBreadcrumb = useMemo(
        () => ({ title, data, to: { pathname, search, hash } }),
        [pathname, search, hash, title, data]
    );

    useEffect(() => {
        dispatch({ type: 'SET', id, crumb });
    }, [crumb]);

    useEffect(() => {
        return () => dispatch({ type: 'DEL', id });
    }, []);
}

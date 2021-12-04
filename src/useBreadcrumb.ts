import { useContext, useEffect, useMemo, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { v4 as UUID } from 'uuid';
import { BreadcrumbDispatchContext } from './BreadcrumbProvider';
import { IBreadcrumb } from './IBreadcrumb';

export function useBreadcrumb(
    title: React.ReactElement | string,
    tag?: unknown
) {
    const [id] = useState(() => UUID());

    const { pathname, search, hash } = useResolvedPath('');

    const dispatch = useContext(BreadcrumbDispatchContext);

    const crumb: IBreadcrumb = useMemo(
        () => ({ title, tag, to: { pathname, search, hash } }),
        [pathname, search, hash, title, tag]
    );

    useEffect(() => {
        dispatch({ type: 'SET', id, crumb });
    }, [crumb]);

    useEffect(() => {
        return () => dispatch({ type: 'DEL', id });
    }, []);
}

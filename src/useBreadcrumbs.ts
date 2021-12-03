import { useContext, useMemo } from 'react';
import { BreadcrumbStateContext } from './BreadcrumbProvider';
import { IBreadcrumb } from './IBreadcrumb';

export function useBreadcrumbs(): IBreadcrumb[] {
    let items = useContext(BreadcrumbStateContext);

    return useMemo(() => {
        return items.map((item) => item.crumb);
    }, [items]);
}

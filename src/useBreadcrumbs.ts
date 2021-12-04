import { useContext } from 'react';
import { BreadcrumbStateContext } from './BreadcrumbProvider';
import { IBreadcrumb } from './IBreadcrumb';

export function useBreadcrumbs(): IBreadcrumb[] {
    return useContext(BreadcrumbStateContext).crumbTrail;
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '..';
import { ExampleRoutes } from './ExampleRoutes';

export const SimpleCrumbs = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <div>
            <ul>
                {breadcrumbs.map((crumb) => (
                    <li key={crumb.to.pathname}>
                        <NavLink to={crumb.to}>{crumb.title}</NavLink>
                    </li>
                ))}
            </ul>

            <ExampleRoutes />
        </div>
    );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '..';
import { ExampleRoutes } from './ExampleRoutes';

export const SeparateTitle = () => {
    const breadcrumbs = useBreadcrumbs();

    const [currentCrumb] = breadcrumbs.splice(-1, 1);

    return (
        <div>
            <ul>
                {breadcrumbs.map((crumb) => (
                    <li key={crumb.to.pathname}>
                        <NavLink to={crumb.to}>{crumb.title}</NavLink>
                    </li>
                ))}
            </ul>

            <h1>{currentCrumb?.title}</h1>

            <ExampleRoutes />
        </div>
    );
};

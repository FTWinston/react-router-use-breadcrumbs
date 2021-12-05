import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '..';
import { ExampleRoutes } from './ExampleRoutes';

export const UpLink = () => {
    const breadcrumbs = useBreadcrumbs();

    const link = breadcrumbs.length > 1
        ? <NavLink to={breadcrumbs[breadcrumbs.length - 2].to}>Go Up</NavLink>
        : <NavLink to="/">You are at the top level</NavLink>

    return (
        <div>
            <ul><li>{link}</li></ul>

            <ExampleRoutes />
        </div>
    );
};

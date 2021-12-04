import { Path } from 'react-router-dom';

type To = Pick<Path, 'pathname'> & Partial<Omit<Path, 'pathname'>>;

export interface IBreadcrumb {
    to: To;
    title: React.ReactElement | string;
    data?: unknown;
}

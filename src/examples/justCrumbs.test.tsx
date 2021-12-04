import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BreadcrumbProvider } from '..';
import { SimpleCrumbs } from './SimpleCrumbs';

describe('Simple crumbs', () => {
    beforeEach(() =>
        render(
            <BrowserRouter>
                <BreadcrumbProvider>
                    <SimpleCrumbs />
                </BreadcrumbProvider>
            </BrowserRouter>
        )
    );

    test('initial load', () => {
        const homeWelcome = screen.getByText('This is the home page.');
        expect(homeWelcome).not.toBeNull();

        const lists = screen.getAllByRole('list');
        expect(lists.length).toBeGreaterThanOrEqual(1);

        const navRoot = lists[0];
        const navLinks = within(navRoot).getAllByRole('link');

        expect(navLinks.length).toBe(1);
        const [home] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');
    });

    test('navigating to "About"', () => {
        fireEvent.click(screen.getByText('About'));

        const lists = screen.getAllByRole('list');
        expect(lists.length).toBeGreaterThanOrEqual(1);

        const navRoot = lists[0];
        const navLinks = within(navRoot).getAllByRole('link');

        expect(navLinks.length).toBe(2);
        const [home, about] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');

        expect(about).toHaveTextContent('About');
        expect(about).toHaveAttribute('href', '/about');

        const homeWelcome = screen.queryByText('This is the home page.');
        expect(homeWelcome).toBeNull();

        const aboutWelcome = screen.getByText('This is the about page.');
        expect(aboutWelcome).not.toBeNull();
    });

    test('navigating to "About" and back to "Home"', () => {
        fireEvent.click(screen.getByText('About'));

        fireEvent.click(screen.getAllByText('Home')[0]);

        const lists = screen.getAllByRole('list');
        expect(lists.length).toBeGreaterThanOrEqual(1);

        const navRoot = lists[0];
        const navLinks = within(navRoot).getAllByRole('link');

        expect(navLinks.length).toBe(1);
        const [home] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');

        const homeWelcome = screen.getByText('This is the home page.');
        expect(homeWelcome).not.toBeNull();

        const aboutWelcome = screen.queryByText('This is the about page.');
        expect(aboutWelcome).toBeNull();
    });
});

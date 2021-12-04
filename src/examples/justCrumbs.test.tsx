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

        const navLinks = getNavLinks();
        expect(navLinks.length).toBe(1);
        const [home] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');
    });

    test('navigating to "About"', () => {
        fireEvent.click(screen.getByText('About'));

        const navLinks = getNavLinks();

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

        const navLinks = getNavLinks();
        expect(navLinks.length).toBe(1);
        const [home] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');

        const homeWelcome = screen.getByText('This is the home page.');
        expect(homeWelcome).not.toBeNull();

        const aboutWelcome = screen.queryByText('This is the about page.');
        expect(aboutWelcome).toBeNull();
    });

    test('complex navigation', () => {
        fireEvent.click(screen.getByText('Section 1'));
        fireEvent.click(screen.getByText('Item 2'));
        fireEvent.click(screen.getByText('Section 1'));
        fireEvent.click(screen.getByText('Home'));
        fireEvent.click(screen.getByText('Section 2'));
        fireEvent.click(screen.getByText('Item 4'));
        fireEvent.click(screen.getByText('Section 2'));
        fireEvent.click(screen.getByText('Item 3'));
        fireEvent.click(screen.getByText('Section 2'));
        fireEvent.click(screen.getByText('Item 4'));

        const navLinks = getNavLinks();
        expect(navLinks.length).toBe(3);
        const [home, section2, item4] = navLinks;

        expect(home).toHaveTextContent('Home');
        expect(home).toHaveAttribute('href', '/');

        expect(section2).toHaveTextContent('Section 2');
        expect(section2).toHaveAttribute('href', '/section2');

        expect(item4).toHaveTextContent('Item 4');
        expect(item4).toHaveAttribute('href', '/section2/item4');

        const homeWelcome = screen.queryByText('This is the home page.');
        expect(homeWelcome).toBeNull();

        const section1welcome = screen.queryByText('This is Section 1.');
        expect(section1welcome).toBeNull();

        const section2welcome = screen.queryByText('This is Section 2.');
        expect(section2welcome).toBeNull();

        const item1welcome = screen.queryByText('This is the Item 1 page.');
        expect(item1welcome).toBeNull();

        const item2welcome = screen.queryByText('This is the Item 2 page.');
        expect(item2welcome).toBeNull();

        const item3welcome = screen.queryByText('This is the Item 3 page.');
        expect(item3welcome).toBeNull();

        const item4Welcome = screen.getByText('This is the Item 4 page.');
        expect(item4Welcome).not.toBeNull();
    });
});

function getNavLinks() {
    const lists = screen.getAllByRole('list');

    expect(lists.length).toBeGreaterThanOrEqual(1);

    return within(lists[0]).getAllByRole('link');
}


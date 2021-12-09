# react-router-use-breadcrumbs

[React][1] hooks that generate a breadcrumb trail, for use with [React Router][2].

![Version badge](https://badgen.net/npm/v/react-router-use-breadcrumbs) ![Minified badge](https://badgen.net/bundlephobia/min/react-router-use-breadcrumbs) ![Minzipped badge](https://badgen.net/bundlephobia/minzip/react-router-use-breadcrumbs) ![Dependencies badge](https://badgen.net/bundlephobia/dependency-count/react-router-use-breadcrumbs) ![Types badge](https://badgen.net/npm/types/react-router-use-breadcrumbs)

It is simple, flexible, and convenient.

## Installation

```sh
npm install react-router-use-breadcrumbs
```

This package has peer dependencies of `react-router-dom` v6 and `react` v16.8+.
Its only direct dependency is `nanoid`.

It is not compatible with react-router v5, or older versions.

## Usage

This package's `<BreadcrumbProvider>` component should be placed at the root of your application.

Any component that you wish to render a breadcrumb for should call the `useBreadcrumb` hook, passing in text or a component to display. The breadcrumb's url will be calculated automatically.

To access a breadcrumb trail, call the `useBreadcrumbs` hook, which returns an array of breadcrumb objects, with `to` and `title` fields. Typical usage is to render a `<NavLink>` component for each of these.

Note that in the case of `index` `<Route />` components, `useBreadcrumb` should be called by the parent component (i.e. the one containing the `<Routes>`), rather than the component rendered by the `index` route. (Otherwise, its breadcrumb will only be active when you browse to the `index` route.)

### Example: simple crumbs

The [simplest scenario][3] is to render a `<NavLink>` for breadcrumb element returned by the `useBreadcrumbs` hook. You should include the `end` prop on these, so that they all aren't styled as "active" links.

```jsx
const breadcrumbs = useBreadcrumbs();

return (
    <ul>
        {breadcrumbs.map((crumb) => (
            <li key={crumb.to.pathname}>
                <NavLink to={crumb.to} end>{crumb.title}</NavLink>
            </li>
        ))}
    </ul>
);
```

### Example: separate title

The "last" crumb's title can be thought of as the title of the current page. You might wish to [render it separately from the "main" breadcrumb trail][4].

This can be done using a single call to the `useBreadcrumbs` hook, or by multiple calls from separate components.

```jsx
const breadcrumbs = useBreadcrumbs();

const [currentCrumb] = breadcrumbs.splice(-1, 1);

return (
    <>
        <ul>
            {breadcrumbs.map((crumb) => (
                <li key={crumb.to.pathname}>
                    <NavLink to={crumb.to} end>{crumb.title}</NavLink>
                </li>
            ))}
        </ul>

        <h1>{currentCrumb?.title}</h1>
    </>
);
```

To take this a step further, you might wish to display different text when rendering a crumb as the page title, compared to when rendering it in the breadcrumb trail. To support this, you could pass a "page title" to `useBreadcrumb` as the second `data` parameter, then use this when rendering:

```jsx
useBreadcrumb('Crumb Title', 'Page Title');

// ...

<h1>{currentCrumb?.data ?? currentCrumb?.title}</h1>
```


### Example: go up one level

If the "last" crumb refers to the current page, then the "second last" crumb refers to its parent. [Rendering just that breadcrumb][5] will provide a link to "go up one level."

```jsx
const breadcrumbs = useBreadcrumbs();

return breadcrumbs.length > 1
    ? <NavLink to={breadcrumbs[breadcrumbs.length - 2].to} end>Go Up</NavLink>
    : <span>You are at the top level</span>
```

## API

### BreadcrumbProvider

This component provides a context that the breadcrumb hooks need in order to function.
All calls to `useBreadcrumb` and `useBreadcrumbs` should be made from descendants of this provider.

### useBreadcrumb

Any component that should render a breadcrumb should call this hook.

Doing so adds a crumb into the breadcrumb trail, which will be removed again if
the component calling this hook stops rendering.

- `title` (string|component): Text or component to display for this breadcrumb.
- `data` (any): Optional extra data that you wish to associate with this breadcrumb.

Simple scenarios would pass a string as a breadcrumb's title, but the following are all valid:

```jsx
useBreadcrumb('Home');
useBreadcrumb(<span title="Hovered!">Home</span>);
useBreadcrumb(<CustomComponent title="Home" icon="house" />);
```

The `data` field is intended to support additional logic or considerations when breadcrumbs are being rendered. It won't be used in most scenarios.

### useBreadcrumbs

This hook returns an array of the currently active breadcrumbs. The array's elements have 3 fields:
- `to` (object): A [history][6] path object, with `pathname` and optional `search` and `hash` string fields.
- `title` (string|component): Text or component to display for this breadcrumb.
- `data` (any): Optional extra data that you wish to associate with this breadcrumb.

The `title` and `data` values are what was passed into the breadcrumb's corresponding `useBreadcrumb` call. The `to` value is calculated automatically, and can be passed directly to the `to` prop of a `<NavLink>` component.

[1]: https://facebook.github.io/react
[2]: https://github.com/rackt/react-router
[3]: https://github.com/FTWinston/react-router-use-breadcrumbs/tree/master/src/examples/SimpleCrumbs.tsx
[4]: https://github.com/FTWinston/react-router-use-breadcrumbs/tree/master/src/examples/SeparateTitle.tsx
[5]: https://github.com/FTWinston/react-router-use-breadcrumbs/tree/master/src/examples/UpLink.tsx
[6]: https://github.com/ReactTraining/history
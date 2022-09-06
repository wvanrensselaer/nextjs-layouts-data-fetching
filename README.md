## Next.js Layouts Data Fetching

Repo/app experimenting with data fetching techniques with the new Next.js [Layouts](https://nextjs.org/blog/layouts-rfc) feature with React Server Components and Streaming.

Ecommerce style app with three pages. The styling is minimal to keep the demo focused on data fetching.

### [Home Page](http://localhost:3000)

Utilizing server-driven UI patterns. See the [in memory database](./graphql/database.ts) for the layout specification.

### [Category Page](http://localhost:3000/category/living-room)

Utilizing nested layouts and showing product filtering refreshed via React Server Components.

### [Product Page](http://localhost:3000/product/3)

Showing product options/price refreshed via React Server Components.

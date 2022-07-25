# R/GA Wordnext (A boylerplate for Wordpress Headless and Nextjs)

Backend is built on Wordpress as a headless CMS using Graphql.
Frontend is built on Next.js.
Database is built on MySQL.

## Requirements

- Docker 20+
- Docker Compose 1.22+

## First Run

1. Run `docker-compose build`
2. Run `docker-compose up`
3. There should now be 3 servers running:

- [http://localhost:8000](http://localhost:8000) is the Wordpress
- [http://localhost:3000](http://localhost:3000) is the Next app
- [http://localhost:42333](http://localhost:42333) is the MySQL DB.

## Wordpress Config

1. Go to [http://localhost:8000/wp-admin/install.php](http://localhost:8000/wp-admin/install.php) for run WP Quick Install.
2. Login to [Wordpress admin](http://localhost:8000/wp-admin).

```
[User] admin
[Password] q1w2e3r4t5
```

3. Go to the plugins section and activate them all.
4. Go to `Settings > Permalinks` and change that to `Post name`. Save the changes 

## Updraft Backup

If you messed up the WordPress project by any reason, here we have a backup to restore the default settings. You should use the UpDraft plugin incorporated as a WordPress Plugin and upload those files.

```
https://drive.google.com/drive/folders/1gaoWLw4CZ-DzuBRdpTFLSwb9sjOwPPSl?usp=sharing
```

### GraphiQL

The [WPGraphQL](https://www.wpgraphql.com/) plugin also gives you access to a GraphQL IDE directly from your WordPress Admin, allowing you to inspect and play around with the GraphQL API.

![WPGraphiQL page](https://www.wpgraphql.com/ac2ab60e2bcc332c27c9bf3db881f467/quick-graphiql-ide-wordpress.png)

## Add authentication for Preview Mode (Optional)

**This step is optional.** By default, the blog will work with public posts from your WordPress site. Private content such as unpublished posts and private fields cannot be retrieved. To have access to unpublished posts you'll need to set up authentication.

To add [authentication to WPGraphQL](https://docs.wpgraphql.com/guides/authentication-and-authorization/), first you need to add the [WPGraphQL JWT plugin](https://github.com/wp-graphql/wp-graphql-jwt-authentication) to your WordPress Admin following the same process you used to add the WPGraphQL plugin.

> Adding the WPGraphQL JWT plugin will disable your GraphQL API until you add a JWT secret ([GitHub issue](https://github.com/wp-graphql/wp-graphql-jwt-authentication/issues/91)).

Once that's done, you'll need to access the WordPress filesystem to add the secret required to validate JWT tokens. We recommend using SFTP — the instructions vary depending on your hosting provider. For example:

- [SFTP guide for WP Engine](https://wpengine.com/support/sftp/)
- [SFTP guide for WordPress.com](https://wordpress.com/support/sftp/)

Once you have SFTP access, open `wp-config.php` and add a secret for your JWT:

```php
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'YOUR_STRONG_SECRET' );
```

> You can read more about this in the documentation for [WPGraphQL JWT Authentication](https://docs.wpgraphql.com/extensions/wpgraphql-jwt-authentication/).

Now, you need to get a **refresh token** to make authenticated requests with GraphQL. Make the following GraphQL mutation to your WordPress site from the GraphQL IDE (See notes about WPGraphiQL from earlier). Replace `your_username` with the **username** of a user with the `Administrator` role, and `your_password` with the user's password.

```graphql
mutation Login {
  login(
    input: {
      clientMutationId: "uniqueId"
      password: "your_password"
      username: "your_username"
    }
  ) {
    refreshToken
  }
}
```

Copy the `refreshToken` returned by the mutation, then open `.env.local`, and make the following changes:

- Uncomment `WORDPRESS_AUTH_REFRESH_TOKEN` and set it to be the `refreshToken` you just received.
- Uncomment `WORDPRESS_PREVIEW_SECRET` and set it to be any random string (ideally URL friendly).

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=...

# Only required if you want to enable preview mode
WORDPRESS_AUTH_REFRESH_TOKEN=...
WORDPRESS_PREVIEW_SECRET=...
```

**Important:** Restart your Next.js server to update the environment variables.

## Try preview mode

On your WordPress admin, create a new post like before, but **do not publish** it.

Now, if you go to `http://localhost:3000`, you won’t see the post. However, if you enable **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable Preview Mode, go to this URL:

```
http://localhost:3000/api/preview?secret=<secret>&id=<id>
```

- `<secret>` should be the string you entered for `WORDPRESS_PREVIEW_SECRET`.
- `<id>` should be the post's `databaseId` field, which is the integer that you usually see in the URL (`?post=18` → 18).
- Alternatively, you can use `<slug>` instead of `<id>`. `<slug>` is generated based on the title.

You should now be able to see this post. To exit Preview Mode, you can click on **Click here to exit preview mode** at the top.

## Usefull Docker Commands

- List all containers
  `docker ps`
- List all containers (only IDs)
  `docker ps -aq`
- Stop all running containers
  `docker stop $(docker ps -aq)`
- Remove all containers
  `docker rm $(docker ps -aq)`
- Remove all images
  `docker rmi $(docker images -aq)`
- Remove an image
  `docker images -a` and `docker rmi <image id>`
- Log into Docker container
  `docker exec -it <container id> /bin/bash`
- Build using Dockerfile
  `docker build -t network-wordpress .`
- Run the build from Dockerfile
  `docker run -p 8888:80 --rm network-wordpress`

## Using MySQL Workbench

1. Add new connection.
2. Setup the connection with the following parameters

```
[Hostname] 0.0.0.0
[Port] 42333
[Username] root
[Password] root
```

3. Go to `Test Connection`.

## Using `docker-compose run` to issue one-off commands

If you want to run a one-off command, like installing dependencies, you can use the `docker-compose run <service_name> <cmd>`.

For example, to install a Javascript dependency and save that information to `package.json` we could run:
`docker-compose run --rm frontend npm install --save axios`

If you want to be on a shell for one of the Docker services, you can do something like:
`docker-compose run --rm frontend bash`

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

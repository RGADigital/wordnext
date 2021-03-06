<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

/** The name of the database for WordPress */
/*
define('DB_NAME', 'wordpress');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', 'db:3306');
*/
define('DB_NAME', 'wordpress');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', 'db:3306');

/** JWT needs a secret key */
define('JWT_AUTH_SECRET_KEY', $_ENV['NETWORK_JWT_AUTH_SECRET_KEY']);

/** S3 config */
define('AS3CF_AWS_ACCESS_KEY_ID', $_ENV['NETWORK_AS3CF_AWS_ACCESS_KEY_ID'] );
define('AS3CF_AWS_SECRET_ACCESS_KEY', $_ENV['NETWORK_AS3CF_AWS_SECRET_ACCESS_KEY'] );
define('AS3CF_BUCKET', $_ENV['NETWORK_AS3CF_BUCKET'] );
define('AS3CF_REGION', $_ENV['NETWORK_AS3CF_REGION'] );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'ba1a6531fd88e69b7b350223000a344149ee89d8');
define('SECURE_AUTH_KEY',  'cba5a50a0c2133f4fd6dc71d4155f53954f9ca3c');
define('LOGGED_IN_KEY',    '8a7f7da9b76cafe880a7e5ecb20b80f8b09fe540');
define('NONCE_KEY',        'c94b7b1abaf0853c4b8f8080b69069015920870a');
define('AUTH_SALT',        '5a5b0874a9c37773bb819deecc580c79b5879029');
define('SECURE_AUTH_SALT', 'cca5b7a52010ad71a7ddda2962b534833da50fac');
define('LOGGED_IN_SALT',   '98d41e8703eace912eba9fbfeca83a08b97724e7');
define('NONCE_SALT',       'b55839c4fd6b77470a1c6566bfc12a43b0208fc9');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

// If we're behind a proxy server and using HTTPS, we need to alert Wordpress of that fact
// see also http://codex.wordpress.org/Administration_Over_SSL#Using_a_Reverse_Proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
	$_SERVER['HTTPS'] = 'on';
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

<?php
/**
 * Plugin Name: ISK Theme by Astral Luminar
 * Plugin URI:  https://astralluminar.com
 * Description: International School of Kuantan  custom theme plugin. When installed and activated, this plugin registers all ISK page templates, styles, scripts, and media assets. It overwrites the front-end pages with the ISK theme design.
 * Version:     1.0.0
 * Author:      Astral Luminar Solution
 * Author URI:  https://astralluminar.com
 * License:     GPL-2.0-or-later
 * Text Domain: isktheme
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'ISKTHEME_VERSION', '1.0.0' );
define( 'ISKTHEME_PATH', plugin_dir_path( __FILE__ ) );
define( 'ISKTHEME_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue front-end styles and scripts.
 */
function isktheme_enqueue_assets() {
    wp_enqueue_style( 'isktheme-base', ISKTHEME_URL . 'assets/css/isk-site.css', array(), ISKTHEME_VERSION );
    wp_enqueue_style( 'isktheme-enhanced', ISKTHEME_URL . 'assets/css/isk-enhanced.css', array( 'isktheme-base' ), ISKTHEME_VERSION );

    wp_enqueue_script( 'isktheme-gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );
    wp_enqueue_script( 'isktheme-gsap-scroll', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', array( 'isktheme-gsap' ), '3.12.5', true );
    wp_enqueue_script( 'isktheme-anime', 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js', array(), '3.2.1', true );
    wp_enqueue_script( 'isktheme-leaflet', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', array(), '1.9.4', true );
    wp_enqueue_style( 'isktheme-leaflet-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', array(), '1.9.4' );

    wp_enqueue_script( 'isktheme-core', ISKTHEME_URL . 'assets/js/isk-site.js', array(), ISKTHEME_VERSION, true );
    wp_enqueue_script( 'isktheme-enhanced', ISKTHEME_URL . 'assets/js/isk-enhanced.js', array( 'isktheme-core', 'isktheme-gsap', 'isktheme-anime' ), ISKTHEME_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'isktheme_enqueue_assets' );

/**
 * Register custom page templates shipped with the plugin.
 */
function isktheme_register_templates( $templates ) {
    $isk_templates = array(
        'templates/page-index.html'             => 'ISK  Home',
        'templates/page-programmes.html'        => 'ISK  Programmes',
        'templates/page-kindergarten.html'      => 'ISK  Kindergarten',
        'templates/page-primary.html'           => 'ISK  Primary School',
        'templates/page-lower-secondary.html'   => 'ISK  Lower Secondary',
        'templates/page-high-school.html'       => 'ISK  High School',
        'templates/page-pathways.html'          => 'ISK  Pathways & Enrichment',
        'templates/page-academic-pathways.html' => 'ISK  Academic Pathways',
        'templates/page-academic-programmes.html' => 'ISK  Academic Programmes',
        'templates/page-ipc.html'               => 'ISK  IPC',
        'templates/page-map-growth.html'        => 'ISK  MAP Growth',
        'templates/page-ap-program.html'        => 'ISK  AP Program',
        'templates/page-psat.html'              => 'ISK  PSAT',
        'templates/page-sat.html'               => 'ISK  SAT',
        'templates/page-organization.html'      => 'ISK  Organisation',
        'templates/page-key-person.html'        => 'ISK  Key Persons',
        'templates/page-key-profiles.html'      => 'ISK  Profiles',
        'templates/page-graduates.html'         => 'ISK  Graduates',
        'templates/page-fees.html'              => 'ISK  Fees',
        'templates/page-assessment.html'        => 'ISK  Assessment',
        'templates/page-admissions.html'        => 'ISK  Admissions',
    );
    return array_merge( $templates, $isk_templates );
}
add_filter( 'theme_page_templates', 'isktheme_register_templates' );

/**
 * Render a packaged HTML template with plugin asset URLs.
 */
function isktheme_render_html_template( $file ) {
    $html = file_get_contents( $file );
    if ( false === $html ) {
        status_header( 404 );
        exit;
    }

    $html = preg_replace_callback(
        "/\\b(src|href)=([\"'])([^\"']+\\.(?:css|js|png|jpe?g|avif|svg))\\2/i",
        function ( $matches ) {
            $attribute = $matches[1];
            $quote     = $matches[2];
            $target    = $matches[3];

            if ( preg_match( '/^(?:https?:|data:|\\/\\/)/i', $target ) ) {
                return $matches[0];
            }

            $path = ltrim( $target, '/' );
            if ( preg_match( '/\\.css$/i', $path ) ) {
                $path = 'assets/css/' . basename( $path );
            } elseif ( preg_match( '/\\.js$/i', $path ) ) {
                $path = 'assets/js/' . basename( $path );
            } elseif ( 0 === strpos( $path, 'image/' ) ) {
                $path = 'assets/images/' . substr( $path, 6 );
            } else {
                $path = 'assets/images/' . basename( $path );
            }

            return $attribute . '=' . $quote . esc_url( ISKTHEME_URL . $path ) . $quote;
        },
        $html
    );

    echo $html;
    exit;
}

/**
 * Load the selected ISK template file.
 */
function isktheme_load_template( $template ) {
    global $post;
    if ( ! $post ) {
        return $template;
    }
    $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
    if ( $page_template && strpos( $page_template, 'templates/page-' ) === 0 ) {
        $file = ISKTHEME_PATH . $page_template;
        if ( file_exists( $file ) ) {
            isktheme_render_html_template( $file );
        }
    }
    return $template;
}
add_filter( 'template_include', 'isktheme_load_template' );

/**
 * Activation: flush rewrite rules.
 */
function isktheme_activate() {
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'isktheme_activate' );

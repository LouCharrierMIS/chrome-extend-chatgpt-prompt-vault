<?php
define('WP_USE_THEMES', false);
require_once('/path/to/your/wordpress/wp-load.php');

/**
 * Handle JSON file requests and user file management.
 *
 * This PHP script receives requests for two JSON files from a Chrome extension.
 * If the user is not logged in, it returns only the template file.
 * If the user is logged in, it returns both the template file and the user's file.
 * It also handles the saving of the user's file to their own copy.
 */

// Check if the user is logged in
if (is_user_logged_in()) {
    // Get the logged in user's ID
    $user_id = get_current_user_id();

    // Get the template file
    $template_file = file_get_contents('path/to/template.json');

    // Get the user's file
    $user_file = file_get_contents("path/to/userfiles/{$user_id}.json");

    // Return both files as JSON
    $response = array(
        'template_file' => json_decode($template_file),
        'user_file' => json_decode($user_file),
    );

    echo json_encode($response);
} else {
    // User is not logged in, return the template file only
    $template_file = file_get_contents('path/to/template.json');
    echo $template_file;
}

// Handle saving of the user's file
if (isset($_POST['user_file']) && is_user_logged_in()) {
    $user_data = $_POST['user_file'];
    $user_id = get_current_user_id();

    // Validate and sanitize the user's file data if needed

    // Save the user's file
    file_put_contents("path/to/userfiles/{$user_id}.json", json_encode($user_data));
}
?>

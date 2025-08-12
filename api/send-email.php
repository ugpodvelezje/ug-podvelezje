<?php
// send-email.php - Email handler for UG Podvelezje contact form
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://podvelezje.ba');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Get and decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input exists
    if (!$input) {
        throw new Exception('No data received');
    }
    
    // Extract and sanitize form data
    $name = isset($input['name']) ? trim(htmlspecialchars($input['name'])) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $subject = isset($input['subject']) ? trim(htmlspecialchars($input['subject'])) : '';
    $message = isset($input['message']) ? trim(htmlspecialchars($input['message'])) : '';
    
    // Validate required fields
    if (empty($name)) {
        throw new Exception('Ime je obavezno');
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Valjan email je obavezan');
    }
    
    if (empty($subject)) {
        throw new Exception('Predmet je obavezan');
    }
    
    if (empty($message)) {
        throw new Exception('Poruka je obavezna');
    }
    
    // Email configuration
    $to = 'info@podvelezje.ba';
    $email_subject = 'Kontakt forma: ' . $subject;
    
    // Build email body
    $email_body = "Nova poruka sa kontakt forme:\n\n";
    $email_body .= "Ime: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Predmet: " . $subject . "\n\n";
    $email_body .= "Poruka:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Poslano sa: " . $_SERVER['HTTP_HOST'] . "\n";
    $email_body .= "Datum: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP adresa: " . $_SERVER['REMOTE_ADDR'];
    
    // Email headers
    $headers = "From: noreply@podvelezje.ba\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode([
            'success' => true,
            'message' => 'Email uspješno poslan'
        ]);
    } else {
        throw new Exception('Greška prilikom slanja emaila');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
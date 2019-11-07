<?php

$fname = $lname = $email = $ig = "";

if (isset($_POST["submit"])) {
    $plan = test_input($_POST["selectedPlan"]);
    $fname = test_input($_POST["firstName"]);
    $lname = test_input($_POST["lastName"]);
    $email = test_input($_POST["email"]);
    $ig = test_input($_POST["igusername"]);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "influencer_alpha";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (!get_id_from_customer_email($conn, $email)) {
        if (insert_customer($conn, $fname, $lname, $email)) {
            insert_iguname($conn, $email, $ig);
            insert_plan($conn, $email, $plan);
            go_stripe();
        } else {
            echo "Error: We could not update the database: C<br>" . $conn->error;
        }
    } else {
        if (insert_iguname($conn, $email, $ig)) {
            go_stripe();
        } else {
            //TODO: differenciate the case where $ig is already in database and where we have an error
            echo "Error: We could not update the database: IG<br>" . $conn->error;
        }

    }

    $conn->close();

}


function insert_customer(mysqli $conn, $fname, $lname, $email)
{

    //insert new customer
    $sql = "INSERT INTO Customers (fname, lname, email) VALUES (?,?,?)";

    if (!($stmt = $conn->prepare($sql))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }

    $stmt->bind_param("sss", $fname, $lname, $email);

    if ($stmt->execute()) {
        echo "New record created successfully";
        $stmt->close();
        return true;
    }

    return false;

}

function insert_plan(mysqli $conn, $email, $plan)
{
    $customer_id = get_id_from_customer_email($conn, $email);

    $sql = "INSERT INTO Invoice (plan, customer_id) VALUES (?,?)";

    if (!($stmt = $conn->prepare($sql))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }

    $stmt->bind_param("si", $plan, $customer_id);

    if ($stmt->execute()) {
        echo "New record created successfully";
        $stmt->close();
        return true;
    }

    return false;

}

function insert_iguname(mysqli $conn, $email, $ig)
{
    $customer_id = get_id_from_customer_email($conn, $email);

    $sql = "INSERT INTO Instagram (igname, customer_id) VALUES (?,?)";

    if (!($stmt = $conn->prepare($sql))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }

    $stmt->bind_param("si", $ig, $customer_id);

    if ($stmt->execute()) {
        echo "New record created successfully";
        $stmt->close();
        return true;
    }

    return false;

}

function get_id_from_customer_email(mysqli $conn, $email)
{
    $sql = "SELECT * FROM Customers WHERE email=?";

    if (!($stmt = $conn->prepare($sql))) {
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    }

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();

    $stmt->close();

    //$num_of_rows = $result->num_rows;

    $customer_id = $customer_email = $customer_fname = $customer_lname = "";

    while ($row = $result->fetch_assoc()) {
        $customer_id = $row['id'];
        //$customer_fname = $row['fname'];
        //$customer_lname = $row['lname'];
        //$customer_email = $row['email'];
    }

    return $customer_id;
}

function go_stripe()
{
    echo '

<div id="preloder">
    <div class="loader"></div>
</div>
<script> 
          
        // Get HTML head element 
        var head = document.getElementsByTagName("HEAD")[0];  
  
        // Create new link Element 
        var link = document.createElement("link"); 
  
        // set the attributes for link element  
        link.rel = "stylesheet";  
      
        link.type = "text/css"; 
      
        link.href = "css/style.css";  
  
        // Append link element to HTML head 
        head.appendChild(link);  
    </script>  
<script src="https://js.stripe.com/v3/"></script>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/stripe.js"></script>
<script type="text/javascript">
           stripe_test();
      </script>
      <script> $(".loader");
$("#preloder").delay(4000000).fadeOut("slow");
</script>
      ';

}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_COMPAT, 'ISO-8859-1', true);
    return $data;
}
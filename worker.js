self.onmessage = function(e) {
    if (e.data === 'test') {
        <?php
            require 'php/hello.php';
        ?>
        self.postMessage({result:"OK"});
    } else {
        // Error
        self.postMessage("Something went wrong");
    }
}
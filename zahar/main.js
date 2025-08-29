var test_key;
var test_value;
var test_title;
var test_writebtn;
var test_readbtn;

document.addEventListener('DOMContentLoaded',function() {
    test_key = document.getElementById('test-cloud-key');
    test_value = document.getElementById('test-cloud-value');
    test_title = document.getElementById('test-cloud-title');
    test_writebtn = document.getElementById('write');
    test_readbtn = document.getElementById('read');

    test_writebtn.onclick = function() {
        window.Telegram.WebApp.CloudStorage.setItem(test_key.value,test_value.value);
    }
    test_readbtn.onclick = function() {
        window.Telegram.WebApp.CloudStorage.getItem(test_key.value,function(error,data){
            if (error != null) {
                test_title = error;
            }
            else {
                test_title = data;
            }
        });
    }
});
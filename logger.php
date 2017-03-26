<?php  
abstract class Logger 
{
    public $message;
	public $error;
	
	public function _date($error) {
		$this->log_time = date("[Y-m-d H:i:s]").serialize($error);
	}
	
	public function log() {}
}
 
class FileLogger extends Logger 
{
	public $PATH = 'error.log';
	
	 public function log(){
        return file_put_contents($this->PATH, $this->log_time . "\n", FILE_APPEND);
    }
	
}


class DBLogger extends Logger 
{
     private $link;
 
        public function __construct()
        {
             $this->link = mysqli_connect('localhost', 'root', '');
			 if (!$this->link) {
             die('Ошибка соединения: ' . mysql_error());
}
             echo 'Успешно соединились';

             mysqli_select_db ($this->link,'my_db');
		
 
        }
 
        public function log()
        {
                mysqli_query($this->link,"INSERT INTO error_log (Message) VALUES ('$this->log_time')");
				mysqli_close($this->link);
        }
}

class STOUTLogger extends Logger {
	private $stout;
    
	 public function __construct()
        {
        $this->stout = fopen('error.log', 'wb');
        }
	
	public function log()
        {
                fwrite($this->stout, $this->log_time); 
        }
}

 
 
$Log = new FileLogger();
$Log->_date(array(1, 2, 2));
$Log->log();
$mysqlLogger = new DBLogger();
$mysqlLogger->_date(array(1, 2, 2));
$mysqlLogger->log();
$LogST = new STOUTLogger();
$LogST->_date(array(1, 2, 2));
$LogST->log();



 ?>
<?php

define("DB_HOST","db5014058577.hosting-data.io");
define("DB_NAME","dbs11735243");
define("DB_USER","dbu2074352");
define("DB_PASS","estoessuperestupidolaverdad");

// define("DB_HOST","localhost");
// define("DB_NAME","bd_boda");
// define("DB_USER","root");
// define("DB_PASS","");

  class DataBase{
    private $host;
    private $dbname;
    private $user;
    private $pass;

    public $db_handler;

    public function __construct(){
      $this->host=constant("DB_HOST");
      $this->dbname=constant("DB_NAME");
      $this->user=constant("DB_USER");
      $this->pass=constant("DB_PASS");

      /* Al instanciar un objeto se realiza la conexión de manera automática */
      try {
        $this->db_handler= new PDO("mysql:host=".$this->host.";dbname=".$this->dbname,$this->user,$this->pass);
        //?echo "Conexión realizada";
      } catch (PDOException $e) {
        echo $e->getMessage();
      }
    }
    /* Método estático para realizar la conexión sin necesidad de instanciar un objeto */
    public static function connect(){
      $host=constant("DB_HOST");
      $dbname=constant("DB_NAME");
      $user=constant("DB_USER");
      $pass=constant("DB_PASS");

      try {
        $db_handler= new PDO("mysql:host=".$host.";dbname=".$dbname,$user,$pass);
        //?echo "Conexión realizada";
      } catch (PDOException $e) {
        echo $e->getMessage();
      }
      return $db_handler;
    }

  }
?>
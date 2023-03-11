<?php 
      //conexion developer
      $conexion=new mysqli('localhost','root','0', 'canavesio');
   

     //conexion produccion
     // $conexion=new mysqli('','','', '') or die("Problemas en la conexion");

      

      //para que procese las ñ etc.
      $conexion->set_charset("utf8");
?>
<?php
function get_response()
{
	$inp = file_get_contents('https://api.boardgameatlas.com/api/search?order_by=name&client_id=RIfeIKabPB&limit=100&list_id=GmwfdYrDXe');
	file_put_contents('api-response.json', $inp);
}

get_response();
?>

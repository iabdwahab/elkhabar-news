function fetchingData() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://blog.ammarelgendy.online/api/category/politics?pageSize=8", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

fetchingData()